/**
 * --- Day 12: Digital Plumber ---
Walking along the memory banks of the stream, you find a small village that is experiencing a little confusion: some programs can't communicate with each other.

Programs in this village communicate using a fixed system of pipes. Messages are passed between programs using these pipes, but most programs aren't connected to each other directly. Instead, programs pass messages between each other until the message reaches the intended recipient.

For some reason, though, some of these messages aren't ever reaching their intended recipient, and the programs suspect that some pipes are missing. They would like you to investigate.

You walk through the village and record the ID of each program and the IDs with which it can communicate directly (your puzzle input). Each program has one or more programs with which it can communicate, and these pipes are bidirectional; if 8 says it can communicate with 11, then 11 will say it can communicate with 8.

You need to figure out how many programs are in the group that contains program ID 0.

For example, suppose you go door-to-door like a travelling salesman and record the following list:

0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5
In this example, the following programs are in the group that contains program ID 0:

Program 0 by definition.
Program 2, directly connected to program 0.
Program 3 via program 2.
Program 4 via program 2.
Program 5 via programs 6, then 4, then 2.
Program 6 via programs 4, then 2.
Therefore, a total of 6 programs are in this group; all but program 1, which has a pipe that connects it to itself.

How many programs are in the group that contains program ID 0?

Your puzzle answer was 288.

--- Part Two ---
There are more programs than just the ones in the group containing program ID 0. The rest of them have no way of reaching that group, and still might have no way of reaching each other.

A group is a collection of programs that can all communicate via pipes either directly or indirectly. The programs you identified just a moment ago are all part of the same group. Now, they would like you to determine the total number of groups.

In the example above, there were 2 groups: one consisting of programs 0,2,3,4,5,6, and the other consisting solely of program 1.

How many groups are there in total?

Your puzzle answer was 211.
 */

function filterDuplicates(i, idx, arr){
    return arr.indexOf(i)===idx;
}

function cleanInput(acc, i) {
       let [l, r] = i.split(" <-> ");
       acc[l] = r.split(", ") 
       return acc;
}

function getPrograms(input){
    return input
        .trim()
        .split("\n")
        .reduce(cleanInput, {});
}

function solveRecursively(data, acc, index){
    if(acc.indexOf(index) !== -1) return acc; 
    acc = [...acc, index]
    acc = [
        ...acc, 
        ...data[index]
        .map(solveRecursively.bind(null, data, acc))
    ];
    return []
        .concat(...acc)
        .filter(filterDuplicates);
}

function removeifInGroup(grp, i){
    return grp.indexOf(i) === -1
}
function getGroups(program, keys, groups){
    if(!keys.length) return groups;
    keys = keys.filter(removeifInGroup.bind(null, solveRecursively(program, [], keys[0])));
    return getGroups(program, keys, ++groups)
    
}

let program = getPrograms(getInput(0));
let zeroGroup = solveRecursively(program, [], "0");

console.log(zeroGroup.length);
console.log(getGroups(program, Object.keys(program), 0))


function getInput(debug){
if(debug) return `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5
`;

return `
0 <-> 480, 1750
1 <-> 52, 393, 635, 800, 840
2 <-> 575, 1950
3 <-> 1188, 1527
4 <-> 177, 897, 898
5 <-> 1214
6 <-> 686
7 <-> 346, 1443
8 <-> 432
9 <-> 449
10 <-> 10, 678
11 <-> 1883
12 <-> 1760
13 <-> 80, 486, 533
14 <-> 483
15 <-> 1360
16 <-> 1812
17 <-> 150, 854, 1727
18 <-> 556, 1743, 1952
19 <-> 195
20 <-> 1146, 1249
21 <-> 31, 624, 1362, 1927
22 <-> 1355, 1895
23 <-> 471, 1624
24 <-> 493, 1424
25 <-> 309
26 <-> 1381
27 <-> 595
28 <-> 760, 1049, 1229
29 <-> 686, 1969
30 <-> 1498
31 <-> 21, 301, 1293
32 <-> 839, 1466
33 <-> 33, 130, 140
34 <-> 1169
35 <-> 579, 1785
36 <-> 1872
37 <-> 280
38 <-> 433, 1903
39 <-> 718
40 <-> 1541
41 <-> 599
42 <-> 1469
43 <-> 175, 205
44 <-> 148, 783
45 <-> 1752
46 <-> 1245, 1331
47 <-> 47, 58
48 <-> 242, 611
49 <-> 1418
50 <-> 129, 446
51 <-> 253
52 <-> 1, 104
53 <-> 830, 1178
54 <-> 673, 1376
55 <-> 202
56 <-> 56, 567, 1447
57 <-> 1486, 1579, 1610
58 <-> 47
59 <-> 1473
60 <-> 633
61 <-> 1780
62 <-> 62
63 <-> 155, 206, 405, 598, 639
64 <-> 1016, 1533
65 <-> 1781
66 <-> 78, 1082, 1446, 1948
67 <-> 1044, 1540
68 <-> 198, 927, 1288
69 <-> 69
70 <-> 1127
71 <-> 531, 1029
72 <-> 747
73 <-> 620, 1517, 1563
74 <-> 942, 1234
75 <-> 351, 506, 1449
76 <-> 1952, 1998
77 <-> 338
78 <-> 66
79 <-> 616, 1466
80 <-> 13, 652, 1955
81 <-> 1899
82 <-> 376, 909, 1112
83 <-> 220, 345, 838, 905, 1153
84 <-> 84
85 <-> 635, 694, 1653
86 <-> 208, 997
87 <-> 87
88 <-> 301
89 <-> 919, 1769, 1805
90 <-> 90, 992, 1720
91 <-> 786, 928
92 <-> 361
93 <-> 440, 939
94 <-> 131, 1703
95 <-> 1539
96 <-> 1752
97 <-> 687
98 <-> 822, 906
99 <-> 1564
100 <-> 597, 1817
101 <-> 162
102 <-> 138, 288, 542, 1816
103 <-> 512, 1946
104 <-> 52
105 <-> 802, 1511, 1527
106 <-> 766, 828
107 <-> 253
108 <-> 582, 1397, 1670, 1734
109 <-> 109
110 <-> 420, 1957
111 <-> 319
112 <-> 633
113 <-> 1056
114 <-> 1042, 1730
115 <-> 884
116 <-> 1428
117 <-> 1256
118 <-> 1177
119 <-> 1015
120 <-> 685, 769
121 <-> 254, 553, 1198
122 <-> 424, 1093
123 <-> 915
124 <-> 637, 690, 1117
125 <-> 1295, 1567
126 <-> 1168
127 <-> 1467, 1634
128 <-> 1858
129 <-> 50, 1950
130 <-> 33, 1521
131 <-> 94
132 <-> 483
133 <-> 1069, 1355
134 <-> 384, 610, 652
135 <-> 1633
136 <-> 1954
137 <-> 237, 377, 1720
138 <-> 102, 266, 406
139 <-> 411
140 <-> 33
141 <-> 523, 1279, 1732
142 <-> 1963
143 <-> 1117
144 <-> 520, 1051, 1142
145 <-> 1018
146 <-> 708, 1544
147 <-> 154, 442, 971, 1661, 1848
148 <-> 44, 1506, 1776
149 <-> 245, 1052, 1506
150 <-> 17, 150, 1565
151 <-> 151, 308
152 <-> 700, 1843
153 <-> 1996
154 <-> 147, 240
155 <-> 63, 990
156 <-> 1386, 1854
157 <-> 1117
158 <-> 687
159 <-> 1845
160 <-> 1477
161 <-> 161
162 <-> 101, 244, 464
163 <-> 1547
164 <-> 632, 1008, 1244, 1339
165 <-> 1332, 1373, 1533
166 <-> 697, 1002, 1871
167 <-> 547, 1004, 1498
168 <-> 559
169 <-> 408
170 <-> 170
171 <-> 398, 1878
172 <-> 1022, 1444
173 <-> 1437, 1515
174 <-> 383
175 <-> 43, 1374
176 <-> 634, 689, 1313, 1401
177 <-> 4
178 <-> 695, 870
179 <-> 179, 687
180 <-> 627, 720, 1071
181 <-> 1859
182 <-> 251, 387
183 <-> 241, 1441
184 <-> 1183, 1774, 1945
185 <-> 185, 436
186 <-> 186, 323, 1495
187 <-> 187
188 <-> 964
189 <-> 441, 808, 1673, 1803
190 <-> 190, 911, 1076
191 <-> 191, 1394
192 <-> 192
193 <-> 193
194 <-> 599, 1656, 1694
195 <-> 19, 295
196 <-> 1362, 1560
197 <-> 322
198 <-> 68
199 <-> 861
200 <-> 978, 1536, 1620
201 <-> 1190, 1315
202 <-> 55, 584, 1539
203 <-> 492, 820, 1444
204 <-> 1821
205 <-> 43, 1367
206 <-> 63, 352
207 <-> 681
208 <-> 86, 1089
209 <-> 1045
210 <-> 1672, 1783
211 <-> 682, 1136
212 <-> 354, 1003, 1403
213 <-> 543
214 <-> 994, 1922
215 <-> 564
216 <-> 541, 811, 1797
217 <-> 1398
218 <-> 542
219 <-> 278, 1527
220 <-> 83
221 <-> 917
222 <-> 515, 870, 1812
223 <-> 1130, 1203, 1891
224 <-> 224
225 <-> 300
226 <-> 424, 1223
227 <-> 793, 1431
228 <-> 1571
229 <-> 1946
230 <-> 256, 318, 1081
231 <-> 231
232 <-> 1294, 1303
233 <-> 671
234 <-> 234, 380, 1902
235 <-> 416, 492
236 <-> 545, 1113
237 <-> 137, 318, 581, 1126, 1561, 1612
238 <-> 906
239 <-> 272, 1135, 1782
240 <-> 154, 240
241 <-> 183
242 <-> 48, 679
243 <-> 396, 1841
244 <-> 162
245 <-> 149, 901, 1688
246 <-> 741
247 <-> 406, 1111, 1343
248 <-> 584
249 <-> 1551
250 <-> 889
251 <-> 182, 1230, 1980
252 <-> 781
253 <-> 51, 107, 325, 1156
254 <-> 121
255 <-> 989, 1200, 1228, 1832
256 <-> 230
257 <-> 758
258 <-> 665
259 <-> 470, 1090, 1645, 1874
260 <-> 964
261 <-> 1649, 1822, 1887, 1956
262 <-> 650
263 <-> 765
264 <-> 264, 391, 1216
265 <-> 329, 1347
266 <-> 138, 474, 1092
267 <-> 1462
268 <-> 268, 873, 1129
269 <-> 410, 866, 1863
270 <-> 1985
271 <-> 558, 1891
272 <-> 239
273 <-> 658, 1598
274 <-> 412, 1135
275 <-> 1478, 1941
276 <-> 276, 1418
277 <-> 347, 1714
278 <-> 219
279 <-> 677, 1198
280 <-> 37, 1399, 1555
281 <-> 281, 1194
282 <-> 637, 1158
283 <-> 815
284 <-> 555, 1554
285 <-> 1727
286 <-> 927
287 <-> 1352
288 <-> 102
289 <-> 1984
290 <-> 344, 1298
291 <-> 1187, 1442
292 <-> 305, 812
293 <-> 1673
294 <-> 331, 1243, 1423
295 <-> 195, 295, 1513, 1821
296 <-> 1078
297 <-> 1002, 1420
298 <-> 566, 1259
299 <-> 299, 1722
300 <-> 225, 1062
301 <-> 31, 88, 779, 1337
302 <-> 917
303 <-> 1367
304 <-> 1038, 1773
305 <-> 292, 1554, 1808
306 <-> 1065, 1471
307 <-> 1246, 1614, 1702
308 <-> 151, 443, 1205
309 <-> 25, 1522
310 <-> 729, 1977
311 <-> 1011
312 <-> 559, 718, 1471
313 <-> 1047, 1441
314 <-> 480, 1676
315 <-> 316, 1943
316 <-> 315, 555, 753
317 <-> 398, 428, 534, 1959
318 <-> 230, 237
319 <-> 111, 591
320 <-> 394
321 <-> 1832, 1866
322 <-> 197, 1768
323 <-> 186
324 <-> 1156, 1208, 1575
325 <-> 253
326 <-> 1584, 1845
327 <-> 1077
328 <-> 1009
329 <-> 265, 329, 1070, 1128
330 <-> 1892
331 <-> 294
332 <-> 1616, 1786, 1962
333 <-> 1667
334 <-> 1135
335 <-> 548
336 <-> 969, 1855, 1868
337 <-> 610
338 <-> 77, 1044
339 <-> 809, 1114
340 <-> 1841
341 <-> 578
342 <-> 1099
343 <-> 1410
344 <-> 290, 379, 991
345 <-> 83, 1317, 1588
346 <-> 7, 547
347 <-> 277, 1478
348 <-> 348, 802
349 <-> 1286, 1504
350 <-> 767, 1073
351 <-> 75, 731, 1163, 1526, 1558
352 <-> 206, 1733
353 <-> 731
354 <-> 212
355 <-> 404
356 <-> 1666
357 <-> 1116
358 <-> 1552, 1739
359 <-> 360
360 <-> 359, 1564, 1876
361 <-> 92, 949, 1741
362 <-> 441, 730, 1053
363 <-> 1469
364 <-> 1936
365 <-> 1250, 1529
366 <-> 366, 413, 1520
367 <-> 407, 1338, 1681, 1692
368 <-> 1312
369 <-> 1572, 1628, 1811
370 <-> 430
371 <-> 1886
372 <-> 1416
373 <-> 1943
374 <-> 569
375 <-> 556
376 <-> 82, 834
377 <-> 137, 1779
378 <-> 1177, 1478
379 <-> 344, 728, 801, 1141
380 <-> 234
381 <-> 940
382 <-> 611, 996
383 <-> 174, 515, 596, 1903
384 <-> 134
385 <-> 1408, 1471
386 <-> 1061, 1867
387 <-> 182
388 <-> 1123
389 <-> 397, 1068
390 <-> 1503
391 <-> 264, 1138, 1921
392 <-> 1996
393 <-> 1
394 <-> 320, 665, 1106
395 <-> 395
396 <-> 243, 831
397 <-> 389, 1193
398 <-> 171, 317
399 <-> 399
400 <-> 740, 1448
401 <-> 659, 963, 1929
402 <-> 1396
403 <-> 1082, 1793
404 <-> 355, 404, 613, 1901
405 <-> 63, 716, 1602
406 <-> 138, 247
407 <-> 367, 1186, 1996
408 <-> 169, 472, 1551
409 <-> 1078, 1216
410 <-> 269, 1328
411 <-> 139, 1758
412 <-> 274
413 <-> 366, 986, 1171, 1836
414 <-> 783
415 <-> 947
416 <-> 235, 1976
417 <-> 473, 774
418 <-> 1010, 1082
419 <-> 612
420 <-> 110
421 <-> 1747, 1804
422 <-> 422, 1987
423 <-> 423
424 <-> 122, 226, 1119
425 <-> 707, 1378
426 <-> 1199, 1325
427 <-> 1415
428 <-> 317, 702, 930
429 <-> 485, 700, 1601
430 <-> 370, 627
431 <-> 1297, 1622
432 <-> 8, 705, 736, 1649
433 <-> 38
434 <-> 607, 1787
435 <-> 1803
436 <-> 185
437 <-> 437, 1634
438 <-> 716, 1152
439 <-> 1098, 1798, 1991
440 <-> 93, 440
441 <-> 189, 362, 449
442 <-> 147
443 <-> 308, 1505
444 <-> 444
445 <-> 445, 1001, 1165, 1591
446 <-> 50, 457, 712, 1683
447 <-> 1822
448 <-> 1525
449 <-> 9, 441, 668
450 <-> 782
451 <-> 745, 868, 1296, 1453
452 <-> 1295
453 <-> 465, 997
454 <-> 663
455 <-> 839, 1197
456 <-> 1802, 1949
457 <-> 446, 577, 605, 1101
458 <-> 691, 1466, 1635, 1643
459 <-> 1484
460 <-> 1672, 1953
461 <-> 577, 989, 1393, 1799
462 <-> 462
463 <-> 552, 1474
464 <-> 162, 669
465 <-> 453
466 <-> 1213, 1345
467 <-> 706, 941
468 <-> 1254, 1478
469 <-> 1658
470 <-> 259, 1464, 1624, 1797
471 <-> 23
472 <-> 408, 1549
473 <-> 417, 676
474 <-> 266, 1340, 1543
475 <-> 1699, 1717
476 <-> 1048, 1741
477 <-> 1741
478 <-> 1627
479 <-> 1494
480 <-> 0, 314
481 <-> 1206
482 <-> 987
483 <-> 14, 132, 1844, 1881, 1961
484 <-> 1320
485 <-> 429, 1544
486 <-> 13, 1097
487 <-> 1130
488 <-> 1606
489 <-> 1544
490 <-> 1752
491 <-> 545, 641
492 <-> 203, 235, 1518, 1538, 1633
493 <-> 24, 1029
494 <-> 834, 962
495 <-> 495
496 <-> 1069
497 <-> 571, 638, 993, 1067
498 <-> 1220
499 <-> 521, 1919
500 <-> 1650, 1768
501 <-> 843, 1932
502 <-> 1318, 1751
503 <-> 976
504 <-> 1151
505 <-> 594, 1282, 1433
506 <-> 75
507 <-> 1932
508 <-> 932, 934, 1439, 1938
509 <-> 509
510 <-> 1284
511 <-> 1324
512 <-> 103, 813, 1011
513 <-> 1120
514 <-> 742
515 <-> 222, 383
516 <-> 1976
517 <-> 776, 790, 821, 1242
518 <-> 647, 1549
519 <-> 671, 1457
520 <-> 144
521 <-> 499, 1207
522 <-> 1634
523 <-> 141, 1310
524 <-> 1604
525 <-> 1933
526 <-> 592, 1671, 1712
527 <-> 527
528 <-> 1167, 1171, 1309
529 <-> 529, 1137
530 <-> 980
531 <-> 71
532 <-> 750
533 <-> 13
534 <-> 317, 1440
535 <-> 685, 922, 1034, 1427
536 <-> 1784
537 <-> 1677
538 <-> 1635
539 <-> 1575
540 <-> 1243
541 <-> 216, 617, 1095, 1834
542 <-> 102, 218
543 <-> 213, 1346, 1501
544 <-> 1648
545 <-> 236, 491
546 <-> 994, 1800
547 <-> 167, 346, 1724
548 <-> 335, 693
549 <-> 1707
550 <-> 1526
551 <-> 1159
552 <-> 463, 1658
553 <-> 121, 1103
554 <-> 1641, 1891
555 <-> 284, 316
556 <-> 18, 375
557 <-> 1081
558 <-> 271, 1033
559 <-> 168, 312, 1014, 1660
560 <-> 1536
561 <-> 1681
562 <-> 973, 1136
563 <-> 1114
564 <-> 215, 1429
565 <-> 565, 1960
566 <-> 298, 636, 959, 1135, 1136
567 <-> 56, 709
568 <-> 1772
569 <-> 374, 569, 763
570 <-> 604, 1862
571 <-> 497
572 <-> 1896
573 <-> 573, 997, 1640, 1711
574 <-> 1806
575 <-> 2
576 <-> 1953
577 <-> 457, 461, 1499, 1771
578 <-> 341, 981, 1344, 1701
579 <-> 35, 735, 765
580 <-> 580, 1116
581 <-> 237
582 <-> 108
583 <-> 1227, 1762
584 <-> 202, 248, 795, 1523, 1537, 1845
585 <-> 1389, 1943
586 <-> 586, 867
587 <-> 587, 1145, 1574, 1651
588 <-> 744
589 <-> 593, 799
590 <-> 1160
591 <-> 319, 863, 1260
592 <-> 526, 1622
593 <-> 589, 1267
594 <-> 505
595 <-> 27, 595
596 <-> 383, 1951
597 <-> 100
598 <-> 63
599 <-> 41, 194
600 <-> 1397
601 <-> 722, 1115
602 <-> 974
603 <-> 1348
604 <-> 570, 604, 1342
605 <-> 457, 630, 1479, 1767
606 <-> 606
607 <-> 434
608 <-> 863, 1421
609 <-> 1505, 1524
610 <-> 134, 337, 1380
611 <-> 48, 382
612 <-> 419, 763
613 <-> 404, 729
614 <-> 1211, 1496, 1654
615 <-> 1152
616 <-> 79
617 <-> 541, 960
618 <-> 1224, 1889
619 <-> 837, 1094
620 <-> 73
621 <-> 717
622 <-> 716, 1570
623 <-> 770
624 <-> 21, 1564
625 <-> 750, 807, 1042, 1715
626 <-> 1164, 1307, 1700, 1933
627 <-> 180, 430, 666
628 <-> 1194, 1463
629 <-> 875
630 <-> 605
631 <-> 846, 1731
632 <-> 164, 1454, 1579
633 <-> 60, 112, 1940
634 <-> 176
635 <-> 1, 85, 1948
636 <-> 566, 1057
637 <-> 124, 282
638 <-> 497, 727
639 <-> 63
640 <-> 843, 884, 1603
641 <-> 491, 641
642 <-> 875
643 <-> 1719
644 <-> 1214
645 <-> 1608
646 <-> 1043, 1477
647 <-> 518
648 <-> 998
649 <-> 649
650 <-> 262, 650
651 <-> 1340
652 <-> 80, 134
653 <-> 1020, 1600
654 <-> 1080, 1182
655 <-> 1499
656 <-> 656, 968
657 <-> 1608
658 <-> 273, 1245, 1698
659 <-> 401, 1049, 1774
660 <-> 660, 1877
661 <-> 1374
662 <-> 1808, 1910, 1949
663 <-> 454, 663, 721, 1823
664 <-> 664
665 <-> 258, 394, 1820
666 <-> 627, 1334, 1765
667 <-> 1158
668 <-> 449, 1073, 1336
669 <-> 464, 1362, 1716
670 <-> 670
671 <-> 233, 519, 1806
672 <-> 928, 1397, 1923
673 <-> 54, 673, 1239, 1626
674 <-> 996, 1846
675 <-> 1452, 1531
676 <-> 473, 1080, 1195
677 <-> 279
678 <-> 10
679 <-> 242
680 <-> 770, 1082
681 <-> 207, 1768
682 <-> 211, 1780
683 <-> 1366, 1969
684 <-> 1500
685 <-> 120, 535
686 <-> 6, 29, 1480
687 <-> 97, 158, 179
688 <-> 797
689 <-> 176, 902, 1656, 1735
690 <-> 124
691 <-> 458, 1685
692 <-> 977
693 <-> 548, 693, 999
694 <-> 85
695 <-> 178, 1161, 1173
696 <-> 1691
697 <-> 166
698 <-> 698
699 <-> 1632
700 <-> 152, 429, 1380, 1583
701 <-> 1393
702 <-> 428, 1072, 1123
703 <-> 703
704 <-> 1504
705 <-> 432, 1553
706 <-> 467
707 <-> 425, 950
708 <-> 146
709 <-> 567
710 <-> 710
711 <-> 1536
712 <-> 446
713 <-> 1118
714 <-> 1031, 1087
715 <-> 843
716 <-> 405, 438, 622, 809, 879
717 <-> 621, 1564, 1753
718 <-> 39, 312, 1628
719 <-> 852, 1592
720 <-> 180
721 <-> 663
722 <-> 601, 824
723 <-> 723
724 <-> 1053
725 <-> 1752, 1898
726 <-> 998, 1841
727 <-> 638
728 <-> 379
729 <-> 310, 613, 1127
730 <-> 362
731 <-> 351, 353, 1614, 1619
732 <-> 1258, 1911
733 <-> 1883
734 <-> 987
735 <-> 579, 1758
736 <-> 432
737 <-> 760
738 <-> 1125
739 <-> 1492
740 <-> 400, 1794
741 <-> 246, 1202
742 <-> 514, 1607
743 <-> 743, 948
744 <-> 588, 753
745 <-> 451
746 <-> 963, 1370, 1611, 1815, 1941
747 <-> 72, 1453
748 <-> 748, 1017
749 <-> 1160, 1661
750 <-> 532, 625
751 <-> 751, 1395
752 <-> 1788
753 <-> 316, 744
754 <-> 1329
755 <-> 1005, 1468, 1943
756 <-> 1227, 1247
757 <-> 1687
758 <-> 257, 1292, 1893
759 <-> 759, 1629
760 <-> 28, 737, 949
761 <-> 1543
762 <-> 840, 1216
763 <-> 569, 612, 1302, 1490
764 <-> 817, 1606
765 <-> 263, 579, 1731
766 <-> 106
767 <-> 350
768 <-> 1261, 1569
769 <-> 120, 1119, 1663, 1812
770 <-> 623, 680
771 <-> 1752
772 <-> 1242
773 <-> 1421, 1548
774 <-> 417, 1841
775 <-> 1801, 1880
776 <-> 517, 1221
777 <-> 1596, 1923
778 <-> 778
779 <-> 301
780 <-> 993
781 <-> 252, 781
782 <-> 450, 782, 1745
783 <-> 44, 414, 833, 1088
784 <-> 1914
785 <-> 799
786 <-> 91
787 <-> 972, 1744, 1830
788 <-> 788
789 <-> 1246
790 <-> 517, 790, 1256
791 <-> 838
792 <-> 1360, 1393
793 <-> 227, 793
794 <-> 1601
795 <-> 584, 1337
796 <-> 1537, 1549
797 <-> 688, 1221
798 <-> 1412
799 <-> 589, 785, 799, 1763
800 <-> 1
801 <-> 379
802 <-> 105, 348
803 <-> 1638, 1901
804 <-> 1356
805 <-> 1424
806 <-> 906, 983
807 <-> 625
808 <-> 189
809 <-> 339, 716
810 <-> 1775, 1938
811 <-> 216
812 <-> 292
813 <-> 512
814 <-> 1194
815 <-> 283, 1439
816 <-> 982, 1049
817 <-> 764, 860, 913
818 <-> 1027, 1394, 1396
819 <-> 1045, 1992
820 <-> 203
821 <-> 517, 865
822 <-> 98
823 <-> 920
824 <-> 722, 1409, 1530
825 <-> 1036
826 <-> 1794
827 <-> 842
828 <-> 106, 881, 1327
829 <-> 829
830 <-> 53
831 <-> 396, 885
832 <-> 1130, 1582
833 <-> 783
834 <-> 376, 494, 1236
835 <-> 1241
836 <-> 911, 1596
837 <-> 619, 1099
838 <-> 83, 791, 1334
839 <-> 32, 455, 1963
840 <-> 1, 762, 918
841 <-> 841
842 <-> 827, 1000
843 <-> 501, 640, 715, 1174
844 <-> 1448
845 <-> 1376, 1635, 1769
846 <-> 631, 1893, 1981
847 <-> 1508
848 <-> 1007
849 <-> 849, 886
850 <-> 1430
851 <-> 860
852 <-> 719, 897, 1272
853 <-> 1374
854 <-> 17, 956, 1536
855 <-> 1774
856 <-> 1378
857 <-> 1171
858 <-> 958, 1180, 1718
859 <-> 1585
860 <-> 817, 851
861 <-> 199, 1184, 1509
862 <-> 965, 1095, 1786
863 <-> 591, 608, 961, 1108
864 <-> 864
865 <-> 821
866 <-> 269, 1973
867 <-> 586
868 <-> 451, 905, 1710
869 <-> 997, 1508
870 <-> 178, 222, 1358
871 <-> 973
872 <-> 1724
873 <-> 268, 1169, 1613
874 <-> 1360
875 <-> 629, 642, 1077
876 <-> 915, 1149, 1512
877 <-> 949
878 <-> 1070
879 <-> 716, 1573
880 <-> 1371, 1552
881 <-> 828, 1483, 1883
882 <-> 1121, 1257
883 <-> 976, 1500
884 <-> 115, 640
885 <-> 831, 1012
886 <-> 849
887 <-> 1292
888 <-> 1728, 1947
889 <-> 250, 984, 1840
890 <-> 1864
891 <-> 1612
892 <-> 1492
893 <-> 928
894 <-> 1534, 1920
895 <-> 1751, 1928, 1989
896 <-> 1363, 1914
897 <-> 4, 852, 897
898 <-> 4, 1926
899 <-> 1668, 1840
900 <-> 1239
901 <-> 245
902 <-> 689, 1426, 1971
903 <-> 903, 1817
904 <-> 1721, 1755
905 <-> 83, 868
906 <-> 98, 238, 806, 1528, 1931
907 <-> 1671, 1833
908 <-> 1736
909 <-> 82, 1689
910 <-> 988, 1023
911 <-> 190, 836
912 <-> 1694
913 <-> 817
914 <-> 915
915 <-> 123, 876, 914, 1562
916 <-> 920, 997, 1278
917 <-> 221, 302, 1739
918 <-> 840
919 <-> 89
920 <-> 823, 916
921 <-> 1198, 1266, 1282, 1678
922 <-> 535
923 <-> 923
924 <-> 1464, 1636
925 <-> 1002, 1419
926 <-> 1697
927 <-> 68, 286, 1010
928 <-> 91, 672, 893, 1997
929 <-> 1311, 1475, 1954
930 <-> 428
931 <-> 1271
932 <-> 508
933 <-> 1330, 1681
934 <-> 508
935 <-> 1103, 1982
936 <-> 1088, 1773
937 <-> 1130, 1324
938 <-> 1104, 1118, 1590
939 <-> 93, 1726
940 <-> 381, 1621, 1865
941 <-> 467, 941
942 <-> 74, 1519, 1764, 1930
943 <-> 1465, 1545
944 <-> 1353
945 <-> 1665
946 <-> 1727
947 <-> 415, 1118
948 <-> 743
949 <-> 361, 760, 877, 1122
950 <-> 707, 1782
951 <-> 1438
952 <-> 952, 1180
953 <-> 1685
954 <-> 954
955 <-> 955, 1287, 1541
956 <-> 854
957 <-> 957
958 <-> 858
959 <-> 566, 1429
960 <-> 617
961 <-> 863
962 <-> 494
963 <-> 401, 746, 1132
964 <-> 188, 260, 1064, 1424
965 <-> 862
966 <-> 1742
967 <-> 1692, 1713
968 <-> 656
969 <-> 336, 1770
970 <-> 1523
971 <-> 147
972 <-> 787
973 <-> 562, 871
974 <-> 602, 1026, 1754
975 <-> 985
976 <-> 503, 883, 1636
977 <-> 692, 1298
978 <-> 200
979 <-> 1068, 1306
980 <-> 530, 1894
981 <-> 578, 1043, 1385
982 <-> 816, 1057
983 <-> 806, 1085, 1375, 1430
984 <-> 889, 1517
985 <-> 975, 1762
986 <-> 413
987 <-> 482, 734, 987
988 <-> 910, 988
989 <-> 255, 461, 1422, 1768
990 <-> 155, 1589
991 <-> 344, 1365
992 <-> 90
993 <-> 497, 780, 1688, 1888
994 <-> 214, 546
995 <-> 1246, 1268
996 <-> 382, 674
997 <-> 86, 453, 573, 869, 916
998 <-> 648, 726
999 <-> 693, 1172
1000 <-> 842, 1086, 1828
1001 <-> 445
1002 <-> 166, 297, 925, 1002
1003 <-> 212, 1458
1004 <-> 167, 1610
1005 <-> 755
1006 <-> 1613
1007 <-> 848, 1007
1008 <-> 164, 1225, 1316
1009 <-> 328, 1009
1010 <-> 418, 927, 1657
1011 <-> 311, 512, 1287, 1476
1012 <-> 885
1013 <-> 1264, 1473, 1678
1014 <-> 559
1015 <-> 119, 1502
1016 <-> 64, 1349
1017 <-> 748
1018 <-> 145, 1018
1019 <-> 1791
1020 <-> 653, 1663
1021 <-> 1854
1022 <-> 172
1023 <-> 910
1024 <-> 1151, 1913
1025 <-> 1359
1026 <-> 974, 1857
1027 <-> 818, 1351, 1760
1028 <-> 1677
1029 <-> 71, 493
1030 <-> 1030, 1175
1031 <-> 714
1032 <-> 1318
1033 <-> 558, 1861
1034 <-> 535
1035 <-> 1035, 1958
1036 <-> 825, 1310, 1742
1037 <-> 1862
1038 <-> 304, 1199
1039 <-> 1168, 1480
1040 <-> 1639, 1861, 1886
1041 <-> 1041, 1050
1042 <-> 114, 625
1043 <-> 646, 981, 1219
1044 <-> 67, 338, 1634
1045 <-> 209, 819
1046 <-> 1148, 1154, 1459
1047 <-> 313, 1921
1048 <-> 476
1049 <-> 28, 659, 816, 1356, 1427, 1795, 1934
1050 <-> 1041
1051 <-> 144
1052 <-> 149, 1052, 1383, 1423, 1621
1053 <-> 362, 724
1054 <-> 1054
1055 <-> 1491, 1784
1056 <-> 113, 1567
1057 <-> 636, 982
1058 <-> 1096, 1257, 1617, 1729
1059 <-> 1059, 1130
1060 <-> 1343, 1647, 1892
1061 <-> 386
1062 <-> 300, 1062, 1829
1063 <-> 1063, 1571
1064 <-> 964, 1846
1065 <-> 306
1066 <-> 1323, 1785
1067 <-> 497
1068 <-> 389, 979, 1330
1069 <-> 133, 496
1070 <-> 329, 878
1071 <-> 180
1072 <-> 702
1073 <-> 350, 668
1074 <-> 1188
1075 <-> 1534
1076 <-> 190, 1158
1077 <-> 327, 875, 1444
1078 <-> 296, 409
1079 <-> 1450
1080 <-> 654, 676
1081 <-> 230, 557, 1896
1082 <-> 66, 403, 418, 680
1083 <-> 1134
1084 <-> 1807, 1860
1085 <-> 983, 1555
1086 <-> 1000, 1992
1087 <-> 714, 1216, 1728, 1895
1088 <-> 783, 936
1089 <-> 208
1090 <-> 259
1091 <-> 1213
1092 <-> 266
1093 <-> 122
1094 <-> 619, 1814
1095 <-> 541, 862, 1830
1096 <-> 1058, 1145
1097 <-> 486, 1894
1098 <-> 439, 1133
1099 <-> 342, 837
1100 <-> 1559, 1931
1101 <-> 457
1102 <-> 1570
1103 <-> 553, 935
1104 <-> 938, 1897
1105 <-> 1425
1106 <-> 394
1107 <-> 1304, 1566
1108 <-> 863
1109 <-> 1423
1110 <-> 1149, 1217
1111 <-> 247, 1111
1112 <-> 82
1113 <-> 236
1114 <-> 339, 563
1115 <-> 601
1116 <-> 357, 580
1117 <-> 124, 143, 157
1118 <-> 713, 938, 947
1119 <-> 424, 769
1120 <-> 513, 1606
1121 <-> 882
1122 <-> 949
1123 <-> 388, 702
1124 <-> 1255, 1552
1125 <-> 738, 1923
1126 <-> 237
1127 <-> 70, 729
1128 <-> 329
1129 <-> 268
1130 <-> 223, 487, 832, 937, 1059
1131 <-> 1661
1132 <-> 963, 1253, 1810
1133 <-> 1098, 1354, 1852
1134 <-> 1083, 1134
1135 <-> 239, 274, 334, 566
1136 <-> 211, 562, 566, 1504
1137 <-> 529
1138 <-> 391, 1869
1139 <-> 1499
1140 <-> 1140
1141 <-> 379, 1403
1142 <-> 144, 1957
1143 <-> 1507, 1688
1144 <-> 1189
1145 <-> 587, 1096, 1372, 1942
1146 <-> 20, 1668
1147 <-> 1168
1148 <-> 1046, 1148
1149 <-> 876, 1110, 1758
1150 <-> 1491
1151 <-> 504, 1024, 1164
1152 <-> 438, 615, 1152, 1837
1153 <-> 83
1154 <-> 1046
1155 <-> 1412, 1725
1156 <-> 253, 324
1157 <-> 1381, 1631
1158 <-> 282, 667, 1076
1159 <-> 551, 1159
1160 <-> 590, 749
1161 <-> 695, 1841
1162 <-> 1535
1163 <-> 351
1164 <-> 626, 1151
1165 <-> 445, 1680
1166 <-> 1752, 1895
1167 <-> 528, 1501
1168 <-> 126, 1039, 1147
1169 <-> 34, 873
1170 <-> 1556
1171 <-> 413, 528, 857, 1365
1172 <-> 999
1173 <-> 695, 1988
1174 <-> 843, 1174
1175 <-> 1030
1176 <-> 1609
1177 <-> 118, 378, 1213
1178 <-> 53, 1839
1179 <-> 1281, 1674
1180 <-> 858, 952
1181 <-> 1542
1182 <-> 654
1183 <-> 184
1184 <-> 861, 1489, 1803
1185 <-> 1251
1186 <-> 407
1187 <-> 291
1188 <-> 3, 1074, 1627
1189 <-> 1144, 1189
1190 <-> 201, 1769
1191 <-> 1735
1192 <-> 1542, 1860
1193 <-> 397
1194 <-> 281, 628, 814
1195 <-> 676
1196 <-> 1196
1197 <-> 455
1198 <-> 121, 279, 921
1199 <-> 426, 1038
1200 <-> 255, 1381, 1882
1201 <-> 1536, 1691
1202 <-> 741, 1216
1203 <-> 223, 1922
1204 <-> 1243
1205 <-> 308
1206 <-> 481, 1206, 1434, 1605
1207 <-> 521
1208 <-> 324
1209 <-> 1209
1210 <-> 1298
1211 <-> 614, 1402
1212 <-> 1778
1213 <-> 466, 1091, 1177
1214 <-> 5, 644, 1862
1215 <-> 1215
1216 <-> 264, 409, 762, 1087, 1202
1217 <-> 1110
1218 <-> 1503
1219 <-> 1043
1220 <-> 498, 1475
1221 <-> 776, 797, 1359
1222 <-> 1316
1223 <-> 226
1224 <-> 618
1225 <-> 1008
1226 <-> 1387, 1517
1227 <-> 583, 756
1228 <-> 255
1229 <-> 28, 1659
1230 <-> 251
1231 <-> 1231
1232 <-> 1232, 1578, 1857
1233 <-> 1233
1234 <-> 74, 1326, 1576
1235 <-> 1772, 1783
1236 <-> 834, 1734
1237 <-> 1868, 1998
1238 <-> 1305, 1538
1239 <-> 673, 900, 1818
1240 <-> 1792, 1800
1241 <-> 835, 1751, 1925
1242 <-> 517, 772
1243 <-> 294, 540, 1204
1244 <-> 164
1245 <-> 46, 658
1246 <-> 307, 789, 995
1247 <-> 756, 1284
1248 <-> 1283
1249 <-> 20
1250 <-> 365
1251 <-> 1185, 1456, 1981
1252 <-> 1998
1253 <-> 1132
1254 <-> 468
1255 <-> 1124, 1255
1256 <-> 117, 790, 1970
1257 <-> 882, 1058, 1503
1258 <-> 732
1259 <-> 298
1260 <-> 591, 1497
1261 <-> 768, 1768
1262 <-> 1262
1263 <-> 1783
1264 <-> 1013, 1719
1265 <-> 1842
1266 <-> 921, 1432
1267 <-> 593
1268 <-> 995, 1390
1269 <-> 1364
1270 <-> 1667, 1781
1271 <-> 931, 1982
1272 <-> 852, 1472
1273 <-> 1961
1274 <-> 1749
1275 <-> 1364, 1445
1276 <-> 1299, 1480
1277 <-> 1277
1278 <-> 916, 1326
1279 <-> 141
1280 <-> 1280, 1775
1281 <-> 1179
1282 <-> 505, 921, 1388, 1455
1283 <-> 1248, 1363
1284 <-> 510, 1247, 1979
1285 <-> 1943
1286 <-> 349
1287 <-> 955, 1011
1288 <-> 68, 1813
1289 <-> 1883
1290 <-> 1977
1291 <-> 1751
1292 <-> 758, 887, 1529
1293 <-> 31
1294 <-> 232, 1517
1295 <-> 125, 452, 1397
1296 <-> 451
1297 <-> 431, 1775
1298 <-> 290, 977, 1210
1299 <-> 1276
1300 <-> 1300
1301 <-> 1480, 1755
1302 <-> 763, 1806
1303 <-> 232
1304 <-> 1107, 1510, 1841
1305 <-> 1238, 1680
1306 <-> 979
1307 <-> 626
1308 <-> 1854
1309 <-> 528, 1993
1310 <-> 523, 1036, 1310
1311 <-> 929, 1311
1312 <-> 368, 1957
1313 <-> 176, 1756
1314 <-> 1314
1315 <-> 201
1316 <-> 1008, 1222, 1736
1317 <-> 345
1318 <-> 502, 1032, 1914
1319 <-> 1503
1320 <-> 484, 1961
1321 <-> 1635
1322 <-> 1322, 1777
1323 <-> 1066
1324 <-> 511, 937
1325 <-> 426
1326 <-> 1234, 1278, 1912
1327 <-> 828, 1931
1328 <-> 410, 1866
1329 <-> 754, 1664, 1698
1330 <-> 933, 1068
1331 <-> 46
1332 <-> 165
1333 <-> 1884, 1886
1334 <-> 666, 838, 1983
1335 <-> 1516, 1849
1336 <-> 668, 1384
1337 <-> 301, 795
1338 <-> 367, 1535
1339 <-> 164
1340 <-> 474, 651
1341 <-> 1341
1342 <-> 604
1343 <-> 247, 1060
1344 <-> 578, 1637, 1665, 1917, 1980
1345 <-> 466
1346 <-> 543
1347 <-> 265
1348 <-> 603, 1348
1349 <-> 1016
1350 <-> 1677
1351 <-> 1027
1352 <-> 287, 1527, 1878
1353 <-> 944, 1353
1354 <-> 1133, 1485
1355 <-> 22, 133
1356 <-> 804, 1049, 1813
1357 <-> 1507
1358 <-> 870, 1889
1359 <-> 1025, 1221
1360 <-> 15, 792, 874
1361 <-> 1361
1362 <-> 21, 196, 669, 1544
1363 <-> 896, 1283
1364 <-> 1269, 1275
1365 <-> 991, 1171
1366 <-> 683
1367 <-> 205, 303
1368 <-> 1400, 1473
1369 <-> 1537
1370 <-> 746, 1451
1371 <-> 880
1372 <-> 1145
1373 <-> 165, 1482
1374 <-> 175, 661, 853, 1374
1375 <-> 983
1376 <-> 54, 845, 1433
1377 <-> 1653
1378 <-> 425, 856
1379 <-> 1604
1380 <-> 610, 700, 1967
1381 <-> 26, 1157, 1200
1382 <-> 1382, 1581, 1969
1383 <-> 1052
1384 <-> 1336
1385 <-> 981
1386 <-> 156, 1632
1387 <-> 1226
1388 <-> 1282
1389 <-> 585
1390 <-> 1268
1391 <-> 1951
1392 <-> 1392
1393 <-> 461, 701, 792
1394 <-> 191, 818
1395 <-> 751
1396 <-> 402, 818
1397 <-> 108, 600, 672, 1295, 1937
1398 <-> 217, 1675, 1943
1399 <-> 280
1400 <-> 1368
1401 <-> 176
1402 <-> 1211, 1699
1403 <-> 212, 1141
1404 <-> 1489
1405 <-> 1479
1406 <-> 1406, 1900
1407 <-> 1407
1408 <-> 385
1409 <-> 824, 1778, 1964
1410 <-> 343, 1568
1411 <-> 1796
1412 <-> 798, 1155
1413 <-> 1551
1414 <-> 1460, 1686
1415 <-> 427, 1630, 1937
1416 <-> 372, 1821
1417 <-> 1554, 1690
1418 <-> 49, 276
1419 <-> 925
1420 <-> 297
1421 <-> 608, 773, 1543
1422 <-> 989, 1520
1423 <-> 294, 1052, 1109, 1618
1424 <-> 24, 805, 964
1425 <-> 1105, 1822
1426 <-> 902
1427 <-> 535, 1049, 1986
1428 <-> 116, 1805
1429 <-> 564, 959, 1978
1430 <-> 850, 983
1431 <-> 227
1432 <-> 1266
1433 <-> 505, 1376
1434 <-> 1206
1435 <-> 1435, 1940
1436 <-> 1980
1437 <-> 173, 1853
1438 <-> 951, 1517
1439 <-> 508, 815, 1606
1440 <-> 534
1441 <-> 183, 313, 1788
1442 <-> 291, 1532, 1657
1443 <-> 7
1444 <-> 172, 203, 1077
1445 <-> 1275, 1445
1446 <-> 66
1447 <-> 56
1448 <-> 400, 844, 1568
1449 <-> 75, 1449, 1870
1450 <-> 1079, 1859
1451 <-> 1370
1452 <-> 675
1453 <-> 451, 747, 1462, 1944
1454 <-> 632, 1563
1455 <-> 1282
1456 <-> 1251, 1654
1457 <-> 519
1458 <-> 1003, 1575
1459 <-> 1046
1460 <-> 1414
1461 <-> 1830, 1986
1462 <-> 267, 1453
1463 <-> 628, 1911
1464 <-> 470, 924
1465 <-> 943, 1738
1466 <-> 32, 79, 458
1467 <-> 127
1468 <-> 755
1469 <-> 42, 363, 1469
1470 <-> 1600
1471 <-> 306, 312, 385
1472 <-> 1272, 1607
1473 <-> 59, 1013, 1368, 1695, 1992
1474 <-> 463, 1480
1475 <-> 929, 1220, 1724
1476 <-> 1011
1477 <-> 160, 646
1478 <-> 275, 347, 378, 468
1479 <-> 605, 1405, 1867
1480 <-> 686, 1039, 1276, 1301, 1474
1481 <-> 1926
1482 <-> 1373, 1529
1483 <-> 881
1484 <-> 459, 1540
1485 <-> 1354
1486 <-> 57
1487 <-> 1715, 1915
1488 <-> 1488
1489 <-> 1184, 1404
1490 <-> 763
1491 <-> 1055, 1150, 1491
1492 <-> 739, 892, 1776
1493 <-> 1493
1494 <-> 479, 1907
1495 <-> 186
1496 <-> 614
1497 <-> 1260
1498 <-> 30, 167
1499 <-> 577, 655, 1139
1500 <-> 684, 883
1501 <-> 543, 1167, 1965
1502 <-> 1015, 1502
1503 <-> 390, 1218, 1257, 1319, 1906
1504 <-> 349, 704, 1136, 1750
1505 <-> 443, 609
1506 <-> 148, 149
1507 <-> 1143, 1357
1508 <-> 847, 869
1509 <-> 861, 1837
1510 <-> 1304
1511 <-> 105
1512 <-> 876
1513 <-> 295
1514 <-> 1514
1515 <-> 173, 1593, 1809
1516 <-> 1335, 1599
1517 <-> 73, 984, 1226, 1294, 1438
1518 <-> 492
1519 <-> 942
1520 <-> 366, 1422
1521 <-> 130
1522 <-> 309, 1522
1523 <-> 584, 970, 1826
1524 <-> 609
1525 <-> 448, 1525
1526 <-> 351, 550
1527 <-> 3, 105, 219, 1352
1528 <-> 906, 1718
1529 <-> 365, 1292, 1482
1530 <-> 824
1531 <-> 675, 1531
1532 <-> 1442
1533 <-> 64, 165, 1804
1534 <-> 894, 1075, 1959
1535 <-> 1162, 1338, 1854
1536 <-> 200, 560, 711, 854, 1201, 1873
1537 <-> 584, 796, 1369
1538 <-> 492, 1238
1539 <-> 95, 202
1540 <-> 67, 1484
1541 <-> 40, 955
1542 <-> 1181, 1192
1543 <-> 474, 761, 1421
1544 <-> 146, 485, 489, 1362, 1753
1545 <-> 943
1546 <-> 1546
1547 <-> 163, 1993
1548 <-> 773
1549 <-> 472, 518, 796
1550 <-> 1550
1551 <-> 249, 408, 1413
1552 <-> 358, 880, 1124
1553 <-> 705
1554 <-> 284, 305, 1417, 1554, 1904
1555 <-> 280, 1085
1556 <-> 1170, 1989
1557 <-> 1847
1558 <-> 351, 1864
1559 <-> 1100
1560 <-> 196
1561 <-> 237, 1738
1562 <-> 915
1563 <-> 73, 1454
1564 <-> 99, 360, 624, 717
1565 <-> 150
1566 <-> 1107
1567 <-> 125, 1056
1568 <-> 1410, 1448
1569 <-> 768
1570 <-> 622, 1102
1571 <-> 228, 1063
1572 <-> 369, 1770
1573 <-> 879
1574 <-> 587, 1761
1575 <-> 324, 539, 1458
1576 <-> 1234
1577 <-> 1577
1578 <-> 1232
1579 <-> 57, 632, 1766
1580 <-> 1608
1581 <-> 1382, 1730
1582 <-> 832
1583 <-> 700, 1839, 1846
1584 <-> 326
1585 <-> 859, 1585
1586 <-> 1939
1587 <-> 1587, 1625
1588 <-> 345
1589 <-> 990
1590 <-> 938, 1590
1591 <-> 445
1592 <-> 719
1593 <-> 1515, 1646
1594 <-> 1894
1595 <-> 1595
1596 <-> 777, 836, 1827
1597 <-> 1820, 1870
1598 <-> 273
1599 <-> 1516, 1599, 1604
1600 <-> 653, 1470
1601 <-> 429, 794
1602 <-> 405
1603 <-> 640
1604 <-> 524, 1379, 1599
1605 <-> 1206
1606 <-> 488, 764, 1120, 1439, 1908
1607 <-> 742, 1472
1608 <-> 645, 657, 1580, 1829
1609 <-> 1176, 1609, 1694
1610 <-> 57, 1004
1611 <-> 746, 1679
1612 <-> 237, 891
1613 <-> 873, 1006
1614 <-> 307, 731
1615 <-> 1615
1616 <-> 332
1617 <-> 1058
1618 <-> 1423
1619 <-> 731
1620 <-> 200, 1858
1621 <-> 940, 1052
1622 <-> 431, 592, 1968
1623 <-> 1623
1624 <-> 23, 470
1625 <-> 1587
1626 <-> 673, 1751
1627 <-> 478, 1188
1628 <-> 369, 718
1629 <-> 759
1630 <-> 1415
1631 <-> 1157
1632 <-> 699, 1386
1633 <-> 135, 492, 1746
1634 <-> 127, 437, 522, 1044
1635 <-> 458, 538, 845, 1321
1636 <-> 924, 976
1637 <-> 1344
1638 <-> 803
1639 <-> 1040
1640 <-> 573
1641 <-> 554
1642 <-> 1642
1643 <-> 458
1644 <-> 1755, 1794
1645 <-> 259, 1708
1646 <-> 1593
1647 <-> 1060
1648 <-> 544, 1648
1649 <-> 261, 432
1650 <-> 500
1651 <-> 587
1652 <-> 1853
1653 <-> 85, 1377
1654 <-> 614, 1456
1655 <-> 1700, 1847
1656 <-> 194, 689
1657 <-> 1010, 1442, 1667
1658 <-> 469, 552
1659 <-> 1229
1660 <-> 559
1661 <-> 147, 749, 1131, 1835
1662 <-> 1970
1663 <-> 769, 1020
1664 <-> 1329, 1985
1665 <-> 945, 1344
1666 <-> 356, 1883
1667 <-> 333, 1270, 1657
1668 <-> 899, 1146
1669 <-> 1669
1670 <-> 108
1671 <-> 526, 907, 1842
1672 <-> 210, 460, 1687
1673 <-> 189, 293
1674 <-> 1179, 1918, 1936
1675 <-> 1398, 1743, 1749
1676 <-> 314
1677 <-> 537, 1028, 1350, 1740, 1857
1678 <-> 921, 1013
1679 <-> 1611
1680 <-> 1165, 1305
1681 <-> 367, 561, 933
1682 <-> 1701
1683 <-> 446
1684 <-> 1684
1685 <-> 691, 953
1686 <-> 1414, 1968
1687 <-> 757, 1672
1688 <-> 245, 993, 1143
1689 <-> 909
1690 <-> 1417
1691 <-> 696, 1201
1692 <-> 367, 967
1693 <-> 1693
1694 <-> 194, 912, 1609
1695 <-> 1473
1696 <-> 1696
1697 <-> 926, 1897
1698 <-> 658, 1329, 1698
1699 <-> 475, 1402
1700 <-> 626, 1655
1701 <-> 578, 1682, 1701
1702 <-> 307
1703 <-> 94, 1910
1704 <-> 1883
1705 <-> 1931
1706 <-> 1706
1707 <-> 549, 1707
1708 <-> 1645, 1872
1709 <-> 1709
1710 <-> 868, 1710
1711 <-> 573
1712 <-> 526
1713 <-> 967, 1713
1714 <-> 277, 1757, 1850
1715 <-> 625, 1487
1716 <-> 669
1717 <-> 475
1718 <-> 858, 1528
1719 <-> 643, 1264
1720 <-> 90, 137
1721 <-> 904
1722 <-> 299
1723 <-> 1975
1724 <-> 547, 872, 1475
1725 <-> 1155, 1943
1726 <-> 939
1727 <-> 17, 285, 946
1728 <-> 888, 1087
1729 <-> 1058
1730 <-> 114, 1581
1731 <-> 631, 765
1732 <-> 141
1733 <-> 352
1734 <-> 108, 1236
1735 <-> 689, 1191
1736 <-> 908, 1316
1737 <-> 1753
1738 <-> 1465, 1561
1739 <-> 358, 917
1740 <-> 1677, 1838
1741 <-> 361, 476, 477
1742 <-> 966, 1036
1743 <-> 18, 1675
1744 <-> 787
1745 <-> 782
1746 <-> 1633
1747 <-> 421
1748 <-> 1888
1749 <-> 1274, 1675
1750 <-> 0, 1504
1751 <-> 502, 895, 1241, 1291, 1626, 1999
1752 <-> 45, 96, 490, 725, 771, 1166
1753 <-> 717, 1544, 1737
1754 <-> 974
1755 <-> 904, 1301, 1644
1756 <-> 1313
1757 <-> 1714
1758 <-> 411, 735, 1149
1759 <-> 1759
1760 <-> 12, 1027
1761 <-> 1574
1762 <-> 583, 985
1763 <-> 799
1764 <-> 942
1765 <-> 666
1766 <-> 1579
1767 <-> 605
1768 <-> 322, 500, 681, 989, 1261
1769 <-> 89, 845, 1190
1770 <-> 969, 1572
1771 <-> 577
1772 <-> 568, 1235
1773 <-> 304, 936
1774 <-> 184, 659, 855
1775 <-> 810, 1280, 1297
1776 <-> 148, 1492
1777 <-> 1322, 1939
1778 <-> 1212, 1409, 1858
1779 <-> 377
1780 <-> 61, 682
1781 <-> 65, 1270
1782 <-> 239, 950
1783 <-> 210, 1235, 1263, 1783
1784 <-> 536, 1055
1785 <-> 35, 1066, 1785, 1885
1786 <-> 332, 862
1787 <-> 434, 1790
1788 <-> 752, 1441
1789 <-> 1789
1790 <-> 1787, 1790
1791 <-> 1019, 1791
1792 <-> 1240
1793 <-> 403
1794 <-> 740, 826, 1644
1795 <-> 1049
1796 <-> 1411, 1796
1797 <-> 216, 470
1798 <-> 439
1799 <-> 461
1800 <-> 546, 1240
1801 <-> 775
1802 <-> 456
1803 <-> 189, 435, 1184
1804 <-> 421, 1533
1805 <-> 89, 1428
1806 <-> 574, 671, 1302
1807 <-> 1084
1808 <-> 305, 662, 1824
1809 <-> 1515, 1913
1810 <-> 1132
1811 <-> 369
1812 <-> 16, 222, 769
1813 <-> 1288, 1356
1814 <-> 1094, 1814
1815 <-> 746
1816 <-> 102
1817 <-> 100, 903
1818 <-> 1239
1819 <-> 1819
1820 <-> 665, 1597
1821 <-> 204, 295, 1416
1822 <-> 261, 447, 1425
1823 <-> 663
1824 <-> 1808
1825 <-> 1825
1826 <-> 1523
1827 <-> 1596
1828 <-> 1000
1829 <-> 1062, 1608
1830 <-> 787, 1095, 1461, 1957
1831 <-> 1831
1832 <-> 255, 321
1833 <-> 907
1834 <-> 541
1835 <-> 1661
1836 <-> 413
1837 <-> 1152, 1509
1838 <-> 1740
1839 <-> 1178, 1583
1840 <-> 889, 899
1841 <-> 243, 340, 726, 774, 1161, 1304
1842 <-> 1265, 1671
1843 <-> 152
1844 <-> 483
1845 <-> 159, 326, 584
1846 <-> 674, 1064, 1583
1847 <-> 1557, 1655
1848 <-> 147
1849 <-> 1335
1850 <-> 1714
1851 <-> 1851, 1994
1852 <-> 1133
1853 <-> 1437, 1652
1854 <-> 156, 1021, 1308, 1535
1855 <-> 336
1856 <-> 1936, 1979
1857 <-> 1026, 1232, 1677
1858 <-> 128, 1620, 1778
1859 <-> 181, 1450, 1925
1860 <-> 1084, 1192, 1860
1861 <-> 1033, 1040
1862 <-> 570, 1037, 1214
1863 <-> 269
1864 <-> 890, 1558
1865 <-> 940
1866 <-> 321, 1328
1867 <-> 386, 1479
1868 <-> 336, 1237
1869 <-> 1138
1870 <-> 1449, 1597
1871 <-> 166
1872 <-> 36, 1708
1873 <-> 1536
1874 <-> 259
1875 <-> 1875
1876 <-> 360
1877 <-> 660
1878 <-> 171, 1352
1879 <-> 1879
1880 <-> 775, 1929
1881 <-> 483
1882 <-> 1200
1883 <-> 11, 733, 881, 1289, 1666, 1704
1884 <-> 1333
1885 <-> 1785
1886 <-> 371, 1040, 1333
1887 <-> 261, 1964
1888 <-> 993, 1748
1889 <-> 618, 1358
1890 <-> 1890
1891 <-> 223, 271, 554
1892 <-> 330, 1060
1893 <-> 758, 846
1894 <-> 980, 1097, 1594
1895 <-> 22, 1087, 1166
1896 <-> 572, 1081
1897 <-> 1104, 1697
1898 <-> 725
1899 <-> 81, 1946
1900 <-> 1406
1901 <-> 404, 803
1902 <-> 234
1903 <-> 38, 383
1904 <-> 1554
1905 <-> 1905
1906 <-> 1503
1907 <-> 1494, 1907
1908 <-> 1606
1909 <-> 1909
1910 <-> 662, 1703
1911 <-> 732, 1463
1912 <-> 1326
1913 <-> 1024, 1809, 1913
1914 <-> 784, 896, 1318
1915 <-> 1487
1916 <-> 1975
1917 <-> 1344
1918 <-> 1674, 1980
1919 <-> 499, 1919
1920 <-> 894
1921 <-> 391, 1047
1922 <-> 214, 1203
1923 <-> 672, 777, 1125
1924 <-> 1924
1925 <-> 1241, 1859
1926 <-> 898, 1481
1927 <-> 21
1928 <-> 895
1929 <-> 401, 1880
1930 <-> 942
1931 <-> 906, 1100, 1327, 1705
1932 <-> 501, 507
1933 <-> 525, 626
1934 <-> 1049
1935 <-> 1938
1936 <-> 364, 1674, 1856
1937 <-> 1397, 1415
1938 <-> 508, 810, 1935
1939 <-> 1586, 1777
1940 <-> 633, 1435
1941 <-> 275, 746
1942 <-> 1145
1943 <-> 315, 373, 585, 755, 1285, 1398, 1725
1944 <-> 1453
1945 <-> 184
1946 <-> 103, 229, 1899
1947 <-> 888
1948 <-> 66, 635
1949 <-> 456, 662
1950 <-> 2, 129
1951 <-> 596, 1391
1952 <-> 18, 76
1953 <-> 460, 576
1954 <-> 136, 929
1955 <-> 80
1956 <-> 261
1957 <-> 110, 1142, 1312, 1830
1958 <-> 1035
1959 <-> 317, 1534
1960 <-> 565
1961 <-> 483, 1273, 1320, 1961
1962 <-> 332
1963 <-> 142, 839
1964 <-> 1409, 1887
1965 <-> 1501
1966 <-> 1966
1967 <-> 1380
1968 <-> 1622, 1686
1969 <-> 29, 683, 1382
1970 <-> 1256, 1662
1971 <-> 902
1972 <-> 1972
1973 <-> 866
1974 <-> 1974
1975 <-> 1723, 1916
1976 <-> 416, 516
1977 <-> 310, 1290
1978 <-> 1429
1979 <-> 1284, 1856
1980 <-> 251, 1344, 1436, 1918
1981 <-> 846, 1251
1982 <-> 935, 1271
1983 <-> 1334
1984 <-> 289, 1984
1985 <-> 270, 1664
1986 <-> 1427, 1461
1987 <-> 422
1988 <-> 1173
1989 <-> 895, 1556
1990 <-> 1990
1991 <-> 439, 1991
1992 <-> 819, 1086, 1473
1993 <-> 1309, 1547
1994 <-> 1851
1995 <-> 1995
1996 <-> 153, 392, 407
1997 <-> 928
1998 <-> 76, 1237, 1252
1999 <-> 1751
`;
}
