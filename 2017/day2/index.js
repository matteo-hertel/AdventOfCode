/**
--- Day 2: Corruption Checksum ---

As you walk through the door, a glowing humanoid shape yells in your direction. "You there! Your state appears to be idle. Come help us repair the corruption in this spreadsheet - if we take another millisecond, we'll have to display an hourglass cursor!"

The spreadsheet consists of rows of apparently-random numbers. To make sure the recovery process is on the right track, they need you to calculate the spreadsheet's checksum. For each row, determine the difference between the largest value and the smallest value; the checksum is the sum of all of these differences.

For example, given the following spreadsheet:

5 1 9 5
7 5 3
2 4 6 8
The first row's largest and smallest values are 9 and 1, and their difference is 8.
The second row's largest and smallest values are 7 and 3, and their difference is 4.
The third row's difference is 6.
In this example, the spreadsheet's checksum would be 8 + 4 + 6 = 18.

What is the checksum for the spreadsheet in your puzzle input?

Your puzzle answer was 37923.

--- Part Two ---

"Great work; looks like we're on the right track after all. Here's a star for your effort." However, the program seems a little worried. Can programs be worried?

"Based on what we're seeing, it looks like all the User wanted is some information about the evenly divisible values in the spreadsheet. Unfortunately, none of us are equipped for that kind of calculation - most of us specialize in bitwise operations."

It sounds like the goal is to find the only two numbers in each row where one evenly divides the other - that is, where the result of the division operation is a whole number. They would like you to find those numbers on each line, divide them, and add up each line's result.

For example, given the following spreadsheet:

5 9 2 8
9 4 7 3
3 8 6 5
In the first row, the only two numbers that evenly divide are 8 and 2; the result of this division is 4.
In the second row, the two numbers are 9 and 3; the result is 3.
In the third row, the result is 2.
In this example, the sum of the results would be 4 + 3 + 2 = 9.

What is the sum of each row's result in your puzzle input?

Your puzzle answer was 263.
**/

function sortArrayOfIntegers(arr) {
  function intComparison(a, b) {
    return a - b;
  }
  return arr.sort(intComparison);
}
function getInt(i) {
  return parseInt(i);
}
function splitBy(separator) {
  return function(arr) {
    return arr.split(separator);
  };
}
function castToIntAndSort(i) {
  return sortArrayOfIntegers(i.map(getInt));
}

function reducerSubFirstAndLast(acc, i) {
  return (acc += parseInt(i.pop()) - parseInt(i.shift()));
}

function reducerDivisionFirstAndLast(acc, i) {
  return (acc += parseInt(i.pop()) / parseInt(i.shift()));
}

function getItemsDivisibleInList(item, index, arr) {
  return item.reduce((acc, inner) => {
    item.forEach(tmp => {
      if (tmp !== inner && tmp % inner === 0) {
        acc.push(inner, tmp);
      }
    });
    return acc;
  }, []);
}

function getFirstResult(matrix) {
  return matrix
    .trim()
    .split("\n")
    .map(splitBy("	"))
    .map(castToIntAndSort)
    .reduce(reducerSubFirstAndLast, 0);
}

function getSecondResult(matrix) {
  return matrix
    .trim()
    .split("\n")
    .map(splitBy("	"))
    .map(castToIntAndSort)
    .map(getItemsDivisibleInList)
    .reduce(reducerDivisionFirstAndLast, 0);
}
const result1 = getFirstResult(`
1136	1129	184	452	788	1215	355	1109	224	1358	1278	176	1302	186	128	1148
242	53	252	62	40	55	265	283	38	157	259	226	322	48	324	299
2330	448	268	2703	1695	2010	3930	3923	179	3607	217	3632	1252	231	286	3689
89	92	903	156	924	364	80	992	599	998	751	827	110	969	979	734
100	304	797	81	249	1050	90	127	675	1038	154	715	79	1116	723	990
1377	353	3635	99	118	1030	3186	3385	1921	2821	492	3082	2295	139	125	2819
3102	213	2462	116	701	2985	265	165	248	680	3147	1362	1026	1447	106	2769
5294	295	6266	3966	2549	701	2581	6418	5617	292	5835	209	2109	3211	241	5753
158	955	995	51	89	875	38	793	969	63	440	202	245	58	965	74
62	47	1268	553	45	60	650	1247	1140	776	1286	200	604	399	42	572
267	395	171	261	79	66	428	371	257	284	65	25	374	70	389	51
3162	3236	1598	4680	2258	563	1389	3313	501	230	195	4107	224	225	4242	4581
807	918	51	1055	732	518	826	806	58	394	632	36	53	119	667	60
839	253	1680	108	349	1603	1724	172	140	167	181	38	1758	1577	748	1011
1165	1251	702	282	1178	834	211	1298	382	1339	67	914	1273	76	81	71
6151	5857	4865	437	6210	237	37	410	544	214	233	6532	2114	207	5643	6852
`);

const result2 = getSecondResult(`
1136	1129	184	452	788	1215	355	1109	224	1358	1278	176	1302	186	128	1148
242	53	252	62	40	55	265	283	38	157	259	226	322	48	324	299
2330	448	268	2703	1695	2010	3930	3923	179	3607	217	3632	1252	231	286	3689
89	92	903	156	924	364	80	992	599	998	751	827	110	969	979	734
100	304	797	81	249	1050	90	127	675	1038	154	715	79	1116	723	990
1377	353	3635	99	118	1030	3186	3385	1921	2821	492	3082	2295	139	125	2819
3102	213	2462	116	701	2985	265	165	248	680	3147	1362	1026	1447	106	2769
5294	295	6266	3966	2549	701	2581	6418	5617	292	5835	209	2109	3211	241	5753
158	955	995	51	89	875	38	793	969	63	440	202	245	58	965	74
62	47	1268	553	45	60	650	1247	1140	776	1286	200	604	399	42	572
267	395	171	261	79	66	428	371	257	284	65	25	374	70	389	51
3162	3236	1598	4680	2258	563	1389	3313	501	230	195	4107	224	225	4242	4581
807	918	51	1055	732	518	826	806	58	394	632	36	53	119	667	60
839	253	1680	108	349	1603	1724	172	140	167	181	38	1758	1577	748	1011
1165	1251	702	282	1178	834	211	1298	382	1339	67	914	1273	76	81	71
6151	5857	4865	437	6210	237	37	410	544	214	233	6532	2114	207	5643	6852
`);
console.log({ result1, result2 });

