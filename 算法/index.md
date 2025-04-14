高攀了

我这小小开发怎么还记上算法笔记了

我脑子笨 数学只会个基础

没啥内容

炼丹好 炼丹秒 炼丹炸炉呱呱叫



## 项目目录结构

按自己的习惯，一个算法项目的目录结构如下：

```bash
Project Base Path
│
├── Code
│   ├── args.py                   # 参数管理工具
│   ├── dataset.py                # 数据集文件
│   ├── initializers.py           # 模型初始化文件
│   ├── model.py                  # 模型代码实现
│   ├── run.sh                    # 运行脚本，配合args.py使用
│   ├── setting.py                # 实验设置文件
│   ├── test.py                   # 模型测试文件
│   ├── tmp.py                    # 临时代码文件，随便写代码检验用
│   ├── train.py                  # 模型训练文件
│   └── utils.py                  # 存储工具函数
│
├── Dataset
│   ├── training                  # 训练集
│	├── validation                # 验证集
│   └── testing                   # 测试集
│
├── log                           # 存储模型训练日志和模型checkpoint，子目录以模型命名，表示该模型训练过程
│
├── TestResult                    # 存储测试结果，子目录以模型名命名，表示该模型测试的结果
│
└── .gitignore                    # git版本控制时忽略文件

```

