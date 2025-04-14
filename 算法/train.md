总结的训练函数常用框架，按照先后顺序



## args

管理参数

### get_parser

```python
import argparse


def get_parser():
    parser = argparse.ArgumentParser(description='Training Config')

    # data
    parser.add_argument('--patch_size', type=int, default=64, help='patch size')
    parser.add_argument('--batch_size', type=int, default=1, help='batch size')
    parser.add_argument('--data_dir', type=str, default='./Dataset/', help='LF data directory')

    # model
    parser.add_argument('--model_name', type=str, default='DeoccNet', help='model name')
    parser.add_argument('--model_msg', type=str, default='NoTagModel', help='model tagging information')
    parser.add_argument('--model_save_dir', type=str, default=None, help='if load pretrain model')
    parser.add_argument('--channels', type=int, default=32, help='number of model channels')
    parser.add_argument('--views_num', type=int, default=9, help='number of LF views')
    parser.add_argument('--max_disp', type=int, default=4, help='LF maximum disparity')
    parser.add_argument('--step', type=int, default=1, help='disparity step')

    # train
    parser.add_argument('--device', type=str, default='cuda:2', help='GPU device')
    parser.add_argument('--epoch', type=int, default=10000, help='total training epochs')
    parser.add_argument('--lr', type=float, default=1e-4, help="initial learning rate")
    parser.add_argument('--decay_step', type=int, default=200, help='learning rate decay step')
    parser.add_argument('--gamma', type=float, default=0.1, help='learning rate decay gamma')
    parser.add_argument('--if_visdom', type=int, default=0, help='if visdom')
    parser.add_argument('--if_debug', type=int, default=1, help='if debug')

    # test
    parser.add_argument('--shave', type=int, default=16, help='shave')
    parser.add_argument('--mod', type=int, default=8, help='mod')

    args = parser.parse_args()

    return args
```

```python
# args
args = args.get_parser()
print(args)
```

### run.sh

```bash
python ./Code/train.py \
        --patch_size 64 \
        --batch_size 5 \
        --data_dir "./Dataset/DLFD/" \
        --channels 64 \
        --views_num 9 \
        --max_disp 4 \
        --step 1 \
        --device 'cuda:0' \
        --current_iter 0 \
        --lr 1e-3 \
        --decay_step 200 \
        --gamma 0.1 \
        --shave 16 \
        --mod 8 \
        --if_visdom 1 \
        --if_debug 0 \
        --model_name 'AOR' \
        --model_msg 'DE'\
```

## model

### model

```python
# model
device = torch.device(args.device)

model = DeoccNet(args.channels, args.views_num, args.max_disp, args.step)
# 模型初始化
model.apply(weights_init_xavier)
# 加载预训练模型
-----见下文-----

model.to(device)
# 打印模型参数量
utils.get_parameter_number(model)
```

### criterion

```python
# criterion
criterion = torch.nn.L1Loss()
```

### optimizer

```python
# optimizer
optimizer = torch.optim.Adam([paras for paras in model.parameters() if paras.requires_grad == True], lr=args.lr)
scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=args.decay_step, gamma=args.gamma)
```

## 保存和加载参数

### 保存模型参数

```python
def save_checkpoint(args, epoch, model, optimizer, scheduler, checkpoint_path):
    checkpoint = {
        'args': args,
        'epoch': epoch,
        'model_state_dict': model.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
        'scheduler_state_dict': scheduler.state_dict()
    }
    torch.save(checkpoint, checkpoint_path)
    print(f"Checkpoint saved at step {scheduler._step_count}")
```

### 加载模型参数

```python
start_epoch = 0
if args.model_save_dir:
    checkpoint = torch.load(args.model_save_dir, map_location="cpu")
    args = checkpoint['args']
    start_epoch = checkpoint['epoch'] + 1
    model.load_state_dict(checkpoint['model_state_dict'])
    optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
    scheduler.load_state_dict(checkpoint['scheduler_state_dict'])
```

## logging

### log

```python
# logging
start_time = time.strftime("%m%d%H%M", time.localtime(time.time()))
log_path = f"./log/{args.model_name}_{args.model_msg}_{start_time}"
os.makedirs(f"{log_path}", exist_ok=True)

logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
        handlers=[
            logging.FileHandler(f"{log_path}/{args.model_name}_{start_time}.log"),
            logging.StreamHandler(),
        ],
)
```

### visdom

```python
# visdom
if args.if_visdom == 1:
    win_str = f"{args.model_name}_{args.model_msg}_{start_time}"
    vis = visdom.Visdom(env=str(win_str), server="IP Address", port=9878)
```

## training

在训练的epoch内，分为两个大的阶段，分别是训练和验证，不过我比较习惯先验证后训练，因为验证一般是每10个epoch验证一次，先验证可以测试验证函数是否会出bug，不然等训练了10轮再出bug很难受

```python
# 记录结果的变量
best_mse = 2000
test_mse = 0
test_bp007 = 0
train_loss_list = []
train_metric_list = []
test_metric_list = []

logging.info("Start training ...\n")
```

开始训练

```python
for epoch in range(start_epoch, args.epoch):
    # validation
    if epoch % 10 == 0:        
        model_state_path = os.path.join(log_path, "model_state")
        os.makedirs(model_state_path, exist_ok=True)
        save_checkpoint(args, epoch, model, optimizer, scheduler, model_state_path + f"/model_{epoch}.pkl")
        
        best_mse_new, test_mse, test_bp007 = validation(args, epoch, model, best_mse, log_path, device)

        # 更新最佳模型参数
        if best_mse_new < best_mse:
            save_checkpoint(args, epoch, model, optimizer, scheduler, log_path + f"/model_best.pkl")
        best_mse = best_mse_new

    # train
    train_loss, loss1, loss2, loss3, train_mse = train_epoch(
        args, model, criterion, criterion1, optimizer, scheduler, epoch, weights, device
    )

    train_loss_list.append(train_loss)
    train_metric_list.append(train_mse)
    test_metric_list.append(test_mse)

    np.save(log_path + '/train_loss.npy', train_loss_list)
    np.save(log_path + '/train_metric.npy', train_metric_list)
    np.save(log_path + '/test_metric.npy', test_metric_list)

    # visualize
    if args.if_visdom == 1:
        utils.plot_loss(vis, epoch, train_loss, loss1, loss2, loss3, test_mse, test_bp007)
```

### train_epoch

在`epoch外`加载数据集，好处是训练时能够直接调用，节省了重复加载数据集的时间，坏处是加载的数据集一直放在内存，增加了内存开销；

在`epoch内`加载数据集，好处是如果有数据集中有数据增强操作（在`__init__`函数中进行数据增强），那么每次加载数据都会进行数据增强，训练能够提升模型泛化性能；如果数据增强操作是在写`__getitem__`函数中，那么构建dataset对象的过程无论写在epoch内还是在epoch外都会进行数据增强， 因为`__getitem__`函数是在dataloader加载时调用的，和构建dataset对象的时间无关，传入模型之前都会进行数据增强。

```python
def train_epoch(args, model, criterion, criterion1, optimizer, scheduler, epoch, weights, device):
	# 存储每个mini-batch的中间结果
    train_loss = []
    mse100 = 0
    mse100_list = []

    model.train()
    time1 = time.time()

    # train dataset
    train_dataset = DatasetLF(args)
    train_iter = Data.DataLoader(dataset=train_dataset, batch_size=args.batch_size, shuffle=True, num_workers=2)
    time2 = time.time()
    logging.info(f"Load Dataset Time: {time2 - time1}")
```



**推荐的训练步骤**

1. **清除梯度**：每次训练的epoch开始，必须先清除上一轮的梯度，以防止累积。
2. **前向传播**：使用输入数据进行前向传播，计算输出。
3. **计算损失**：通过模型输出和真实标签计算损失。
4. **反向传播**：通过损失计算每个参数的梯度（调用 `.backward()`）。
5. **优化器更新**：通过 `optimizer.step()` 更新模型参数。
6. **学习率调度**：如果使用了学习率调度器，一般在 **每个 epoch 结束后** 或者 **每个 batch 后** 调用 `scheduler.step()`。

```python
for i, (train_data, gt_data, mask, fg_disp, bg_disp) in enumerate(train_iter):
    train_data = train_data.to(device).float()
    train_data = rearrange(train_data, "b u v h w c -> b (u v) c h w") # b 81 3 48 48
    
    # 在每个 epoch 开始时清除梯度
    optimizer.zero_grad()
	# 前向传播
    depDistT, depDistS, depth_map = model(train_data)

    fg_distribution = get_disp_distribution(fg_disp)
    bg_distribution = get_disp_distribution(bg_disp)
    depDistT_GT = (fg_distribution + bg_distribution) / 2

    # 计算损失
    l1 = criterion1(depDistT, torch.from_numpy(depDistT_GT).to(device).float())
    l2 = criterion1(depDistS, torch.from_numpy(bg_distribution).to(device).float())
    l3 = criterion(depth_map, bg_disp.to(device).float())
    loss = (
            l1 * weights["loss1_weight"]
            + l2 * weights["loss2_weight"]
            + l3 * weights["loss3_weight"]
    )

    # 反向传播
    loss.backward()
	# 优化器更新
    optimizer.step()
    # 学习率调度
    scheduler.step()

    # 计算指标
    depMapPred = depth_map[0].detach().cpu().numpy()
    depthMapGT = bg_disp[0].detach().cpu().numpy()
    mse100 = np.mean(
        (depMapPred[11:-11, 11:-11] - depthMapGT[11:-11, 11:-11]) ** 2
    )

    train_loss.append(loss.item())
    mse100_list.append(mse100)

time3 = time.time()

lr = optimizer.state_dict()["param_groups"][0]["lr"]
logging.info(
    f"Training Epoch: {epoch}, Lr: {lr:.2e}, Time: {time3 - time1:.2f}s, "
    f"Total Loss: {np.mean(train_loss):.6f}, Avg MSE: {np.mean(mse100_list):.6f} \n"
)

return np.mean(train_loss), np.mean(mse100_list)
```



### validation

模型验证函数，验证模型训练的是否有效

```python
def validation(args, epoch, model, bestMSE, log_path, device):
    MSE = []
    badPix007 = []
    time1 = time.time()
    model.eval()

    for scene in setting.testing_images if args.if_debug == 0 else setting.debug_testing_images:
        data_test = np.load(args.data_dir + "/LFs/" + scene + ".npy")  # 9, 9, h, w, 3 [0, 1]
        bg_disp = np.load(args.data_dir + "/bgDisparity/" + scene + ".npy")

        center_image = np.clip(data_test[4, 4, :, :, :] * 255, 0, 255).astype(np.uint8)
        data_test = torch.from_numpy(data_test).unsqueeze(0).to(device)  # torch.Size([1, 9, 9, 64, 64, 3])

        with torch.no_grad():
            # reference
            test_data = rearrange(data_test, "b u v h w c -> b (u v) h w c")
            output_depDistT, output_depDistS, output_depth = (
                utils.overlap_crop_forward_2(
                    test_data,
                    model,
                    scale=1,
                    max_length=args.patch_size,
                    shave=args.shave,
                    mod=args.mod,
                )
            )  # 1 h w c

            depth_pred = output_depth[0].cpu().numpy()
            depth_gt = bg_disp
            mse100 = np.mean((depth_pred[11:-11, 11:-11] - depth_gt[11:-11, 11:-11]) ** 2)
            bp007 = utils.compute_bad_pix(depth_pred, depth_gt)
            MSE.append(mse100)
            badPix007.append(bp007)

    # 每50个epoch保存一次验证结果
    if epoch % 50 == 0:
        saveValidationResult(log_path, epoch, scene, center_image, depth_pred, depth_gt)

    avg_mse = np.mean(MSE)
    if avg_mse < bestMSE:
        bestMSE = avg_mse
    avg_bp007 = np.mean(badPix007)
    logging.info(
        f"=====> Validation epoch: {epoch}, Time: {time.time() - time1:.4f}s, "
        f"Avg MSE: {avg_mse:.4f}dB / BEST: {bestMSE:.4f}dB, Avg BadPixel007: {avg_bp007:.4f}\n"
    )

    return bestMSE, avg_mse, avg_bp007
```

保存验证结果的函数

```python
def saveValidationResult(log_path, epoch, scene, center_image, depth_pred, depth_gt):
    # 保存中心视图、预测深度图和真实深度图
    image_save_path = f"{log_path}/validation/epoch{epoch}"
    os.makedirs(image_save_path, exist_ok=True)

    imageio.imsave(f"{image_save_path}/{scene}_train.png", center_image)
    plt.imsave(f"{image_save_path}/{scene}_pred.png", depth_pred)
    np.save(f"{image_save_path}/{scene}_pred.npy", depth_pred)
    plt.imsave(f"{image_save_path}/{scene}_gt.png", depth_gt)
```

