--- 
layout: post
title: Monte Carlo Drawdown
tags : 🐍 💰
date: 2019-12-15 10:00:00.000000000 +01:00
description:  wherein I estimate some drawdown.
---

So, the other day I was messing around with the returns of something and I wanted to see if, with the basic statistics of the returns, what are the risks implicit (at least the ones I can reasonably see).

Since I’m a naive fellow, I wrote a very naive program in Python that uses Monte Carlo to estimate the mean drawdown I’d suffer and the maximum drawdown.

First, from the empirical results I extract some statistics: the win rate `winrate`, which is the probability of a positive return and the return to risk `rr`, which measures how much I win for every loss, on average.

With these I generate (pseudo)random numbers (on a normal distribution; I know, naive). If the number is up to `winrate`, I win; otherwise I lose. If I do this a many number of times (say, a thousand) I’ll have a (thousand) series of outcomes. From these I extract the mean drawdown and the maximum drawdown.

The jupyter notebook can be found [here](https://github.com/freirerene/montecarlodd). The code is below:

First I load the libraries I need and read the file with the empirical results; I do some visualisation and so on.

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import math
import random

returns = pd.read_csv('return.csv')
cumulativo = returns['Return'].cumsum()
plt.plot(cumulativo)
```


![](/img/returns.png)

Then I find out the basic assumptions of this strategy:

```python
loss = returns[returns['Return'] <= 0]
profit = returns[returns['Return'] > 0]

winrate = round((len(profit)/(len(profit)+len(loss))),2)
lossrate = 1 - winrate

rr = round(-profit.mean()/loss.mean(),2)[0]
```

And here is where I generate the possible results (notice I normalize the possible outcome: so the loss is -1 and the gain is `rr`)

```python
montecarlo = [[rr if np.random.uniform(0,1,len(returns))[j] <= winrate else -1 for j in range(1,len(returns)-1)] for i in range(1,1000)]

result = pd.DataFrame(montecarlo).transpose()


plt.subplots(figsize=(10,7))
plt.axhline(y=0,linewidth=1, color='#000000')
plt.plot(result.cumsum(), alpha = 0.5)
plt.show()
```


![](/img/montecarlo.png)

The calculation of the drawdown is pretty simple:

```python
drawdown = result.cumsum() - result.cumsum().cummax()
maxdd = -drawdown.min()

# mean drawdown
maxdd.mean()

# maximum drawdown I take to be the one that occurs 5% of the cases
maxdd.quantile(.95)
```

Mean DD is about 46.7 and maximum DD is about 73.4.
