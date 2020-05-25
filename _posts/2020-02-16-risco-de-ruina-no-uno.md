--- 
layout: post
title: Risco de Ruína no Uno
tags : 🐍 🤡
date: 2020-02-16 10:00:00.000000000 +01:00
description:  E se a gente tornasse isso interessante?
---

Um dia desses eu me vi numa situação: jogando uno com outras três pessoas.

Não estava valendo nada, mas depois eu pensei: e se estivesse valendo? Qual o risco de ruína num jogo de uno com, digamos, `50` partidas?

Vamos aplicar [Monte Carlo](https://freire.ch/2019/12/15/monte-carlo-drawdown/), claro. (com algumas suposições iniciais ingênuas)

Digamos que cada pessoa que perde dá ao vencedor `1` de uma unidade de dinheiro (e.g., um real).  E digamos que cada um tem uma chance igual de vitoria.

Então, a taxa retorno por risco é `3` e a probabilidade de ganho é de `25%`.

```python
montecarlo = [[rr if np.random.uniform(0,1,50)[j] <= winrate else -1 for j in range(1,50-1)] for i in range(1,1000)]

result = pd.DataFrame(montecarlo).transpose()

res = pd.DataFrame(result.sum())

loss = res[res[0] <= 0]
gain = res[res[0] > 0]

```

![](/img/uno.png)

As chances de vitória são de apenas `43%`. A média de ganho é de ca. `11` unidades e a de perda é de ca. `8` unidades. O ganho máximo é de `40` e a perda máxima de `-32`.

Os resultados ficam muito melhores se o jogador tem um *edge* de `5%`: suas chances de vitória passam pra `70%`, com: ganho médio `15`; ganho máximo `48`; perda média `-6` e perda máxima `-28`.



