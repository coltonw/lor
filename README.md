## LoR Stats

Just trying to figure out what the best decks in the meta are using matchup data from Mobalytics. The data is only broken down by regions, but it's the best I've got.

I am doing two separate things to try to determine the best deck:

1. Instead of using the actual average win rate of each matchup, I am calculating the _lower bound_ of a Wilson score confidence interval. This is pessimistic and becomes more pessimistic for matchups we know less about. This results in decks with very little data being pushed to the bottom of the list.
2. The reason I am using matchup data is that I only care about wins against the "meta". I have therefore calculated total win rate by calulating the representation of the meta for each of the top 15 region combos and multiplying that meta percentage by the winrate for that matchup. I then total all these proportions up to get what is hopefully a more accurate winrate than just the flat number.

### Future plans

With just taking the top 15 region combos, I am getting slightly less noisy data but the problem is that this "snapshot of the meta" includes data from the first week of the patch when experimentation was rampant and focus on the new stuff was extremely high. Once I have a few more data points, I can subtract the old data from the new data to just include data from the past few days and get a much more accurate picture of the current metagame.

### Results

Here is a snapshot of the current output:

```
Name                  LB%   Avg%

Scout               55.3%  56.4%
  ASol / Trundle    61.7%  62.5%
  Nightfall         56.2%  57.2%
  Endure            53.2%  54.2%
  Targon / Demacia  48.9%  49.9%
  Swain OR Pirates  52.3%  53.2%
  Lulu Demacia      52.4%  53.4%
  Stun OR Lee Sin   67.3%  68.7%
  Sej / Gangplank   49.8%  51.1%
  Ez Targon         64.2%  65.7%
  Swain Behold      40.2%  41.5%
  Spider Aggro      56.5%  57.8%
  Deep              56.5%  57.9%
  Discard Aggro     54.7%  56.4%
  Ez / TF           56.2%  57.9%

Swain OR Pirates    53.8%  54.6%
  ASol / Trundle    52.9%  53.6%
  Nightfall         52.4%  53.2%
  Endure            42.9%  43.6%
  Targon / Demacia  56.9%  57.6%
  Lulu Demacia      60.6%  61.3%
  Stun OR Lee Sin   69.7%  70.7%
  Sej / Gangplank   43.9%  44.9%
  Scout             45.9%  46.8%
  Ez Targon         66.3%  67.3%
  Swain Behold      57.0%  58.0%
  Spider Aggro      49.1%  50.1%
  Deep              50.3%  51.3%
  Discard Aggro     61.8%  63.0%
  Ez / TF           49.9%  51.2%

Sej / Gangplank     52.4%  53.5%
  ASol / Trundle    45.8%  46.6%
  Nightfall         54.4%  55.4%
  Endure            45.4%  46.4%
  Targon / Demacia  54.5%  55.5%
  Swain OR Pirates  54.2%  55.1%
  Lulu Demacia      55.5%  56.6%
  Stun OR Lee Sin   62.3%  63.7%
  Scout             47.6%  48.9%
  Ez Targon         67.1%  68.6%
  Swain Behold      55.2%  56.4%
  Spider Aggro      46.3%  47.7%
  Deep              47.9%  49.2%
  Discard Aggro     50.1%  51.9%
  Ez / TF           59.4%  61.1%

Endure              51.4%  52.3%
  ASol / Trundle    47.6%  48.2%
  Nightfall         52.6%  53.3%
  Targon / Demacia  49.0%  49.8%
  Swain OR Pirates  55.7%  56.4%
  Lulu Demacia      51.3%  52.0%
  Stun OR Lee Sin   50.0%  51.1%
  Sej / Gangplank   52.7%  53.6%
  Scout             44.9%  45.8%
  Ez Targon         55.5%  56.6%
  Swain Behold      52.4%  53.4%
  Spider Aggro      53.0%  54.1%
  Deep              52.2%  53.1%
  Discard Aggro     55.7%  56.9%
  Ez / TF           60.1%  61.4%

Swain Behold        50.6%  51.8%
  ASol / Trundle    49.4%  50.3%
  Nightfall         53.1%  54.1%
  Endure            45.6%  46.6%
  Targon / Demacia  54.5%  55.5%
  Swain OR Pirates  41.0%  42.0%
  Lulu Demacia      61.1%  62.1%
  Stun OR Lee Sin   58.3%  59.6%
  Sej / Gangplank   42.3%  43.6%
  Scout             57.1%  58.5%
  Ez Targon         56.7%  58.2%
  Spider Aggro      43.0%  44.4%
  Deep              49.2%  50.5%
  Discard Aggro     44.3%  46.0%
  Ez / TF           47.4%  49.2%

Spider Aggro        50.6%  51.8%
  ASol / Trundle    55.2%  56.1%
  Nightfall         45.2%  46.2%
  Endure            44.9%  45.9%
  Targon / Demacia  53.1%  54.2%
  Swain OR Pirates  48.9%  49.9%
  Lulu Demacia      53.7%  54.8%
  Stun OR Lee Sin   59.6%  61.1%
  Sej / Gangplank   50.7%  52.2%
  Scout             40.9%  42.2%
  Ez Targon         56.3%  57.9%
  Swain Behold      54.3%  55.7%
  Deep              51.1%  52.5%
  Discard Aggro     46.9%  48.7%
  Ez / TF           44.0%  45.9%

Discard Aggro       49.6%  51.0%
  ASol / Trundle    58.4%  59.4%
  Nightfall         50.4%  51.6%
  Endure            41.8%  43.1%
  Targon / Demacia  51.9%  53.2%
  Swain OR Pirates  36.0%  37.1%
  Lulu Demacia      50.3%  51.5%
  Stun OR Lee Sin   66.3%  67.9%
  Sej / Gangplank   46.4%  48.2%
  Scout             41.9%  43.6%
  Ez Targon         51.4%  53.3%
  Swain Behold      52.2%  54.0%
  Spider Aggro      49.5%  51.3%
  Deep              48.1%  50.0%
  Ez / TF           44.3%  46.4%

Targon / Demacia    49.0%  49.9%
  ASol / Trundle    51.2%  51.8%
  Nightfall         53.2%  53.9%
  Endure            49.4%  50.2%
  Swain OR Pirates  41.6%  42.4%
  Lulu Demacia      45.5%  46.3%
  Stun OR Lee Sin   56.9%  57.8%
  Sej / Gangplank   43.5%  44.5%
  Scout             49.2%  50.1%
  Ez Targon         59.2%  60.4%
  Swain Behold      43.4%  44.5%
  Spider Aggro      44.6%  45.8%
  Deep              49.4%  50.5%
  Discard Aggro     45.4%  46.8%
  Ez / TF           50.8%  52.2%

Lulu Demacia        49.0%  49.8%
  ASol / Trundle    56.9%  57.4%
  Nightfall         49.3%  49.9%
  Endure            47.2%  48.0%
  Targon / Demacia  52.9%  53.7%
  Swain OR Pirates  37.9%  38.7%
  Stun OR Lee Sin   63.9%  64.8%
  Sej / Gangplank   42.3%  43.4%
  Scout             45.7%  46.6%
  Ez Targon         49.7%  50.7%
  Swain Behold      36.9%  37.9%
  Spider Aggro      44.1%  45.1%
  Deep              53.1%  54.2%
  Discard Aggro     47.2%  48.5%
  Ez / TF           45.5%  46.8%

Deep                49.0%  50.1%
  ASol / Trundle    51.2%  52.1%
  Nightfall         50.1%  51.1%
  Endure            45.9%  46.9%
  Targon / Demacia  48.4%  49.5%
  Swain OR Pirates  47.6%  48.6%
  Lulu Demacia      44.8%  45.9%
  Stun OR Lee Sin   56.1%  57.5%
  Sej / Gangplank   49.4%  50.8%
  Scout             40.8%  42.1%
  Ez Targon         57.8%  59.4%
  Swain Behold      48.1%  49.5%
  Spider Aggro      46.1%  47.5%
  Discard Aggro     48.3%  50.1%
  Ez / TF           56.1%  57.9%

DE                  48.8%  50.8%
  ASol / Trundle    54.5%  56.1%
  Nightfall         47.3%  49.1%
  Endure            46.4%  48.0%
  Targon / Demacia  47.1%  48.8%
  Swain OR Pirates  47.3%  49.0%
  Lulu Demacia      47.5%  49.3%
  Stun OR Lee Sin   55.6%  58.0%
  Sej / Gangplank   43.6%  45.7%
  Scout             44.9%  46.9%
  Ez Targon         61.3%  63.9%
  Swain Behold      39.1%  41.6%
  Spider Aggro      42.3%  44.5%
  Deep              56.9%  59.3%
  Discard Aggro     41.8%  44.7%
  Ez / TF           53.0%  56.3%

ASol / Trundle      48.3%  49.0%
  Nightfall         53.2%  53.8%
  Endure            51.1%  51.8%
  Targon / Demacia  47.5%  48.2%
  Swain OR Pirates  45.8%  46.4%
  Lulu Demacia      42.0%  42.6%
  Stun OR Lee Sin   55.1%  55.8%
  Sej / Gangplank   52.6%  53.4%
  Scout             36.6%  37.5%
  Ez Targon         56.9%  57.8%
  Swain Behold      49.0%  49.8%
  Spider Aggro      43.0%  43.9%
  Deep              47.1%  47.9%
  Discard Aggro     39.6%  40.6%
  Ez / TF           52.3%  53.4%

Nightfall           47.3%  48.1%
  ASol / Trundle    45.7%  46.2%
  Endure            45.9%  46.7%
  Targon / Demacia  45.4%  46.1%
  Swain OR Pirates  46.1%  46.8%
  Lulu Demacia      49.4%  50.1%
  Stun OR Lee Sin   52.6%  53.4%
  Sej / Gangplank   43.5%  44.6%
  Scout             41.8%  42.8%
  Ez Targon         55.9%  56.9%
  Swain Behold      45.0%  45.9%
  Spider Aggro      52.7%  53.8%
  Deep              47.9%  48.9%
  Discard Aggro     47.2%  48.4%
  Ez / TF           50.5%  51.8%

Ez / TF             46.7%  48.2%
  ASol / Trundle    45.4%  46.5%
  Nightfall         46.9%  48.2%
  Endure            37.3%  38.6%
  Targon / Demacia  46.3%  47.8%
  Swain OR Pirates  47.4%  48.8%
  Lulu Demacia      51.9%  53.2%
  Stun OR Lee Sin   58.9%  60.6%
  Sej / Gangplank   37.2%  38.9%
  Scout             40.2%  42.0%
  Ez Targon         58.0%  59.8%
  Swain Behold      49.0%  50.8%
  Spider Aggro      52.0%  53.9%
  Deep              40.1%  41.9%
  Discard Aggro     51.6%  53.7%

SI                  45.0%  47.1%
  ASol / Trundle    52.0%  53.6%
  Nightfall         47.4%  49.1%
  Endure            40.6%  42.4%
  Targon / Demacia  49.1%  51.2%
  Swain OR Pirates  44.7%  46.7%
  Lulu Demacia      35.3%  36.9%
  Stun OR Lee Sin   53.5%  55.9%
  Sej / Gangplank   43.6%  46.1%
  Scout             30.1%  32.2%
  Ez Targon         55.4%  58.2%
  Swain Behold      44.0%  46.7%
  Spider Aggro      39.1%  41.4%
  Deep              47.0%  49.7%
  Discard Aggro     37.5%  40.5%
  Ez / TF           46.1%  49.8%

IO_NX               44.7%  46.7%
  ASol / Trundle    52.9%  54.3%
  Nightfall         48.9%  50.5%
  Endure            46.2%  48.0%
  Targon / Demacia  48.5%  50.3%
  Swain OR Pirates  28.4%  30.0%
  Lulu Demacia      45.7%  47.4%
  Stun OR Lee Sin   57.1%  59.0%
  Sej / Gangplank   37.6%  40.1%
  Scout             36.6%  39.0%
  Ez Targon         44.2%  46.6%
  Swain Behold      43.6%  45.9%
  Spider Aggro      41.0%  43.4%
  Deep              45.9%  48.3%
  Discard Aggro     35.1%  38.1%
  Ez / TF           37.6%  40.5%

DE_SI               44.3%  46.8%
  ASol / Trundle    46.4%  48.3%
  Nightfall         45.1%  47.3%
  Endure            41.3%  43.4%
  Targon / Demacia  39.7%  42.2%
  Swain OR Pirates  50.8%  53.0%
  Lulu Demacia      39.8%  42.0%
  Stun OR Lee Sin   47.9%  50.8%
  Sej / Gangplank   44.1%  47.1%
  Scout             41.0%  43.8%
  Ez Targon         50.8%  54.3%
  Swain Behold      39.3%  42.2%
  Spider Aggro      40.6%  43.8%
  Deep              46.2%  49.0%
  Discard Aggro     44.2%  48.0%
  Ez / TF           47.0%  50.9%

DE_NX               43.5%  48.1%
  ASol / Trundle    51.2%  54.8%
  Nightfall         45.3%  49.4%
  Endure            41.3%  45.1%
  Targon / Demacia  44.1%  48.6%
  Swain OR Pirates  37.0%  41.0%
  Lulu Demacia      37.7%  42.1%
  Stun OR Lee Sin   53.4%  58.4%
  Sej / Gangplank   40.3%  45.3%
  Scout             40.2%  45.3%
  Ez Targon         55.7%  62.1%
  Swain Behold      32.0%  36.9%
  Spider Aggro      35.2%  40.4%
  Deep              50.4%  56.5%
  Discard Aggro     33.2%  40.9%
  Ez / TF           42.7%  50.0%

DE_FR               43.4%  45.7%
  ASol / Trundle    36.7%  38.3%
  Nightfall         47.2%  49.1%
  Endure            42.1%  44.0%
  Targon / Demacia  39.9%  42.0%
  Swain OR Pirates  37.8%  39.9%
  Lulu Demacia      50.5%  52.5%
  Stun OR Lee Sin   42.3%  44.9%
  Sej / Gangplank   48.9%  51.6%
  Scout             53.5%  56.2%
  Ez Targon         49.9%  53.0%
  Swain Behold      36.3%  38.7%
  Spider Aggro      44.1%  46.7%
  Deep              42.9%  45.7%
  Discard Aggro     38.8%  42.1%
  Ez / TF           51.8%  55.3%

PZ_SI               43.0%  45.9%
  ASol / Trundle    46.2%  48.4%
  Nightfall         42.2%  44.6%
  Endure            36.0%  38.5%
  Targon / Demacia  41.2%  43.8%
  Swain OR Pirates  41.6%  44.1%
  Lulu Demacia      45.9%  48.4%
  Stun OR Lee Sin   52.0%  55.3%
  Sej / Gangplank   41.0%  44.4%
  Scout             32.5%  35.9%
  Ez Targon         54.2%  57.8%
  Swain Behold      43.0%  46.5%
  Spider Aggro      40.7%  44.2%
  Deep              39.4%  42.9%
  Discard Aggro     51.3%  55.6%
  Ez / TF           43.2%  47.5%

MT_NX               42.5%  44.3%
  ASol / Trundle    45.7%  46.8%
  Nightfall         48.2%  49.5%
  Endure            40.4%  42.2%
  Targon / Demacia  45.2%  46.9%
  Swain OR Pirates  33.6%  35.5%
  Lulu Demacia      43.3%  44.7%
  Stun OR Lee Sin   52.1%  53.7%
  Sej / Gangplank   27.5%  30.0%
  Scout             39.8%  42.4%
  Ez Targon         52.0%  54.3%
  Swain Behold      36.7%  39.0%
  Spider Aggro      37.3%  39.9%
  Deep              43.9%  46.5%
  Discard Aggro     39.4%  42.3%
  Ez / TF           44.7%  47.8%

FR_PZ               42.3%  44.4%
  ASol / Trundle    46.7%  48.1%
  Nightfall         45.4%  47.1%
  Endure            42.1%  44.0%
  Targon / Demacia  43.8%  45.8%
  Swain OR Pirates  33.9%  35.7%
  Lulu Demacia      40.6%  42.3%
  Stun OR Lee Sin   49.2%  51.4%
  Sej / Gangplank   40.5%  42.9%
  Scout             33.9%  36.5%
  Ez Targon         46.5%  49.0%
  Swain Behold      43.6%  46.1%
  Spider Aggro      33.6%  36.1%
  Deep              43.6%  46.3%
  Discard Aggro     43.6%  47.0%
  Ez / TF           42.7%  45.7%

BW_MT               40.9%  43.1%
  ASol / Trundle    41.8%  43.2%
  Nightfall         46.1%  47.6%
  Endure            38.1%  40.3%
  Targon / Demacia  43.8%  45.5%
  Swain OR Pirates  42.8%  45.0%
  Lulu Demacia      35.1%  37.1%
  Stun OR Lee Sin   53.5%  55.5%
  Sej / Gangplank   38.0%  40.9%
  Scout             25.6%  28.3%
  Ez Targon         54.8%  57.2%
  Swain Behold      36.1%  39.0%
  Spider Aggro      33.3%  36.4%
  Deep              41.7%  44.8%
  Discard Aggro     32.1%  35.8%
  Ez / TF           43.4%  47.4%

NX                  40.9%  45.9%
  ASol / Trundle    59.1%  63.0%
  Nightfall         42.6%  46.9%
  Endure            37.0%  41.5%
  Targon / Demacia  50.4%  55.3%
  Swain OR Pirates  36.8%  41.7%
  Lulu Demacia      33.7%  37.7%
  Stun OR Lee Sin   57.0%  62.3%
  Sej / Gangplank   23.1%  28.6%
  Scout             23.1%  28.3%
  Ez Targon         37.1%  44.0%
  Swain Behold      36.0%  42.6%
  Spider Aggro      27.4%  32.6%
  Deep              40.5%  47.6%
  Discard Aggro     40.2%  47.4%
  Ez / TF           28.7%  36.8%

Ez / Karma          40.7%  42.4%
  ASol / Trundle    50.3%  51.6%
  Nightfall         43.3%  44.8%
  Endure            47.7%  49.2%
  Targon / Demacia  42.6%  44.2%
  Swain OR Pirates  22.2%  23.5%
  Lulu Demacia      40.0%  41.5%
  Stun OR Lee Sin   53.2%  55.2%
  Sej / Gangplank   28.3%  30.2%
  Scout             26.5%  28.4%
  Ez Targon         47.0%  49.3%
  Swain Behold      40.4%  42.4%
  Spider Aggro      44.4%  46.7%
  Deep              37.4%  39.5%
  Discard Aggro     36.4%  38.9%
  Ez / TF           29.3%  31.6%

Ez Targon           40.1%  41.3%
  ASol / Trundle    41.4%  42.2%
  Nightfall         42.1%  43.1%
  Endure            42.2%  43.4%
  Targon / Demacia  38.4%  39.6%
  Swain OR Pirates  31.6%  32.7%
  Lulu Demacia      48.3%  49.3%
  Stun OR Lee Sin   48.3%  49.7%
  Sej / Gangplank   29.9%  31.5%
  Scout             32.9%  34.3%
  Swain Behold      40.3%  41.8%
  Spider Aggro      40.5%  42.1%
  Deep              39.1%  40.7%
  Discard Aggro     44.9%  46.7%
  Ez / TF           38.4%  40.2%

Stun OR Lee Sin     39.6%  40.7%
  ASol / Trundle    43.5%  44.2%
  Nightfall         45.8%  46.6%
  Endure            47.9%  48.9%
  Targon / Demacia  41.2%  42.2%
  Swain OR Pirates  28.3%  29.3%
  Lulu Demacia      34.4%  35.2%
  Sej / Gangplank   34.9%  36.3%
  Scout             30.0%  31.3%
  Ez Targon         49.0%  50.4%
  Swain Behold      39.1%  40.4%
  Spider Aggro      37.6%  39.1%
  Deep              41.1%  42.5%
  Discard Aggro     30.5%  32.1%
  Ez / TF           37.7%  39.4%
```
