/* eslint-disable */

/* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';

import covid_world_timeline from './world_timeline';

import am4themes_animated from '@amcharts/amcharts4/themes/animated';

class Map {
  constructor() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    const numberFormatter = new am4core.NumberFormatter();
    const backgroundColor = am4core.color('#1e2128');
    const activeColor = am4core.color('#ff8726');
    const confirmedColor = am4core.color('#d21a1a');
    const recoveredColor = am4core.color('#45d21a');
    const deathsColor = am4core.color('#1c5fe5');

    const covid_total_timeline = [{
      confirmed: 555, deaths: 17, recovered: 28, date: '2020-01-22',
    }, {
      confirmed: 653, deaths: 18, recovered: 30, date: '2020-01-23',
    }, {
      confirmed: 941, deaths: 26, recovered: 36, date: '2020-01-24',
    }, {
      confirmed: 1438, deaths: 42, recovered: 39, date: '2020-01-25',
    }, {
      confirmed: 2118, deaths: 56, recovered: 52, date: '2020-01-26',
    }, {
      confirmed: 2927, deaths: 82, recovered: 61, date: '2020-01-27',
    }, {
      confirmed: 5578, deaths: 131, recovered: 107, date: '2020-01-28',
    }, {
      confirmed: 6165, deaths: 133, recovered: 126, date: '2020-01-29',
    }, {
      confirmed: 8235, deaths: 171, recovered: 143, date: '2020-01-30',
    }, {
      confirmed: 9925, deaths: 213, recovered: 222, date: '2020-01-31',
    }, {
      confirmed: 12038, deaths: 259, recovered: 284, date: '2020-02-01',
    }, {
      confirmed: 16787, deaths: 362, recovered: 472, date: '2020-02-02',
    }, {
      confirmed: 19881, deaths: 426, recovered: 623, date: '2020-02-03',
    }, {
      confirmed: 23892, deaths: 492, recovered: 852, date: '2020-02-04',
    }, {
      confirmed: 27636, deaths: 564, recovered: 1124, date: '2020-02-05',
    }, {
      confirmed: 30818, deaths: 634, recovered: 1487, date: '2020-02-06',
    }, {
      confirmed: 34392, deaths: 719, recovered: 2011, date: '2020-02-07',
    }, {
      confirmed: 37121, deaths: 806, recovered: 2616, date: '2020-02-08',
    }, {
      confirmed: 40151, deaths: 906, recovered: 3244, date: '2020-02-09',
    }, {
      confirmed: 42763, deaths: 1013, recovered: 3946, date: '2020-02-10',
    }, {
      confirmed: 44803, deaths: 1113, recovered: 4683, date: '2020-02-11',
    }, {
      confirmed: 45222, deaths: 1118, recovered: 5150, date: '2020-02-12',
    }, {
      confirmed: 60370, deaths: 1371, recovered: 6295, date: '2020-02-13',
    }, {
      confirmed: 66887, deaths: 1523, recovered: 8058, date: '2020-02-14',
    }, {
      confirmed: 69032, deaths: 1666, recovered: 9395, date: '2020-02-15',
    }, {
      confirmed: 71226, deaths: 1770, recovered: 10865, date: '2020-02-16',
    }, {
      confirmed: 73260, deaths: 1868, recovered: 12583, date: '2020-02-17',
    }, {
      confirmed: 75138, deaths: 2007, recovered: 14352, date: '2020-02-18',
    }, {
      confirmed: 75641, deaths: 2122, recovered: 16121, date: '2020-02-19',
    }, {
      confirmed: 76199, deaths: 2247, recovered: 18177, date: '2020-02-20',
    }, {
      confirmed: 76843, deaths: 2251, recovered: 18890, date: '2020-02-21',
    }, {
      confirmed: 78599, deaths: 2458, recovered: 22886, date: '2020-02-22',
    }, {
      confirmed: 78985, deaths: 2469, recovered: 23394, date: '2020-02-23',
    }, {
      confirmed: 79570, deaths: 2629, recovered: 25227, date: '2020-02-24',
    }, {
      confirmed: 80415, deaths: 2708, recovered: 27905, date: '2020-02-25',
    }, {
      confirmed: 81397, deaths: 2770, recovered: 30384, date: '2020-02-26',
    }, {
      confirmed: 82756, deaths: 2814, recovered: 33276, date: '2020-02-27',
    }, {
      confirmed: 84126, deaths: 2872, recovered: 36710, date: '2020-02-28',
    }, {
      confirmed: 86012, deaths: 2941, recovered: 39781, date: '2020-02-29',
    }, {
      confirmed: 88368, deaths: 2996, recovered: 42715, date: '2020-03-01',
    }, {
      confirmed: 90311, deaths: 3085, recovered: 45601, date: '2020-03-02',
    }, {
      confirmed: 92856, deaths: 3160, recovered: 48228, date: '2020-03-03',
    }, {
      confirmed: 95127, deaths: 3254, recovered: 51170, date: '2020-03-04',
    }, {
      confirmed: 97936, deaths: 3349, recovered: 53796, date: '2020-03-05',
    }, {
      confirmed: 101763, deaths: 3460, recovered: 55864, date: '2020-03-06',
    }, {
      confirmed: 105832, deaths: 3563, recovered: 58357, date: '2020-03-07',
    }, {
      confirmed: 109820, deaths: 3803, recovered: 60693, date: '2020-03-08',
    }, {
      confirmed: 113776, deaths: 4002, recovered: 62510, date: '2020-03-09',
    }, {
      confirmed: 118587, deaths: 4262, recovered: 64400, date: '2020-03-10',
    }, {
      confirmed: 125850, deaths: 4615, recovered: 66999, date: '2020-03-11',
    }, {
      confirmed: 128329, deaths: 4720, recovered: 68320, date: '2020-03-12',
    }, {
      confirmed: 145185, deaths: 5404, recovered: 70248, date: '2020-03-13',
    }, {
      confirmed: 156086, deaths: 5819, recovered: 72621, date: '2020-03-14',
    }, {
      confirmed: 167411, deaths: 6440, recovered: 76031, date: '2020-03-15',
    }, {
      confirmed: 181576, deaths: 7126, recovered: 78085, date: '2020-03-16',
    }, {
      confirmed: 197211, deaths: 7905, recovered: 80832, date: '2020-03-17',
    }, {
      confirmed: 214984, deaths: 8733, recovered: 83308, date: '2020-03-18',
    }, {
      confirmed: 242675, deaths: 9867, recovered: 84962, date: '2020-03-19',
    }, {
      confirmed: 272271, deaths: 11297, recovered: 87402, date: '2020-03-20',
    }, {
      confirmed: 304686, deaths: 12973, recovered: 91654, date: '2020-03-21',
    }, {
      confirmed: 337852, deaths: 14623, recovered: 97225, date: '2020-03-22',
    }, {
      confirmed: 378496, deaths: 16497, recovered: 100943, date: '2020-03-23',
    }, {
      confirmed: 417863, deaths: 18616, recovered: 107677, date: '2020-03-24',
    }, {
      confirmed: 467529, deaths: 21181, recovered: 113743, date: '2020-03-25',
    }, {
      confirmed: 529630, deaths: 23970, recovered: 122125, date: '2020-03-26',
    }, {
      confirmed: 593400, deaths: 27196, recovered: 130899, date: '2020-03-27',
    }, {
      confirmed: 660666, deaths: 30650, recovered: 139404, date: '2020-03-28',
    }, {
      confirmed: 719966, deaths: 33924, recovered: 149049, date: '2020-03-29',
    }, {
      confirmed: 782256, deaths: 37580, recovered: 164546, date: '2020-03-30',
    }, {
      confirmed: 857374, deaths: 42104, recovered: 178014, date: '2020-03-31',
    }, {
      confirmed: 932395, deaths: 47262, recovered: 193425, date: '2020-04-01',
    }, {
      confirmed: 1012982, deaths: 53049, recovered: 210522, date: '2020-04-02',
    }, {
      confirmed: 1095573, deaths: 58869, recovered: 226060, date: '2020-04-03',
    }, {
      confirmed: 1175720, deaths: 64693, recovered: 246442, date: '2020-04-04',
    }, {
      confirmed: 1249371, deaths: 69478, recovered: 260355, date: '2020-04-05',
    }, {
      confirmed: 1321056, deaths: 74648, recovered: 276869, date: '2020-04-06',
    }, {
      confirmed: 1394785, deaths: 81958, recovered: 300343, date: '2020-04-07',
    }, {
      confirmed: 1480115, deaths: 88418, recovered: 329051, date: '2020-04-08',
    }, {
      confirmed: 1563548, deaths: 95506, recovered: 354270, date: '2020-04-09',
    }, {
      confirmed: 1656987, deaths: 102580, recovered: 376373, date: '2020-04-10',
    }, {
      confirmed: 1735052, deaths: 108557, recovered: 402380, date: '2020-04-11',
    }, {
      confirmed: 1834231, deaths: 114162, recovered: 422004, date: '2020-04-12',
    }, {
      confirmed: 1904345, deaths: 119559, recovered: 449028, date: '2020-04-13',
    }, {
      confirmed: 1975606, deaths: 126061, recovered: 474617, date: '2020-04-14',
    }, {
      confirmed: 2055470, deaths: 134254, recovered: 511279, date: '2020-04-15',
    }, {
      confirmed: 2152067, deaths: 143857, recovered: 542463, date: '2020-04-16',
    }, {
      confirmed: 2239430, deaths: 153872, recovered: 568767, date: '2020-04-17',
    }, {
      confirmed: 2320886, deaths: 159561, recovered: 592683, date: '2020-04-18',
    }, {
      confirmed: 2400731, deaths: 165093, recovered: 624377, date: '2020-04-19',
    }, {
      confirmed: 2471751, deaths: 170053, recovered: 646376, date: '2020-04-20',
    }, {
      confirmed: 2548671, deaths: 176651, recovered: 680415, date: '2020-04-21',
    }, {
      confirmed: 2627092, deaths: 183117, recovered: 709993, date: '2020-04-22',
    }, {
      confirmed: 2707850, deaths: 190895, recovered: 738736, date: '2020-04-23',
    }, {
      confirmed: 2810857, deaths: 197195, recovered: 793703, date: '2020-04-24',
    }, {
      confirmed: 2897019, deaths: 202890, recovered: 816900, date: '2020-04-25',
    }, {
      confirmed: 2971538, deaths: 206600, recovered: 866084, date: '2020-04-26',
    }, {
      confirmed: 3041798, deaths: 211220, recovered: 894397, date: '2020-04-27',
    }, {
      confirmed: 3116472, deaths: 217187, recovered: 929025, date: '2020-04-28',
    }, {
      confirmed: 3195095, deaths: 227669, recovered: 972952, date: '2020-04-29',
    },
    {
      confirmed: 3258428, deaths: 233406, recovered: 1015111, date: '2020-04-30',
    }, {
      confirmed: 3345887, deaths: 238674, recovered: 1053559, date: '2020-05-01',
    }, {
      confirmed: 3428985, deaths: 243867, recovered: 1093125, date: '2020-05-02',
    }, {
      confirmed: 3508320, deaths: 247542, recovered: 1125427, date: '2020-05-03',
    }, {
      confirmed: 3584567, deaths: 251616, recovered: 1162888, date: '2020-05-04',
    }, {
      confirmed: 3664229, deaths: 257302, recovered: 1198923, date: '2020-05-05',
    }, {
      confirmed: 3757508, deaths: 263899, recovered: 1245614, date: '2020-05-06',
    }, {
      confirmed: 3847923, deaths: 269634, recovered: 1284966, date: '2020-05-07',
    }, {
      confirmed: 3939472, deaths: 274958, recovered: 1322134, date: '2020-05-08',
    }, {
      confirmed: 4025364, deaths: 279365, recovered: 1375645, date: '2020-05-09',
    }, {
      confirmed: 4103023, deaths: 282773, recovered: 1409194, date: '2020-05-10',
    }, {
      confirmed: 4178720, deaths: 286389, recovered: 1456300, date: '2020-05-11',
    }, {
      confirmed: 4263367, deaths: 292029, recovered: 1493520, date: '2020-05-12',
    }, {
      confirmed: 4348920, deaths: 297252, recovered: 1548707, date: '2020-05-13',
    }, {
      confirmed: 4443822, deaths: 302482, recovered: 1588014, date: '2020-05-14',
    }, {
      confirmed: 4543946, deaths: 307732, recovered: 1637267, date: '2020-05-15',
    }, {
      confirmed: 4636087, deaths: 311946, recovered: 1693216, date: '2020-05-16',
    }, {
      confirmed: 4715942, deaths: 315261, recovered: 1734077, date: '2020-05-17',
    }, {
      confirmed: 4804340, deaths: 318564, recovered: 1786962, date: '2020-05-18',
    }, {
      confirmed: 4899620, deaths: 323339, recovered: 1839039, date: '2020-05-19',
    }, {
      confirmed: 4998123, deaths: 328174, recovered: 1897569, date: '2020-05-20',
    }, {
      confirmed: 5104146, deaths: 332972, recovered: 1948789, date: '2020-05-21',
    }, {
      confirmed: 5212888, deaths: 338280, recovered: 2056647, date: '2020-05-22',
    }, {
      confirmed: 5312589, deaths: 342270, recovered: 2112065, date: '2020-05-23',
    }, {
      confirmed: 5409312, deaths: 345119, recovered: 2168525, date: '2020-05-24',
    }, {
      confirmed: 5496821, deaths: 346289, recovered: 2231677, date: '2020-05-25',
    }, {
      confirmed: 5591876, deaths: 350570, recovered: 2286845, date: '2020-05-26',
    }, {
      confirmed: 5694023, deaths: 355674, recovered: 2349926, date: '2020-05-27',
    }, {
      confirmed: 5811183, deaths: 360346, recovered: 2415807, date: '2020-05-28',
    }, {
      confirmed: 5926596, deaths: 364912, recovered: 2493321, date: '2020-05-29',
    }, {
      confirmed: 6061563, deaths: 369173, recovered: 2564484, date: '2020-05-30',
    }, {
      confirmed: 6169197, deaths: 372084, recovered: 2641186, date: '2020-05-31',
    }, {
      confirmed: 6268090, deaths: 375600, recovered: 2695890, date: '2020-06-01',
    }, {
      confirmed: 6388899, deaths: 380429, recovered: 2729402, date: '2020-06-02',
    }, {
      confirmed: 6507626, deaths: 385992, recovered: 2804844, date: '2020-06-03',
    }, {
      confirmed: 6635713, deaths: 391191, recovered: 2869838, date: '2020-06-04',
    }, {
      confirmed: 6773407, deaths: 396163, recovered: 3013036, date: '2020-06-05',
    }, {
      confirmed: 6899702, deaths: 400045, recovered: 3085748, date: '2020-06-06',
    }, {
      confirmed: 7013359, deaths: 402797, recovered: 3140840, date: '2020-06-07',
    }, {
      confirmed: 7121856, deaths: 406605, recovered: 3293363, date: '2020-06-08',
    }, {
      confirmed: 7245395, deaths: 411487, recovered: 3375617, date: '2020-06-09',
    }, {
      confirmed: 7363983, deaths: 416251, recovered: 3454806, date: '2020-06-10',
    }, {
      confirmed: 7517857, deaths: 421503, recovered: 3540679, date: '2020-06-11',
    }, {
      confirmed: 7636360, deaths: 425438, recovered: 3613278, date: '2020-06-12',
    }, {
      confirmed: 7770509, deaths: 429777, recovered: 3698273, date: '2020-06-13',
    }, {
      confirmed: 7904306, deaths: 433112, recovered: 3769715, date: '2020-06-14',
    }, {
      confirmed: 8037538, deaths: 436946, recovered: 3857396, date: '2020-06-15',
    }, {
      confirmed: 8177174, deaths: 443735, recovered: 3955246, date: '2020-06-16',
    }, {
      confirmed: 8353985, deaths: 449012, recovered: 4074072, date: '2020-06-17',
    }, {
      confirmed: 8492960, deaths: 454022, recovered: 4155227, date: '2020-06-18',
    }, {
      confirmed: 8672434, deaths: 460252, recovered: 4245884, date: '2020-06-19',
    }, {
      confirmed: 8795282, deaths: 464498, recovered: 4378395, date: '2020-06-20',
    }, {
      confirmed: 8958763, deaths: 468399, recovered: 4447176, date: '2020-06-21',
    }, {
      confirmed: 9102214, deaths: 472206, recovered: 4526424, date: '2020-06-22',
    }, {
      confirmed: 9267727, deaths: 477616, recovered: 4630464, date: '2020-06-23',
    }, {
      confirmed: 9435084, deaths: 482790, recovered: 4746187, date: '2020-06-24',
    }, {
      confirmed: 9614588, deaths: 489349, recovered: 4839009, date: '2020-06-25',
    }, {
      confirmed: 9806209, deaths: 494227, recovered: 4944916, date: '2020-06-26',
    }, {
      confirmed: 9983318, deaths: 498775, recovered: 5051141, date: '2020-06-27',
    }, {
      confirmed: 10151817, deaths: 501964, recovered: 5140255, date: '2020-06-28',
    }, {
      confirmed: 10305755, deaths: 505580, recovered: 5235182, date: '2020-06-29',
    }, {
      confirmed: 10479328, deaths: 511312, recovered: 5352658, date: '2020-06-30',
    }, {
      confirmed: 10696374, deaths: 516271, recovered: 5577058, date: '2020-07-01',
    }, {
      confirmed: 10874339, deaths: 521362, recovered: 5753439, date: '2020-07-02',
    }, {
      confirmed: 11078420, deaths: 526475, recovered: 5863266, date: '2020-07-03',
    }, {
      confirmed: 11270967, deaths: 530837, recovered: 6058912, date: '2020-07-04',
    }, {
      confirmed: 11453522, deaths: 534359, recovered: 6178389, date: '2020-07-05',
    }, {
      confirmed: 11623200, deaths: 538163, recovered: 6302087, date: '2020-07-06',
    }, {
      confirmed: 11833336, deaths: 544261, recovered: 6447116, date: '2020-07-07',
    }, {
      confirmed: 12046719, deaths: 549591, recovered: 6605131, date: '2020-07-08',
    }, {
      confirmed: 12272516, deaths: 555016, recovered: 6739803, date: '2020-07-09',
    }, {
      confirmed: 12503920, deaths: 560304, recovered: 6879252, date: '2020-07-10',
    }, {
      confirmed: 12723301, deaths: 565247, recovered: 7005020, date: '2020-07-11',
    }, {
      confirmed: 12915761, deaths: 569235, recovered: 7116826, date: '2020-07-12',
    }, {
      confirmed: 13108386, deaths: 573191, recovered: 7257214, date: '2020-07-13',
    }, {
      confirmed: 13328505, deaths: 578823, recovered: 7399363, date: '2020-07-14',
    }, {
      confirmed: 13560472, deaths: 584280, recovered: 7559177, date: '2020-07-15',
    }, {
      confirmed: 13809668, deaths: 590081, recovered: 7711571, date: '2020-07-16',
    }, {
      confirmed: 14060124, deaths: 596671, recovered: 7895046, date: '2020-07-17',
    }, {
      confirmed: 14297266, deaths: 602300, recovered: 8045817, date: '2020-07-18',
    }, {
      confirmed: 14511510, deaths: 606346, recovered: 8133833, date: '2020-07-19',
    }, {
      confirmed: 14711662, deaths: 610089, recovered: 8290733, date: '2020-07-20',
    }, {
      confirmed: 14951156, deaths: 616650, recovered: 8467496, date: '2020-07-21',
    }, {
      confirmed: 15232253, deaths: 623637, recovered: 8646254, date: '2020-07-22',
    }, {
      confirmed: 15515283, deaths: 633599, recovered: 8823649, date: '2020-07-23',
    }, {
      confirmed: 15797409, deaths: 639866, recovered: 9051952, date: '2020-07-24',
    }, {
      confirmed: 16050983, deaths: 645462, recovered: 9271763, date: '2020-07-25',
    }, {
      confirmed: 16256830, deaths: 648882, recovered: 9409693, date: '2020-07-26',
    }, {
      confirmed: 16491332, deaths: 654337, recovered: 9586444, date: '2020-07-27',
    }, {
      confirmed: 16694944, deaths: 659887, recovered: 9721616, date: '2020-07-28',
    }, {
      confirmed: 17034595, deaths: 667287, recovered: 9959504, date: '2020-07-29',
    }, {
      confirmed: 17315527, deaths: 673494, recovered: 10173018, date: '2020-07-30',
    },
    {
      confirmed: 17606532, deaths: 679819, recovered: 10372622, date: '2020-07-31',
    }, {
      confirmed: 17856207, deaths: 685369, recovered: 10556520, date: '2020-08-01',
    }, {
      confirmed: 18088123, deaths: 689687, recovered: 10695236, date: '2020-08-02',
    }, {
      confirmed: 18295028, deaths: 694366, recovered: 10917682, date: '2020-08-03',
    }, {
      confirmed: 18551597, deaths: 701067, recovered: 11138909, date: '2020-08-04',
    }, {
      confirmed: 18827415, deaths: 708146, recovered: 11360601, date: '2020-08-05',
    }, {
      confirmed: 19112811, deaths: 715246, recovered: 11549409, date: '2020-08-06',
    }, {
      confirmed: 19394524, deaths: 721629, recovered: 11741455, date: '2020-08-07',
    }, {
      confirmed: 19653626, deaths: 727094, recovered: 11941708, date: '2020-08-08',
    }, {
      confirmed: 19880033, deaths: 731672, recovered: 12120455, date: '2020-08-09',
    }, {
      confirmed: 20107537, deaths: 736858, recovered: 12284645, date: '2020-08-10',
    }, {
      confirmed: 20363450, deaths: 743074, recovered: 12589712, date: '2020-08-11',
    }, {
      confirmed: 20650355, deaths: 750036, recovered: 12831223, date: '2020-08-12',
    }, {
      confirmed: 20929249, deaths: 756016, recovered: 12994263, date: '2020-08-13',
    }, {
      confirmed: 21230932, deaths: 766142, recovered: 13277494, date: '2020-08-14',
    }, {
      confirmed: 21481351, deaths: 771526, recovered: 13446105, date: '2020-08-15',
    }, {
      confirmed: 21698242, deaths: 775733, recovered: 13679055, date: '2020-08-16',
    }, {
      confirmed: 21906088, deaths: 774532, recovered: 13890066, date: '2020-08-17',
    }, {
      confirmed: 22164212, deaths: 781417, recovered: 14117685, date: '2020-08-18',
    }, {
      confirmed: 22443255, deaths: 788154, recovered: 14335684, date: '2020-08-19',
    }, {
      confirmed: 22715779, deaths: 794201, recovered: 14543477, date: '2020-08-20',
    }, {
      confirmed: 22977492, deaths: 799645, recovered: 14711974, date: '2020-08-21',
    }, {
      confirmed: 23231356, deaths: 804819, recovered: 14911044, date: '2020-08-22',
    }, {
      confirmed: 23449004, deaths: 809080, recovered: 15138020, date: '2020-08-23',
    }, {
      confirmed: 23675089, deaths: 813557, recovered: 15337430, date: '2020-08-24',
    }, {
      confirmed: 23918604, deaths: 819824, recovered: 15568917, date: '2020-08-25',
    }, {
      confirmed: 24200962, deaths: 826109, recovered: 15794554, date: '2020-08-26',
    }, {
      confirmed: 24481557, deaths: 832004, recovered: 16003055, date: '2020-08-27',
    }, {
      confirmed: 24765814, deaths: 837529, recovered: 16202639, date: '2020-08-28',
    }, {
      confirmed: 25033714, deaths: 842798, recovered: 16414024, date: '2020-08-29',
    }, {
      confirmed: 25255009, deaths: 846826, recovered: 16624229, date: '2020-08-30',
    }, {
      confirmed: 25517374, deaths: 850979, recovered: 16825009, date: '2020-08-31',
    }, {
      confirmed: 25783113, deaths: 857418, recovered: 17080246, date: '2020-09-01',
    }, {
      confirmed: 26065802, deaths: 863501, recovered: 17298333, date: '2020-09-02',
    }, {
      confirmed: 26339489, deaths: 869208, recovered: 17519688, date: '2020-09-03',
    }, {
      confirmed: 26645219, deaths: 874810, recovered: 17724121, date: '2020-09-04',
    }, {
      confirmed: 26915782, deaths: 879772, recovered: 17924648, date: '2020-09-05',
    }, {
      confirmed: 27155191, deaths: 883825, recovered: 18145964, date: '2020-09-06',
    }, {
      confirmed: 27368209, deaths: 892971, recovered: 18332435, date: '2020-09-07',
    }, {
      confirmed: 27607147, deaths: 897877, recovered: 18532081, date: '2020-09-08',
    }, {
      confirmed: 27900489, deaths: 904208, recovered: 18784793, date: '2020-09-09',
    }, {
      confirmed: 28199776, deaths: 910011, recovered: 19001419, date: '2020-09-10',
    }, {
      confirmed: 28520436, deaths: 915889, recovered: 19225075, date: '2020-09-11',
    }, {
      confirmed: 28807455, deaths: 920794, recovered: 19448006, date: '2020-09-12',
    }, {
      confirmed: 29050003, deaths: 924459, recovered: 19635840, date: '2020-09-13',
    }, {
      confirmed: 29229679, deaths: 927817, recovered: 19785014, date: '2020-09-14',
    }, {
      confirmed: 29598839, deaths: 935397, recovered: 20088998, date: '2020-09-15',
    }, {
      confirmed: 29902308, deaths: 941208, recovered: 20318480, date: '2020-09-16',
    }, {
      confirmed: 30217199, deaths: 946676, recovered: 20538668, date: '2020-09-17',
    }, {
      confirmed: 30542990, deaths: 952369, recovered: 20789808, date: '2020-09-18',
    }, {
      confirmed: 30835994, deaths: 957628, recovered: 21026787, date: '2020-09-19',
    }, {
      confirmed: 31089129, deaths: 961343, recovered: 21263835, date: '2020-09-20',
    }, {
      confirmed: 31364886, deaths: 965436, recovered: 21509279, date: '2020-09-21',
    }, {
      confirmed: 31649492, deaths: 971432, recovered: 21727172, date: '2020-09-22',
    }, {
      confirmed: 31923670, deaths: 977023, recovered: 21990587, date: '2020-09-23',
    }, {
      confirmed: 32276256, deaths: 983690, recovered: 22246230, date: '2020-09-24',
    }, {
      confirmed: 32611340, deaths: 989577, recovered: 22485447, date: '2020-09-25',
    }, {
      confirmed: 32900009, deaths: 994905, recovered: 22747597, date: '2020-09-26',
    }, {
      confirmed: 33154575, deaths: 998553, recovered: 22961453, date: '2020-09-27',
    }, {
      confirmed: 33406282, deaths: 1002488, recovered: 23183971, date: '2020-09-28',
    },
    {
      confirmed: 33689010, deaths: 1008456, recovered: 23424013, date: '2020-09-29',
    }, {
      confirmed: 34016600, deaths: 1014899, recovered: 23672212, date: '2020-09-30',
    }, {
      confirmed: 34329146, deaths: 1023454, recovered: 23885518, date: '2020-10-01',
    }, {
      confirmed: 34634255, deaths: 1028596, recovered: 24066062, date: '2020-10-02',
    }, {
      confirmed: 34952489, deaths: 1033973, recovered: 24321674, date: '2020-10-03',
    }, {
      confirmed: 35228527, deaths: 1037780, recovered: 24543805, date: '2020-10-04',
    }, {
      confirmed: 35524640, deaths: 1044692, recovered: 24781240, date: '2020-10-05',
    }, {
      confirmed: 35855518, deaths: 1050488, recovered: 25012360, date: '2020-10-06',
    }, {
      confirmed: 36205234, deaths: 1056311, recovered: 25267553, date: '2020-10-07',
    }, {
      confirmed: 36566439, deaths: 1062511, recovered: 25487126, date: '2020-10-08',
    }, {
      confirmed: 36927099, deaths: 1068709, recovered: 25693993, date: '2020-10-09',
    }, {
      confirmed: 37283864, deaths: 1073559, recovered: 25889419, date: '2020-10-10',
    }, {
      confirmed: 37571386, deaths: 1077516, recovered: 26112043, date: '2020-10-11',
    }, {
      confirmed: 37862621, deaths: 1081446, recovered: 26312311, date: '2020-10-12',
    }, {
      confirmed: 38181797, deaths: 1086728, recovered: 26501524, date: '2020-10-13',
    }, {
      confirmed: 38563716, deaths: 1092791, recovered: 26713830, date: '2020-10-14',
    }, {
      confirmed: 38970507, deaths: 1098875, recovered: 26920697, date: '2020-10-15',
    }, {
      confirmed: 39381796, deaths: 1105002, recovered: 27123688, date: '2020-10-16',
    }, {
      confirmed: 39754616, deaths: 1110555, recovered: 27322006, date: '2020-10-17',
    }, {
      confirmed: 40071356, deaths: 1114019, recovered: 27523415, date: '2020-10-18',
    }, {
      confirmed: 40457801, deaths: 1118804, recovered: 27725823, date: '2020-10-19',
    }, {
      confirmed: 40846625, deaths: 1125355, recovered: 27933992, date: '2020-10-20',
    }, {
      confirmed: 41290582, deaths: 1132032, recovered: 28145453, date: '2020-10-21',
    }, {
      confirmed: 41762638, deaths: 1137900, recovered: 28372239, date: '2020-10-22',
    }, {
      confirmed: 42268172, deaths: 1144877, recovered: 28579067, date: '2020-10-23',
    }, {
      confirmed: 42723262, deaths: 1150655, recovered: 28790633, date: '2020-10-24',
    }, {
      confirmed: 43122333, deaths: 1154737, recovered: 28988671, date: '2020-10-25',
    }, {
      confirmed: 43562752, deaths: 1160188, recovered: 29226927, date: '2020-10-26',
    }, {
      confirmed: 44033374, deaths: 1167553, recovered: 29816649, date: '2020-10-27',
    }, {
      confirmed: 44551207, deaths: 1174730, recovered: 30079298, date: '2020-10-28',
    }, {
      confirmed: 45089409, deaths: 1181756, recovered: 30325955, date: '2020-10-29',
    }, {
      confirmed: 45654927, deaths: 1189583, recovered: 29718143, date: '2020-10-30',
    }, {
      confirmed: 46140488, deaths: 1196146, recovered: 30847553, date: '2020-10-31',
    }, {
      confirmed: 46610424, deaths: 1201103, recovered: 31105308, date: '2020-11-01',
    }, {
      confirmed: 47112865, deaths: 1206819, recovered: 31385632, date: '2020-11-02',
    }, {
      confirmed: 47630111, deaths: 1215782, recovered: 31637087, date: '2020-11-03',
    }, {
      confirmed: 48227602, deaths: 1226442, recovered: 31916319, date: '2020-11-04',
    }, {
      confirmed: 48823027, deaths: 1234466, recovered: 32219865, date: '2020-11-05',
    }, {
      confirmed: 49466981, deaths: 1244109, recovered: 32508227, date: '2020-11-06',
    }, {
      confirmed: 50065088, deaths: 1251673, recovered: 32807319, date: '2020-11-07',
    }, {
      confirmed: 50544327, deaths: 1257430, recovered: 33060197, date: '2020-11-08',
    }, {
      confirmed: 51012958, deaths: 1264536, recovered: 33316917, date: '2020-11-09',
    }, {
      confirmed: 51575582, deaths: 1274565, recovered: 33573921, date: '2020-11-10',
    }, {
      confirmed: 52223757, deaths: 1285023, recovered: 33954283, date: '2020-11-11',
    }, {
      confirmed: 52870794, deaths: 1294946, recovered: 34179713, date: '2020-11-12',
    }, {
      confirmed: 53521418, deaths: 1304504, recovered: 34481758, date: '2020-11-13',
    }, {
      confirmed: 54116492, deaths: 1313512, recovered: 34759832, date: '2020-11-14',
    }, {
      confirmed: 54590191, deaths: 1319790, recovered: 34989529, date: '2020-11-15',
    }, {
      confirmed: 55119730, deaths: 1327624, recovered: 35378240, date: '2020-11-16',
    }, {
      confirmed: 55728841, deaths: 1338726, recovered: 35812932, date: '2020-11-17',
    }, {
      confirmed: 56355318, deaths: 1350039, recovered: 36176079, date: '2020-11-18',
    }, {
      confirmed: 57006705, deaths: 1360998, recovered: 36549166, date: '2020-11-19',
    }, {
      confirmed: 57673512, deaths: 1372825, recovered: 36904541, date: '2020-11-20',
    }, {
      confirmed: 58262037, deaths: 1381629, recovered: 37243760, date: '2020-11-21',
    }, {
      confirmed: 58749938, deaths: 1388685, recovered: 37516157, date: '2020-11-22',
    }, {
      confirmed: 59268403, deaths: 1397003, recovered: 37926204, date: '2020-11-23',
    }, {
      confirmed: 59857850, deaths: 1409759, recovered: 38297736, date: '2020-11-24',
    }, {
      confirmed: 60494209, deaths: 1421822, recovered: 38734713, date: '2020-11-25',
    }, {
      confirmed: 61078085, deaths: 1432564, recovered: 39099936, date: '2020-11-26',
    }, {
      confirmed: 61749078, deaths: 1443210, recovered: 39476656, date: '2020-11-27',
    }, {
      confirmed: 62346903, deaths: 1452974, recovered: 39831860, date: '2020-11-28',
    }, {
      confirmed: 62834341, deaths: 1459909, recovered: 40157958, date: '2020-11-29',
    }, {
      confirmed: 63339265, deaths: 1468577, recovered: 40559345, date: '2020-11-30',
    }, {
      confirmed: 63947958, deaths: 1481417, recovered: 41034926, date: '2020-12-01',
    }, {
      confirmed: 64596103, deaths: 1493824, recovered: 41496310, date: '2020-12-02',
    }, {
      confirmed: 65288478, deaths: 1506305, recovered: 41932083, date: '2020-12-03',
    }, {
      confirmed: 65968679, deaths: 1518704, recovered: 42352013, date: '2020-12-04',
    }, {
      confirmed: 66610848, deaths: 1528903, recovered: 42789871, date: '2020-12-05',
    }, {
      confirmed: 67149550, deaths: 1536100, recovered: 43103819, date: '2020-12-06',
    }, {
      confirmed: 67663883, deaths: 1544592, recovered: 43515451, date: '2020-12-07',
    }, {
      confirmed: 68302251, deaths: 1556866, recovered: 43956174, date: '2020-12-08',
    }, {
      confirmed: 68973078, deaths: 1569344, recovered: 44382129, date: '2020-12-09',
    }, {
      confirmed: 70466211, deaths: 1581982, recovered: 44871360, date: '2020-12-10',
    }, {
      confirmed: 71164680, deaths: 1594878, recovered: 45349922, date: '2020-12-11',
    }, {
      confirmed: 71787629, deaths: 1605103, recovered: 46856934, date: '2020-12-12',
    }, {
      confirmed: 72335630, deaths: 1612487, recovered: 47249332, date: '2020-12-13',
    }, {
      confirmed: 72859287, deaths: 1621452, recovered: 47656692, date: '2020-12-14',
    }, {
      confirmed: 73485176, deaths: 1635415, recovered: 41615682, date: '2020-12-15',
    }, {
      confirmed: 74219546, deaths: 1648956, recovered: 41977327, date: '2020-12-16',
    }, {
      confirmed: 74955161, deaths: 1662202, recovered: 42349997, date: '2020-12-17',
    }, {
      confirmed: 75672814, deaths: 1674840, recovered: 42667969, date: '2020-12-18',
    }, {
      confirmed: 76065255, deaths: 1681666, recovered: 42889165, date: '2020-12-19',
    }];

    const covid_total_current = {
      confirmed: 76065255, deaths: 1681666, recovered: 42889165, date: '2020-12-19',
    };

    // for an easier access by key
    const colors = {
      active: activeColor, confirmed: confirmedColor, recovered: recoveredColor, deaths: deathsColor,
    };

    const countryColor = am4core.color('#3b3b3b');
    const countryStrokeColor = am4core.color('#000000');
    const buttonStrokeColor = am4core.color('#ffffff');
    const countryHoverColor = am4core.color('#1b1b1b');
    const activeCountryColor = am4core.color('#0f0f0f');

    let currentIndex;
    let currentCountry = 'World';

    // last date of the data
    const lastDate = new Date(covid_total_timeline[covid_total_timeline.length - 1].date);
    let currentDate = lastDate;

    let currentPolygon;

    let countryDataTimeout;

    let currentType;

    let currentTypeName;

    let sliderAnimation;

    let perCapita = false;

    /// ///////////////////////////////////////////////////////////////////////////
    // PREPARE DATA
    /// ///////////////////////////////////////////////////////////////////////////

    // make a map of country indexes for later use
    const countryIndexMap = {};
    const { list } = covid_world_timeline[covid_world_timeline.length - 1];
    for (var i = 0; i < list.length; i++) {
      const country = list[i];
      countryIndexMap[country.id] = i;
    }

    // calculated active cases in world data (active = confirmed - recovered)
    for (var i = 0; i < covid_total_timeline.length; i++) {
      const di = covid_total_timeline[i];
      di.active = di.confirmed - di.recovered;
    }

    // function that returns current slide
    // if index is not set, get last slide
    function getSlideData(index) {
      if (index == undefined) {
        index = covid_world_timeline.length - 1;
      }

      const data = covid_world_timeline[index];

      // augment with names
      // for (var i = 0; i < data.list.length; i++) {
      // data.list[i].name = idToName(data.list[i].id);
      // }

      return data;
    }

    // get slide data
    const slideData = getSlideData();

    // as we will be modifying raw data, make a copy
    const mapData = JSON.parse(JSON.stringify(slideData.list));

    // remove items with 0 values for better performance
    for (var i = mapData.length - 1; i >= 0; i--) {
      if (mapData[i].confirmed == 0) {
        mapData.splice(i, 1);
      }
    }

    const max = { confirmed: 0, recovered: 0, deaths: 0 };
    let maxPC = {
      confirmed: 0, recovered: 0, deaths: 0, active: 0,
    };

    // the last day will have most
    for (var i = 0; i < mapData.length; i++) {
      const di = mapData[i];
      if (di.confirmed > max.confirmed) {
        max.confirmed = di.confirmed;
      }
      if (di.recovered > max.recovered) {
        max.recovered = di.recovered;
      }
      if (di.deaths > max.deaths) {
        max.deaths = di.deaths;
      }
      max.active = max.confirmed;
    }

    // END OF DATA

    /// ///////////////////////////////////////////////////////////////////////////
    // LAYOUT & CHARTS
    /// ///////////////////////////////////////////////////////////////////////////

    // main container
    // https://www.amcharts.com/docs/v4/concepts/svg-engine/containers/
    const container = am4core.create('chartdiv', am4core.Container);
    container.width = am4core.percent(100);
    container.height = am4core.percent(100);

    container.tooltip = new am4core.Tooltip();
    container.tooltip.background.fill = am4core.color('#000000');
    container.tooltip.background.stroke = activeColor;
    container.tooltip.fontSize = '0.9em';
    container.tooltip.getFillFromObject = false;
    container.tooltip.getStrokeFromObject = false;

    // MAP CHART
    // https://www.amcharts.com/docs/v4/chart-types/map/
    const mapChart = container.createChild(am4maps.MapChart);
    mapChart.height = am4core.percent(80);
    mapChart.zoomControl = new am4maps.ZoomControl();
    mapChart.zoomControl.align = 'right';
    mapChart.zoomControl.marginRight = 15;
    mapChart.zoomControl.valign = 'middle';
    mapChart.homeGeoPoint = { longitude: 0, latitude: -2 };

    // by default minus button zooms out by one step, but we modify the behavior so when user clicks on minus, the map would fully zoom-out and show world data
    mapChart.zoomControl.minusButton.events.on('hit', showWorld);
    // clicking on a "sea" will also result a full zoom-out
    mapChart.seriesContainer.background.events.on('hit', showWorld);
    mapChart.seriesContainer.background.events.on('over', resetHover);
    mapChart.seriesContainer.background.fillOpacity = 0;
    mapChart.zoomEasing = am4core.ease.sinOut;

    // https://www.amcharts.com/docs/v4/chart-types/map/#Map_data
    // you can use more accurate world map or map of any other country - a wide selection of maps available at: https://github.com/amcharts/amcharts4-geodata
    mapChart.geodata = am4geodata_worldLow;

    // Set projection
    // https://www.amcharts.com/docs/v4/chart-types/map/#Setting_projection
    // instead of Miller, you can use Mercator or many other projections available: https://www.amcharts.com/demos/map-using-d3-projections/
    mapChart.projection = new am4maps.projections.Miller();
    mapChart.panBehavior = 'move';

    // when map is globe, beackground is made visible
    mapChart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.05;
    mapChart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color('#ffffff');
    mapChart.backgroundSeries.hidden = true;

    // Map polygon series (defines how country areas look and behave)
    const polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.dataFields.id = 'id';
    polygonSeries.dataFields.value = 'confirmedPC';
    polygonSeries.interpolationDuration = 0;

    polygonSeries.exclude = ['AQ']; // Antarctica is excluded in non-globe projection
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeWidth = 0.5;
    // this helps to place bubbles in the visual middle of the area
    polygonSeries.calculateVisualCenter = true;
    polygonSeries.data = mapData;

    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.fill = countryColor;
    polygonTemplate.fillOpacity = 1;
    polygonTemplate.stroke = countryStrokeColor;
    polygonTemplate.strokeOpacity = 0.15;
    polygonTemplate.setStateOnChildren = true;
    polygonTemplate.tooltipPosition = 'fixed';

    polygonTemplate.events.on('hit', handleCountryHit);
    polygonTemplate.events.on('over', handleCountryOver);
    polygonTemplate.events.on('out', handleCountryOut);

    polygonSeries.heatRules.push({
      target: polygonTemplate,
      property: 'fill',
      min: countryColor,
      max: countryColor,
      dataField: 'value',
    });

    // you can have pacific - centered map if you set this to -154.8
    mapChart.deltaLongitude = -10;

    // polygon states
    const polygonHoverState = polygonTemplate.states.create('hover');
    polygonHoverState.transitionDuration = 1400;
    polygonHoverState.properties.fill = countryHoverColor;

    const polygonActiveState = polygonTemplate.states.create('active');
    polygonActiveState.properties.fill = activeCountryColor;

    // Bubble series
    const bubbleSeries = mapChart.series.push(new am4maps.MapImageSeries());
    bubbleSeries.data = JSON.parse(JSON.stringify(mapData));

    bubbleSeries.dataFields.value = 'confirmed';
    bubbleSeries.dataFields.id = 'id';

    // adjust tooltip
    bubbleSeries.tooltip.animationDuration = 0;
    bubbleSeries.tooltip.showInViewport = false;
    bubbleSeries.tooltip.background.fillOpacity = 0.2;
    bubbleSeries.tooltip.getStrokeFromObject = true;
    bubbleSeries.tooltip.getFillFromObject = false;
    bubbleSeries.tooltip.background.fillOpacity = 0.2;
    bubbleSeries.tooltip.background.fill = am4core.color('#000000');

    const imageTemplate = bubbleSeries.mapImages.template;
    // if you want bubbles to become bigger when zoomed, set this to false
    imageTemplate.nonScaling = true;
    imageTemplate.strokeOpacity = 0;
    imageTemplate.fillOpacity = 0.55;
    imageTemplate.tooltipText = '{name}: [bold]{value}[/]';
    imageTemplate.applyOnClones = true;

    imageTemplate.events.on('over', handleImageOver);
    imageTemplate.events.on('out', handleImageOut);
    imageTemplate.events.on('hit', handleImageHit);

    // this is needed for the tooltip to point to the top of the circle instead of the middle
    imageTemplate.adapter.add('tooltipY', (tooltipY, target) => -target.children.getIndex(0).radius);

    // When hovered, circles become non-opaque
    const imageHoverState = imageTemplate.states.create('hover');
    imageHoverState.properties.fillOpacity = 1;

    // add circle inside the image
    const circle = imageTemplate.createChild(am4core.Circle);
    // this makes the circle to pulsate a bit when showing it
    circle.hiddenState.properties.scale = 0.0001;
    circle.hiddenState.transitionDuration = 2000;
    circle.defaultState.transitionDuration = 2000;
    circle.defaultState.transitionEasing = am4core.ease.elasticOut;
    // later we set fill color on template (when changing what type of data the map should show) and all the clones get the color because of this
    circle.applyOnClones = true;

    // heat rule makes the bubbles to be of a different width. Adjust min/max for smaller/bigger radius of a bubble
    bubbleSeries.heatRules.push({
      target: circle,
      property: 'radius',
      min: 3,
      max: 30,
      dataField: 'value',
    });

    // when data items validated, hide 0 value bubbles (because min size is set)
    bubbleSeries.events.on('dataitemsvalidated', () => {
      bubbleSeries.dataItems.each((dataItem) => {
        const { mapImage } = dataItem;
        const circle = mapImage.children.getIndex(0);
        if (mapImage.dataItem.value == 0) {
          circle.hide(0);
        } else if (circle.isHidden || circle.isHiding) {
          circle.show();
        }
      });
    });

    // this places bubbles at the visual center of a country
    imageTemplate.adapter.add('latitude', (latitude, target) => {
      const polygon = polygonSeries.getPolygonById(target.dataItem.id);
      if (polygon) {
        target.disabled = false;
        return polygon.visualLatitude;
      }
      target.disabled = true;

      return latitude;
    });

    imageTemplate.adapter.add('longitude', (longitude, target) => {
      const polygon = polygonSeries.getPolygonById(target.dataItem.id);
      if (polygon) {
        target.disabled = false;
        return polygon.visualLongitude;
      }
      target.disabled = true;

      return longitude;
    });

    // END OF MAP

    // top title
    const title = mapChart.titles.create();
    title.fontSize = '1.5em';
    title.text = 'COVID-19 Spread Data';
    title.align = 'left';
    title.horizontalCenter = 'left';
    title.marginLeft = 20;
    title.paddingBottom = 10;
    title.fill = am4core.color('#ffffff');
    title.y = 20;

    // switch between map and globe
    const mapGlobeSwitch = mapChart.createChild(am4core.SwitchButton);
    mapGlobeSwitch.align = 'right';
    mapGlobeSwitch.y = 15;
    mapGlobeSwitch.leftLabel.text = 'Map';
    mapGlobeSwitch.leftLabel.fill = am4core.color('#ffffff');
    mapGlobeSwitch.rightLabel.fill = am4core.color('#ffffff');
    mapGlobeSwitch.rightLabel.text = 'Globe';
    mapGlobeSwitch.verticalCenter = 'top';

    mapGlobeSwitch.events.on('toggled', () => {
      if (mapGlobeSwitch.isActive) {
        mapChart.projection = new am4maps.projections.Orthographic();
        mapChart.backgroundSeries.show();
        mapChart.panBehavior = 'rotateLongLat';
        polygonSeries.exclude = [];
      } else {
        mapChart.projection = new am4maps.projections.Miller();
        mapChart.backgroundSeries.hide();
        mapChart.panBehavior = 'move';
        removeAntarctica(mapData);
        polygonSeries.data = mapData;
        polygonSeries.exclude = ['AQ'];
      }
    });

    // switch between map and globe
    const absolutePerCapitaSwitch = mapChart.createChild(am4core.SwitchButton);
    absolutePerCapitaSwitch.align = 'center';
    absolutePerCapitaSwitch.y = 15;
    absolutePerCapitaSwitch.leftLabel.text = 'Absolute';
    absolutePerCapitaSwitch.leftLabel.fill = am4core.color('#ffffff');
    absolutePerCapitaSwitch.rightLabel.fill = am4core.color('#ffffff');
    absolutePerCapitaSwitch.rightLabel.text = 'Per Capita';
    absolutePerCapitaSwitch.rightLabel.interactionsEnabled = true;
    absolutePerCapitaSwitch.rightLabel.tooltipText = 'When calculating max value, countries with population less than 100.000 are not included.';
    absolutePerCapitaSwitch.verticalCenter = 'top';

    absolutePerCapitaSwitch.events.on('toggled', () => {
      if (absolutePerCapitaSwitch.isActive) {
        bubbleSeries.hide(0);
        perCapita = true;
        bubbleSeries.interpolationDuration = 0;
        polygonSeries.heatRules.getIndex(0).max = colors[currentType];
        polygonSeries.heatRules.getIndex(0).maxValue = maxPC[currentType];
        polygonSeries.mapPolygons.template.applyOnClones = true;

        sizeSlider.hide();
        filterSlider.hide();
        sizeLabel.hide();
        filterLabel.hide();

        updateCountryTooltip();
      } else {
        perCapita = false;
        polygonSeries.interpolationDuration = 0;
        bubbleSeries.interpolationDuration = 1000;
        bubbleSeries.show();
        polygonSeries.heatRules.getIndex(0).max = countryColor;
        polygonSeries.mapPolygons.template.tooltipText = undefined;
        sizeSlider.show();
        filterSlider.show();
        sizeLabel.show();
        filterLabel.show();
      }
      polygonSeries.mapPolygons.each((mapPolygon) => {
        mapPolygon.fill = mapPolygon.fill;
        mapPolygon.defaultState.properties.fill = undefined;
      });
    });

    // buttons & chart container
    const buttonsAndChartContainer = container.createChild(am4core.Container);
    buttonsAndChartContainer.layout = 'vertical';
    buttonsAndChartContainer.height = am4core.percent(45); // make this bigger if you want more space for the chart
    buttonsAndChartContainer.width = am4core.percent(100);
    buttonsAndChartContainer.valign = 'bottom';

    // country name and buttons container
    const nameAndButtonsContainer = buttonsAndChartContainer.createChild(am4core.Container);
    nameAndButtonsContainer.width = am4core.percent(100);
    nameAndButtonsContainer.padding(0, 10, 5, 20);
    nameAndButtonsContainer.layout = 'horizontal';

    // name of a country and date label
    const countryName = nameAndButtonsContainer.createChild(am4core.Label);
    countryName.fontSize = '1.1em';
    countryName.fill = am4core.color('#ffffff');
    countryName.valign = 'middle';

    // buttons container (active/confirmed/recovered/deaths)
    const buttonsContainer = nameAndButtonsContainer.createChild(am4core.Container);
    buttonsContainer.layout = 'grid';
    buttonsContainer.width = am4core.percent(100);
    buttonsContainer.x = 10;
    buttonsContainer.contentAlign = 'right';

    // Chart & slider container
    const chartAndSliderContainer = buttonsAndChartContainer.createChild(am4core.Container);
    chartAndSliderContainer.layout = 'vertical';
    chartAndSliderContainer.height = am4core.percent(100);
    chartAndSliderContainer.width = am4core.percent(100);
    chartAndSliderContainer.background = new am4core.RoundedRectangle();
    chartAndSliderContainer.background.fill = am4core.color('#000000');
    chartAndSliderContainer.background.cornerRadius(30, 30, 0, 0);
    chartAndSliderContainer.background.fillOpacity = 0.25;
    chartAndSliderContainer.paddingTop = 12;
    chartAndSliderContainer.paddingBottom = 0;

    // Slider container
    const sliderContainer = chartAndSliderContainer.createChild(am4core.Container);
    sliderContainer.width = am4core.percent(100);
    sliderContainer.padding(0, 15, 15, 10);
    sliderContainer.layout = 'horizontal';

    const slider = sliderContainer.createChild(am4core.Slider);
    slider.width = am4core.percent(100);
    slider.valign = 'middle';
    slider.background.opacity = 0.4;
    slider.opacity = 0.7;
    slider.background.fill = am4core.color('#ffffff');
    slider.marginLeft = 20;
    slider.marginRight = 35;
    slider.height = 15;
    slider.start = 1;

    // what to do when slider is dragged
    slider.events.on('rangechanged', (event) => {
      const index = Math.round((covid_world_timeline.length - 1) * slider.start);
      updateMapData(getSlideData(index).list);
      updateTotals(index);
    });
    // stop animation if dragged
    slider.startGrip.events.on('drag', () => {
      stop();
      if (sliderAnimation) {
        sliderAnimation.setProgress(slider.start);
      }
    });

    // play button
    const playButton = sliderContainer.createChild(am4core.PlayButton);
    playButton.valign = 'middle';
    // play button behavior
    playButton.events.on('toggled', (event) => {
      if (event.target.isActive) {
        play();
      } else {
        stop();
      }
    });
    // make slider grip look like play button
    slider.startGrip.background.fill = playButton.background.fill;
    slider.startGrip.background.strokeOpacity = 0;
    slider.startGrip.icon.stroke = am4core.color('#ffffff');
    slider.startGrip.background.states.copyFrom(playButton.background.states);

    // bubble size slider
    let sizeSlider = container.createChild(am4core.Slider);
    sizeSlider.orientation = 'vertical';
    sizeSlider.height = am4core.percent(12);
    sizeSlider.marginLeft = 25;
    sizeSlider.align = 'left';
    sizeSlider.valign = 'top';
    sizeSlider.verticalCenter = 'middle';
    sizeSlider.opacity = 0.7;
    sizeSlider.background.fill = am4core.color('#ffffff');
    sizeSlider.adapter.add('y', (y, target) => container.pixelHeight * (1 - buttonsAndChartContainer.percentHeight / 100) * 0.25);

    sizeSlider.startGrip.background.fill = activeColor;
    sizeSlider.startGrip.background.fillOpacity = 0.8;
    sizeSlider.startGrip.background.strokeOpacity = 0;
    sizeSlider.startGrip.icon.stroke = am4core.color('#ffffff');
    sizeSlider.startGrip.background.states.getKey('hover').properties.fill = activeColor;
    sizeSlider.startGrip.background.states.getKey('down').properties.fill = activeColor;
    sizeSlider.horizontalCenter = 'middle';

    sizeSlider.events.on('rangechanged', () => {
      sizeSlider.startGrip.scale = 0.75 + sizeSlider.start;
      bubbleSeries.heatRules.getIndex(0).max = 30 + sizeSlider.start * 100;
      circle.clones.each((clone) => {
        clone.radius = clone.radius;
      });
    });

    let sizeLabel = container.createChild(am4core.Label);
    sizeLabel.text = 'max bubble size *';
    sizeLabel.fill = am4core.color('#ffffff');
    sizeLabel.rotation = 90;
    sizeLabel.fontSize = '10px';
    sizeLabel.fillOpacity = 0.5;
    sizeLabel.horizontalCenter = 'middle';
    sizeLabel.align = 'left';
    sizeLabel.paddingBottom = 40;
    sizeLabel.tooltip.setBounds({
      x: 0, y: 0, width: 200000, height: 200000,
    });
    sizeLabel.tooltip.label.wrap = true;
    sizeLabel.tooltip.label.maxWidth = 300;
    sizeLabel.tooltipText = 'Some countries have so many cases that bubbles for countries with smaller values often look the same even if there is a significant difference between them. This slider can be used to increase maximum size of a bubble so that when you zoom in to a region with relatively small values you could compare them anyway.';
    sizeLabel.fill = am4core.color('#ffffff');

    sizeLabel.adapter.add('y', (y, target) => container.pixelHeight * (1 - buttonsAndChartContainer.percentHeight / 100) * 0.25);

    // filter slider

    // bubble size slider
    let filterSlider = container.createChild(am4core.Slider);
    filterSlider.orientation = 'vertical';
    filterSlider.height = am4core.percent(28);
    filterSlider.marginLeft = 25;
    filterSlider.align = 'left';
    filterSlider.valign = 'top';
    filterSlider.verticalCenter = 'middle';
    filterSlider.opacity = 0.7;
    filterSlider.background.fill = am4core.color('#ffffff');
    filterSlider.adapter.add('y', (y, target) => container.pixelHeight * (1 - buttonsAndChartContainer.percentHeight / 100) * 0.7);

    filterSlider.startGrip.background.fill = activeColor;
    filterSlider.startGrip.background.fillOpacity = 0.8;
    filterSlider.startGrip.background.strokeOpacity = 0;
    filterSlider.startGrip.icon.stroke = am4core.color('#ffffff');
    filterSlider.startGrip.background.states.getKey('hover').properties.fill = activeColor;
    filterSlider.startGrip.background.states.getKey('down').properties.fill = activeColor;
    filterSlider.horizontalCenter = 'middle';
    filterSlider.start = 1;

    filterSlider.events.on('rangechanged', () => {
      const maxValue = max[currentType] * filterSlider.start + 1;
      if (!isNaN(maxValue) && bubbleSeries.inited) {
        bubbleSeries.heatRules.getIndex(0).maxValue = maxValue;
        circle.clones.each((clone) => {
          if (clone.dataItem.value > maxValue) {
            clone.dataItem.hide();
          } else {
            clone.dataItem.show();
          }
          clone.radius = clone.radius;
        });
      }
    });

    let filterLabel = container.createChild(am4core.Label);
    filterLabel.text = 'filter max values *';
    filterLabel.rotation = 90;
    filterLabel.fontSize = '10px';
    filterLabel.fill = am4core.color('#ffffff');
    filterLabel.fontSize = '0.8em';
    filterLabel.fillOpacity = 0.5;
    filterLabel.horizontalCenter = 'middle';
    filterLabel.align = 'left';
    filterLabel.paddingBottom = 40;
    filterLabel.tooltip.label.wrap = true;
    filterLabel.tooltip.label.maxWidth = 300;
    filterLabel.tooltipText = 'This filter allows to remove countries with many cases from the map so that it would be possible to compare countries with smaller number of cases.';
    filterLabel.fill = am4core.color('#ffffff');

    filterLabel.adapter.add('y', (y, target) => container.pixelHeight * (1 - buttonsAndChartContainer.percentHeight / 100) * 0.7);

    // play behavior
    function play() {
      if (!sliderAnimation) {
        sliderAnimation = slider.animate({ property: 'start', to: 1, from: 0 }, 50000, am4core.ease.linear).pause();
        sliderAnimation.events.on('animationended', () => {
          playButton.isActive = false;
        });
      }

      if (slider.start >= 1) {
        slider.start = 0;
        sliderAnimation.start();
      }
      sliderAnimation.resume();
      playButton.isActive = true;
    }

    // stop behavior
    function stop() {
      if (sliderAnimation) {
        sliderAnimation.pause();
      }
      playButton.isActive = false;
    }

    // BOTTOM CHART
    // https://www.amcharts.com/docs/v4/chart-types/xy-chart/
    const lineChart = chartAndSliderContainer.createChild(am4charts.XYChart);
    lineChart.fontSize = '0.8em';
    lineChart.paddingRight = 30;
    lineChart.paddingLeft = 30;
    lineChart.maskBullets = false;
    lineChart.zoomOutButton.disabled = true;
    lineChart.paddingBottom = 5;
    lineChart.paddingTop = 3;

    // make a copy of data as we will be modifying it
    lineChart.data = JSON.parse(JSON.stringify(covid_total_timeline));

    // date axis
    // https://www.amcharts.com/docs/v4/concepts/axes/date-axis/
    const dateAxis = lineChart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.stroke = am4core.color('#000000');
    dateAxis.renderer.grid.template.strokeOpacity = 0.25;
    dateAxis.max = lastDate.getTime() + am4core.time.getDuration('day', 5);
    dateAxis.tooltip.label.fontSize = '0.8em';
    dateAxis.tooltip.background.fill = activeColor;
    dateAxis.tooltip.background.stroke = activeColor;
    dateAxis.renderer.labels.template.fill = am4core.color('#ffffff');
    /*
    dateAxis.renderer.labels.template.adapter.add("fillOpacity", function(fillOpacity, target){
        return dateAxis.valueToPosition(target.dataItem.value) + 0.1;
    }) */

    // value axis
    // https://www.amcharts.com/docs/v4/concepts/axes/value-axis/
    const valueAxis = lineChart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;
    valueAxis.interpolationDuration = 3000;
    valueAxis.renderer.grid.template.stroke = am4core.color('#000000');
    valueAxis.renderer.grid.template.strokeOpacity = 0.25;
    valueAxis.renderer.minGridDistance = 30;
    valueAxis.renderer.maxLabelPosition = 0.98;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.tooltip.disabled = true;
    valueAxis.extraMax = 0.05;
    valueAxis.maxPrecision = 0;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.verticalCenter = 'bottom';
    valueAxis.renderer.labels.template.fill = am4core.color('#ffffff');
    valueAxis.renderer.labels.template.padding(2, 2, 2, 2);
    valueAxis.adapter.add('max', (max, target) => {
      if (max < 5) {
        max = 5;
      }
      return max;
    });

    valueAxis.adapter.add('min', (min, target) => {
      if (!seriesTypeSwitch.isActive) {
        if (min < 0) {
          min = 0;
        }
      }
      return min;
    });

    // cursor
    // https://www.amcharts.com/docs/v4/concepts/chart-cursor/
    lineChart.cursor = new am4charts.XYCursor();
    lineChart.cursor.maxTooltipDistance = 0;
    lineChart.cursor.behavior = 'none'; // set zoomX for a zooming possibility
    lineChart.cursor.lineY.disabled = true;
    lineChart.cursor.lineX.stroke = activeColor;
    lineChart.cursor.xAxis = dateAxis;
    // this prevents cursor to move to the clicked location while map is dragged
    am4core.getInteraction().body.events.off('down', lineChart.cursor.handleCursorDown, lineChart.cursor);
    am4core.getInteraction().body.events.off('up', lineChart.cursor.handleCursorUp, lineChart.cursor);

    // legend
    // https://www.amcharts.com/docs/v4/concepts/legend/
    lineChart.legend = new am4charts.Legend();
    lineChart.legend.parent = lineChart.plotContainer;
    lineChart.legend.labels.template.fill = am4core.color('#ffffff');
    lineChart.legend.markers.template.height = 8;
    lineChart.legend.contentAlign = 'left';
    lineChart.legend.fontSize = '10px';
    lineChart.legend.itemContainers.template.valign = 'middle';
    let legendDown = false;
    lineChart.legend.itemContainers.template.events.on('down', () => {
      legendDown = true;
    });
    lineChart.legend.itemContainers.template.events.on('up', () => {
      setTimeout(() => {
        legendDown = false;
      }, 100);
    });

    let seriesTypeSwitch = lineChart.legend.createChild(am4core.SwitchButton);
    seriesTypeSwitch.leftLabel.text = 'totals';
    seriesTypeSwitch.rightLabel.text = 'day change';
    seriesTypeSwitch.leftLabel.fill = am4core.color('#ffffff');
    seriesTypeSwitch.rightLabel.fill = am4core.color('#ffffff');

    seriesTypeSwitch.events.on('down', () => {
      legendDown = true;
    });
    seriesTypeSwitch.events.on('up', () => {
      setTimeout(() => {
        legendDown = false;
      }, 100);
    });

    seriesTypeSwitch.events.on('toggled', () => {
      if (seriesTypeSwitch.isActive) {
        if (!columnSeries) {
          createColumnSeries();
        }

        for (var key in columnSeries) {
          columnSeries[key].hide(0);
        }

        for (var key in series) {
          series[key].hiddenInLegend = true;
          series[key].hide();
        }

        columnSeries[currentType].show();
      } else {
        for (var key in columnSeries) {
          columnSeries[key].hiddenInLegend = true;
          columnSeries[key].hide();
        }

        for (var key in series) {
          series[key].hiddenInLegend = false;
          series[key].hide();
        }

        series[currentType].show();
      }
    });

    function updateColumnsFill() {
      columnSeries.active.columns.each((column) => {
        if (column.dataItem.values.valueY.previousChange < 0) {
          column.fillOpacity = 0;
          column.strokeOpacity = 0.6;
        } else {
          column.fillOpacity = 0.6;
          column.strokeOpacity = 0;
        }
      });
    }

    // create series
    const activeSeries = addSeries('active', activeColor);
    // active series is visible initially
    activeSeries.tooltip.disabled = true;
    activeSeries.hidden = false;

    const confirmedSeries = addSeries('confirmed', confirmedColor);
    const recoveredSeries = addSeries('recovered', recoveredColor);
    const deathsSeries = addSeries('deaths', deathsColor);

    // let series = { active: activeSeries, confirmed: confirmedSeries, recovered: recoveredSeries, deaths: deathsSeries };
    // add series
    function addSeries(name, color) {
      const series = lineChart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = name;
      series.dataFields.dateX = 'date';
      series.name = capitalizeFirstLetter(name);
      series.strokeOpacity = 0.6;
      series.stroke = color;
      series.fill = color;
      series.maskBullets = false;
      series.minBulletDistance = 10;
      series.hidden = true;
      series.hideTooltipWhileZooming = true;

      // series bullet
      const bullet = series.bullets.push(new am4charts.CircleBullet());

      // only needed to pass it to circle
      const bulletHoverState = bullet.states.create('hover');
      bullet.setStateOnChildren = true;

      bullet.circle.fillOpacity = 1;
      bullet.circle.fill = backgroundColor;
      bullet.circle.radius = 2;

      const circleHoverState = bullet.circle.states.create('hover');
      circleHoverState.properties.fillOpacity = 1;
      circleHoverState.properties.fill = color;
      circleHoverState.properties.scale = 1.4;

      // tooltip setup
      series.tooltip.pointerOrientation = 'down';
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fillOpacity = 0.2;
      series.tooltip.background.fill = am4core.color('#000000');
      series.tooltip.dy = -4;
      series.tooltip.fontSize = '0.8em';
      series.tooltipText = 'Total {name}: {valueY}';

      return series;
    }

    let series = {
      active: activeSeries, confirmed: confirmedSeries, recovered: recoveredSeries, deaths: deathsSeries,
    };

    let columnSeries;

    function createColumnSeries() {
      columnSeries = {};
      columnSeries.active = addColumnSeries('active', activeColor);
      columnSeries.active.events.on('validated', () => {
        updateColumnsFill();
      });

      columnSeries.confirmed = addColumnSeries('confirmed', confirmedColor);
      columnSeries.recovered = addColumnSeries('recovered', recoveredColor);
      columnSeries.deaths = addColumnSeries('deaths', deathsColor);
    }

    // add series
    function addColumnSeries(name, color) {
      const series = lineChart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = name;
      series.dataFields.valueYShow = 'previousChange';
      series.dataFields.dateX = 'date';
      series.name = capitalizeFirstLetter(name);
      series.hidden = true;
      series.stroke = color;
      series.fill = color;
      series.columns.template.fillOpacity = 0.6;
      series.columns.template.strokeOpacity = 0;
      series.hideTooltipWhileZooming = true;
      series.clustered = false;
      series.hiddenInLegend = true;
      series.columns.template.width = am4core.percent(50);

      // tooltip setup
      series.tooltip.pointerOrientation = 'down';
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fillOpacity = 0.2;
      series.tooltip.background.fill = am4core.color('#000000');
      series.tooltip.fontSize = '0.8em';
      series.tooltipText = "{name}: {valueY.previousChange.formatNumber('+#,###|#,###|0')}";

      return series;
    }

    lineChart.plotContainer.events.on('up', () => {
      if (!legendDown) {
        slider.start = lineChart.cursor.xPosition * ((dateAxis.max - dateAxis.min) / (lastDate.getTime() - dateAxis.min));
      }
    });

    // data warning label
    const label = lineChart.plotContainer.createChild(am4core.Label);
    label.text = 'Current day stats may be incomplete until countries submit their data.';
    label.fill = am4core.color('#ffffff');
    label.fontSize = '0.8em';
    label.paddingBottom = 4;
    label.opacity = 0.5;
    label.align = 'right';
    label.horizontalCenter = 'right';
    label.verticalCenter = 'bottom';

    // BUTTONS
    // create buttons
    const activeButton = addButton('active', activeColor);
    const confirmedButton = addButton('confirmed', confirmedColor);
    const recoveredButton = addButton('recovered', recoveredColor);
    const deathsButton = addButton('deaths', deathsColor);

    const buttons = {
      active: activeButton, confirmed: confirmedButton, recovered: recoveredButton, deaths: deathsButton,
    };

    // add button
    function addButton(name, color) {
      const button = buttonsContainer.createChild(am4core.Button);
      button.label.valign = 'middle';
      button.label.fill = am4core.color('#ffffff');
      button.label.fontSize = '11px';
      button.background.cornerRadius(30, 30, 30, 30);
      button.background.strokeOpacity = 0.3;
      button.background.fillOpacity = 0;
      button.background.stroke = buttonStrokeColor;
      button.background.padding(2, 3, 2, 3);
      button.states.create('active');
      button.setStateOnChildren = true;

      const activeHoverState = button.background.states.create('hoverActive');
      activeHoverState.properties.fillOpacity = 0;

      const circle = new am4core.Circle();
      circle.radius = 8;
      circle.fillOpacity = 0.3;
      circle.fill = buttonStrokeColor;
      circle.strokeOpacity = 0;
      circle.valign = 'middle';
      circle.marginRight = 5;
      button.icon = circle;

      // save name to dummy data for later use
      button.dummyData = name;

      const circleActiveState = circle.states.create('active');
      circleActiveState.properties.fill = color;
      circleActiveState.properties.fillOpacity = 0.5;

      button.events.on('hit', handleButtonClick);

      return button;
    }

    // handle button clikc
    function handleButtonClick(event) {
      // we saved name to dummy data
      changeDataType(event.target.dummyData);
    }

    // change data type (active/confirmed/recovered/deaths)
    function changeDataType(name) {
      currentType = name;
      currentTypeName = name;
      if (name != 'deaths') {
        currentTypeName += ' cases';
      }

      bubbleSeries.mapImages.template.tooltipText = `[bold]{name}: {value}[/] [font-size:10px]\n${currentTypeName}`;

      // make button active
      const activeButton = buttons[name];
      activeButton.isActive = true;
      // make other buttons inactive
      for (var key in buttons) {
        if (buttons[key] != activeButton) {
          buttons[key].isActive = false;
        }
      }
      // tell series new field name
      bubbleSeries.dataFields.value = name;
      polygonSeries.dataFields.value = `${name}PC`;

      bubbleSeries.dataItems.each((dataItem) => {
        dataItem.setValue('value', dataItem.dataContext[currentType]);
      });

      polygonSeries.dataItems.each((dataItem) => {
        dataItem.setValue('value', dataItem.dataContext[`${currentType}PC`]);
        dataItem.mapPolygon.defaultState.properties.fill = undefined;
      });

      // change color of bubbles
      // setting colors on mapImage for tooltip colors
      bubbleSeries.mapImages.template.fill = colors[name];
      bubbleSeries.mapImages.template.stroke = colors[name];
      // first child is circle
      bubbleSeries.mapImages.template.children.getIndex(0).fill = colors[name];

      dateAxis.tooltip.background.fill = colors[name];
      dateAxis.tooltip.background.stroke = colors[name];
      lineChart.cursor.lineX.stroke = colors[name];

      // show series
      if (seriesTypeSwitch.isActive) {
        const activeSeries = columnSeries[name];
        activeSeries.show();
        // hide other series
        for (var key in columnSeries) {
          if (columnSeries[key] != activeSeries) {
            columnSeries[key].hide();
          }
        }
      } else {
        const activeSeries = series[name];
        activeSeries.show();
        // hide other series
        for (var key in series) {
          if (series[key] != activeSeries) {
            series[key].hide();
          }
        }
      }

      // update heat rule's maxValue
      bubbleSeries.heatRules.getIndex(0).maxValue = max[currentType];
      polygonSeries.heatRules.getIndex(0).maxValue = maxPC[currentType];
      if (perCapita) {
        polygonSeries.heatRules.getIndex(0).max = colors[name];
        updateCountryTooltip();
      }
    }

    // select a country
    function selectCountry(mapPolygon) {
      resetHover();
      polygonSeries.hideTooltip();

      // if the same country is clicked show world
      if (currentPolygon == mapPolygon) {
        currentPolygon.isActive = false;
        currentPolygon = undefined;
        showWorld();
        return;
      }
      // save current polygon
      currentPolygon = mapPolygon;
      const countryIndex = countryIndexMap[mapPolygon.dataItem.id];
      currentCountry = mapPolygon.dataItem.dataContext.name;

      // make others inactive
      polygonSeries.mapPolygons.each((polygon) => {
        polygon.isActive = false;
      });

      // clear timeout if there is one
      if (countryDataTimeout) {
        clearTimeout(countryDataTimeout);
      }
      // we delay change of data for better performance (so that data is not changed whil zooming)
      countryDataTimeout = setTimeout(() => {
        setCountryData(countryIndex);
      }, 1000); // you can adjust number, 1000 is one second

      updateTotals(currentIndex);
      updateCountryName();

      mapPolygon.isActive = true;
      // meaning it's globe
      if (mapGlobeSwitch.isActive) {
        // animate deltas (results the map to be rotated to the selected country)
        if (mapChart.zoomLevel != 1) {
          mapChart.goHome();
          rotateAndZoom(mapPolygon);
        } else {
          rotateAndZoom(mapPolygon);
        }
      }
      // if it's not a globe, simply zoom to the country
      else {
        mapChart.zoomToMapObject(mapPolygon, getZoomLevel(mapPolygon));
      }
    }

    // change line chart data to the selected countries
    function setCountryData(countryIndex) {
      // instead of setting whole data array, we modify current raw data so that a nice animation would happen
      for (let i = 0; i < lineChart.data.length; i++) {
        const di = covid_world_timeline[i].list;

        const countryData = di[countryIndex];
        const dataContext = lineChart.data[i];
        if (countryData) {
          dataContext.recovered = countryData.recovered;
          dataContext.confirmed = countryData.confirmed;
          dataContext.deaths = countryData.deaths;
          dataContext.active = countryData.confirmed - countryData.recovered - countryData.deaths;
          valueAxis.min = undefined;
          valueAxis.max = undefined;
        } else {
          dataContext.recovered = 0;
          dataContext.confirmed = 0;
          dataContext.deaths = 0;
          dataContext.active = 0;
          valueAxis.min = 0;
          valueAxis.max = 10;
        }
      }

      lineChart.invalidateRawData();
      updateTotals(currentIndex);
      setTimeout(updateSeriesTooltip, 1000);
    }

    function updateSeriesTooltip() {
      let position = dateAxis.dateToPosition(currentDate);
      position = dateAxis.toGlobalPosition(position);
      const x = dateAxis.positionToCoordinate(position);

      lineChart.cursor.triggerMove({ x, y: 0 }, 'soft', true);
      lineChart.series.each((series) => {
        if (!series.isHidden) {
          series.tooltip.disabled = false;
          series.showTooltipAtDataItem(series.tooltipDataItem);
        }
      });
    }

    // what happens when a country is rolled-over
    function rollOverCountry(mapPolygon) {
      resetHover();
      if (mapPolygon) {
        mapPolygon.isHover = true;

        // make bubble hovered too
        const image = bubbleSeries.getImageById(mapPolygon.dataItem.id);
        if (image) {
          image.dataItem.dataContext.name = mapPolygon.dataItem.dataContext.name;
          image.isHover = true;
        }
      }
    }
    // what happens when a country is rolled-out
    function rollOutCountry(mapPolygon) {
      const image = bubbleSeries.getImageById(mapPolygon.dataItem.id);

      resetHover();
      if (image) {
        image.isHover = false;
      }
    }

    // rotate and zoom
    function rotateAndZoom(mapPolygon) {
      polygonSeries.hideTooltip();
      const animation = mapChart.animate([{ property: 'deltaLongitude', to: -mapPolygon.visualLongitude }, { property: 'deltaLatitude', to: -mapPolygon.visualLatitude }], 1000);
      animation.events.on('animationended', () => {
        mapChart.zoomToMapObject(mapPolygon, getZoomLevel(mapPolygon));
      });
    }

    // calculate zoom level (default is too close)
    function getZoomLevel(mapPolygon) {
      const w = mapPolygon.polygon.bbox.width;
      const h = mapPolygon.polygon.bbox.width;
      // change 2 to smaller walue for a more close zoom
      return Math.min(mapChart.seriesWidth / (w * 2), mapChart.seriesHeight / (h * 2));
    }

    // show world data
    function showWorld() {
      currentCountry = 'World';
      currentPolygon = undefined;
      resetHover();

      if (countryDataTimeout) {
        clearTimeout(countryDataTimeout);
      }

      // make all inactive
      polygonSeries.mapPolygons.each((polygon) => {
        polygon.isActive = false;
      });

      updateCountryName();

      // update line chart data (again, modifying instead of setting new data for a nice animation)
      for (let i = 0; i < lineChart.data.length; i++) {
        const di = covid_total_timeline[i];
        const dataContext = lineChart.data[i];

        dataContext.recovered = di.recovered;
        dataContext.confirmed = di.confirmed;
        dataContext.deaths = di.deaths;
        dataContext.active = di.confirmed - di.recovered;
        valueAxis.min = undefined;
        valueAxis.max = undefined;
      }

      lineChart.invalidateRawData();

      updateTotals(currentIndex);
      mapChart.goHome();
    }

    // updates country name and date
    function updateCountryName() {
      countryName.text = `${currentCountry}, ${mapChart.dateFormatter.format(currentDate, 'MMM dd, yyyy')}`;
    }

    // update total values in buttons
    function updateTotals(index) {
      if (!isNaN(index)) {
        const di = covid_total_timeline[index];
        const date = new Date(di.date);
        currentDate = date;

        updateCountryName();

        let position = dateAxis.dateToPosition(date);
        position = dateAxis.toGlobalPosition(position);
        const x = dateAxis.positionToCoordinate(position);

        if (lineChart.cursor) {
          lineChart.cursor.triggerMove({ x, y: 0 }, 'soft', true);
        }
        for (const key in buttons) {
          const count = Number(lineChart.data[index][key]);
          if (!isNaN(count)) {
            buttons[key].label.text = `${capitalizeFirstLetter(key)}: ${numberFormatter.format(count, '#,###')}`;
          }
        }
        currentIndex = index;
      }
    }

    // update map data
    function updateMapData(data) {
      // modifying instead of setting new data for a nice animation
      bubbleSeries.dataItems.each((dataItem) => {
        dataItem.dataContext.confirmed = 0;
        dataItem.dataContext.deaths = 0;
        dataItem.dataContext.recovered = 0;
        dataItem.dataContext.active = 0;
      });

      maxPC = {
        active: 0, confirmed: 0, deaths: 0, recovered: 0,
      };

      for (let i = 0; i < data.length; i++) {
        const di = data[i];
        const image = bubbleSeries.getImageById(di.id);
        const polygon = polygonSeries.getPolygonById(di.id);

        if (image) {
          const population = Number(populations[image.dataItem.dataContext.id]);

          image.dataItem.dataContext.confirmed = di.confirmed;
          image.dataItem.dataContext.deaths = di.deaths;
          image.dataItem.dataContext.recovered = di.recovered;
          image.dataItem.dataContext.active = di.confirmed - di.recovered - di.deaths;
        }

        if (polygon) {
          polygon.dataItem.dataContext.confirmedPC = di.confirmed / population * 1000000;
          polygon.dataItem.dataContext.deathsPC = di.deaths / population * 1000000;
          polygon.dataItem.dataContext.recoveredPC = di.recovered / population * 1000000;
          polygon.dataItem.dataContext.active = di.confirmed - di.recovered - di.deaths;
          polygon.dataItem.dataContext.activePC = polygon.dataItem.dataContext.active / population * 1000000;

          if (population > 100000) {
            if (polygon.dataItem.dataContext.confirmedPC > maxPC.confirmed) {
              maxPC.confirmed = polygon.dataItem.dataContext.confirmedPC;
            }
            if (polygon.dataItem.dataContext.deathsPC > maxPC.deaths) {
              maxPC.deaths = polygon.dataItem.dataContext.deathsPC;
            }
            if (polygon.dataItem.dataContext.recoveredPC > maxPC.recovered) {
              maxPC.recovered = polygon.dataItem.dataContext.recoveredPC;
            }
            if (polygon.dataItem.dataContext.activePC > maxPC.active) {
              maxPC.active = polygon.dataItem.dataContext.activePC;
            }
          }
        }

        bubbleSeries.heatRules.getIndex(0).maxValue = max[currentType];
        polygonSeries.heatRules.getIndex(0).maxValue = maxPC[currentType];

        bubbleSeries.invalidateRawData();
        polygonSeries.invalidateRawData();
      }
    }

    // capitalize first letter
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function handleImageOver(event) {
      rollOverCountry(polygonSeries.getPolygonById(event.target.dataItem.id));
    }

    function handleImageOut(event) {
      rollOutCountry(polygonSeries.getPolygonById(event.target.dataItem.id));
    }

    function handleImageHit(event) {
      selectCountry(polygonSeries.getPolygonById(event.target.dataItem.id));
    }

    function handleCountryHit(event) {
      selectCountry(event.target);
    }

    function handleCountryOver(event) {
      rollOverCountry(event.target);
    }

    function handleCountryOut(event) {
      rollOutCountry(event.target);
    }

    function resetHover() {
      polygonSeries.mapPolygons.each((polygon) => {
        polygon.isHover = false;
      });

      bubbleSeries.mapImages.each((image) => {
        image.isHover = false;
      });
    }

    container.events.on('layoutvalidated', () => {
      dateAxis.tooltip.hide();
      lineChart.cursor.hide();
      updateTotals(currentIndex);
    });

    // set initial data and names
    updateCountryName();
    changeDataType('active');
    // populateCountries(slideData.list);

    setTimeout(updateSeriesTooltip, 3000);

    function updateCountryTooltip() {
      polygonSeries.mapPolygons.template.tooltipText = `[bold]{name}: {value.formatNumber('#.')}[/]\n[font-size:10px]${currentTypeName} per million`;
    }

    /**
     * Country/state list on the right
     */
    /*
      function populateCountries(list) {
        let table = $("#areas tbody");
        table.find(".area").remove();
        for (var i = 0; i < list.length; i++) {
          let area = list[i];
          let tr = $("<tr>").addClass("area").data("areaid", area.id).appendTo(table).on("click", function() {
            selectCountry(polygonSeries.getPolygonById($(this).data("areaid")));
          }).hover(function() {
            rollOverCountry(polygonSeries.getPolygonById($(this).data("areaid")));
          });
          $("<td>").appendTo(tr).data("areaid", area.id).html(area.name);
          $("<td>").addClass("value").appendTo(tr).html(area.confirmed);
          $("<td>").addClass("value").appendTo(tr).html(area.deaths);
          $("<td>").addClass("value").appendTo(tr).html(area.recovered);

        }
        $("#areas").DataTable({
          "paging": false,
          "select": true
        }).column("1")
          .order("desc")
          .draw();;
      }
    */

    // function idToName(id) {
    // return am4geodata_data_countries2[id] ? am4geodata_data_countries2[id].country : id == "XX" ? "Others" : id;
    // }

    function removeAntarctica(mapData) {
      for (let i = mapData.length - 1; i >= 0; i--) {
        if (mapData[i].id == 'AQ') {
          mapData.splice(i, 1);
        }
      }
    }

    let populations = {
      AD: '84000',
      AE: '4975593',
      AF: '29121286',
      AG: '86754',
      AI: '13254',
      AL: '2986952',
      AM: '2968000',
      AN: '300000',
      AO: '13068161',
      AQ: '0',
      AR: '41343201',
      AS: '57881',
      AT: '8205000',
      AU: '21515754',
      AW: '71566',
      AX: '26711',
      AZ: '8303512',
      BA: '4590000',
      BB: '285653',
      BD: '156118464',
      BE: '10403000',
      BF: '16241811',
      BG: '7148785',
      BH: '738004',
      BI: '9863117',
      BJ: '9056010',
      BL: '8450',
      BM: '65365',
      BN: '395027',
      BO: '9947418',
      BQ: '18012',
      BR: '201103330',
      BS: '301790',
      BT: '699847',
      BV: '0',
      BW: '2029307',
      BY: '9685000',
      BZ: '314522',
      CA: '33679000',
      CC: '628',
      CD: '70916439',
      CF: '4844927',
      CG: '3039126',
      CH: '7581000',
      CI: '21058798',
      CK: '21388',
      CL: '16746491',
      CM: '19294149',
      CN: '1330044000',
      CO: '47790000',
      CR: '4516220',
      CS: '10829175',
      CU: '11423000',
      CV: '508659',
      CW: '141766',
      CX: '1500',
      CY: '1102677',
      CZ: '10476000',
      DE: '81802257',
      DJ: '740528',
      DK: '5484000',
      DM: '72813',
      DO: '9823821',
      DZ: '34586184',
      EC: '14790608',
      EE: '1291170',
      EG: '80471869',
      EH: '273008',
      ER: '5792984',
      ES: '46505963',
      ET: '88013491',
      FI: '5244000',
      FJ: '875983',
      FK: '2638',
      FM: '107708',
      FO: '48228',
      FR: '64768389',
      GA: '1545255',
      GB: '62348447',
      GD: '107818',
      GE: '4630000',
      GF: '195506',
      GG: '65228',
      GH: '24339838',
      GI: '27884',
      GL: '56375',
      GM: '1593256',
      GN: '10324025',
      GP: '443000',
      GQ: '1014999',
      GR: '11000000',
      GS: '30',
      GT: '13550440',
      GU: '159358',
      GW: '1565126',
      GY: '748486',
      HK: '6898686',
      HM: '0',
      HN: '7989415',
      HR: '4284889',
      HT: '9648924',
      HU: '9982000',
      ID: '242968342',
      IE: '4622917',
      IL: '7353985',
      IM: '75049',
      IN: '1173108018',
      IO: '4000',
      IQ: '29671605',
      IR: '76923300',
      IS: '308910',
      IT: '60340328',
      JE: '90812',
      JM: '2847232',
      JO: '6407085',
      JP: '127288000',
      KE: '40046566',
      KG: '5776500',
      KH: '14453680',
      KI: '92533',
      KM: '773407',
      KN: '51134',
      KP: '22912177',
      KR: '48422644',
      KW: '2789132',
      KY: '44270',
      KZ: '15340000',
      LA: '6368162',
      LB: '4125247',
      LC: '160922',
      LI: '35000',
      LK: '21513990',
      LR: '3685076',
      LS: '1919552',
      LT: '2944459',
      LU: '497538',
      LV: '2217969',
      LY: '6461454',
      MA: '33848242',
      MC: '32965',
      MD: '4324000',
      ME: '666730',
      MF: '35925',
      MG: '21281844',
      MH: '65859',
      MK: '2062294',
      ML: '13796354',
      MM: '53414374',
      MN: '3086918',
      MO: '449198',
      MP: '53883',
      MQ: '432900',
      MR: '3205060',
      MS: '9341',
      MT: '403000',
      MU: '1294104',
      MV: '395650',
      MW: '15447500',
      MX: '112468855',
      MY: '28274729',
      MZ: '22061451',
      NA: '2128471',
      NC: '216494',
      NE: '15878271',
      NF: '1828',
      NG: '154000000',
      NI: '5995928',
      NL: '16645000',
      NO: '5009150',
      NP: '28951852',
      NR: '10065',
      NU: '2166',
      NZ: '4252277',
      OM: '2967717',
      PA: '3410676',
      PE: '29907003',
      PF: '270485',
      PG: '6064515',
      PH: '99900177',
      PK: '184404791',
      PL: '38500000',
      PM: '7012',
      PN: '46',
      PR: '3916632',
      PS: '3800000',
      PT: '10676000',
      PW: '19907',
      PY: '6375830',
      QA: '840926',
      RE: '776948',
      RO: '21959278',
      RS: '7344847',
      RU: '140702000',
      RW: '11055976',
      SA: '25731776',
      SB: '559198',
      SC: '88340',
      SD: '35000000',
      SE: '9828655',
      SG: '4701069',
      SH: '7460',
      SI: '2007000',
      SJ: '2550',
      SK: '5455000',
      SL: '5245695',
      SM: '31477',
      SN: '12323252',
      SO: '10112453',
      SR: '492829',
      SS: '8260490',
      ST: '175808',
      SV: '6052064',
      SX: '37429',
      SY: '22198110',
      SZ: '1354051',
      TC: '20556',
      TD: '10543464',
      TF: '140',
      TG: '6587239',
      TH: '67089500',
      TJ: '7487489',
      TK: '1466',
      TL: '1154625',
      TM: '4940916',
      TN: '10589025',
      TO: '122580',
      TR: '77804122',
      TT: '1228691',
      TV: '10472',
      TW: '22894384',
      TZ: '41892895',
      UA: '45415596',
      UG: '33398682',
      UM: '0',
      US: '310232863',
      UY: '3477000',
      UZ: '27865738',
      VA: '921',
      VC: '104217',
      VE: '27223228',
      VG: '21730',
      VI: '108708',
      VN: '89571130',
      VU: '221552',
      WF: '16025',
      WS: '192001',
      XK: '1800000',
      YE: '23495361',
      YT: '159042',
      ZA: '49000000',
      ZM: '13460305',
      ZW: '13061000',
    };
  }
}

export default Map;
