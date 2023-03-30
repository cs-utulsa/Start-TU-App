import React, { useState, useEffect, FC} from 'react';
import {StyleSheet, Image, Text, View, Pressable, Animated, ScrollView, Button} from 'react-native'
import MapView, { Polygon, Marker, Overlay, PROVIDER_GOOGLE, LatLng } from 'react-native-maps';
import { State } from 'react-native-paper/lib/typescript/components/TextInput/types';
import Modal from 'react-native-modal';
import buildingInfo from '../CONFIGS.json';

const DORM_COLOR = '#103cab'
const APT_COLOR = '#4D81F0'
const EDUC_COLOR = '#ff4040'
const ADMIN_COLOR = '#930700'
const SPORTS_COLOR = '#E3c759'
const PRAY_COLOR = '#9EAFB1'
const FRAT_COLOR = '#89CFF0'
const SORO_COLOR = '#F4C2C2'
const UNIV_COLOR = 'purple'

export type BuildingData = {
    name: string,
    code?: string,
    hours?: string,
    tags: string[],
    data?: any,
    coords: LatLng[]
    color: string
}

export const buildingMap: BuildingData[] = [
    {
        name: "Keplinger Hall", 
        color: EDUC_COLOR,
        coords: [
            {latitude: 36.154399370636966, longitude: -95.94231245481298},{latitude: 36.154399370636966, longitude: -95.94184588923831},{latitude: 36.1537623145845, longitude: -95.94185726888648},
            {latitude: 36.153658179929934, longitude: -95.94173209275668},{latitude: 36.15346216138149, longitude: -95.94173209275668},{latitude: 36.15345909858778, longitude: -95.94219107189925},{latitude: 36.15367043107294, longitude: -95.94220624476347},
            {latitude: 36.15377150292973, longitude: -95.94231245481298}],
        tags: ['all', 'ens', 'keplinger'],
        code: "KEP",
    },
    {
        name: "Lafortune House",
        color: DORM_COLOR,
        coords: [
            {latitude: 36.150684500133345, longitude: -95.94245776855728}, {latitude: 36.15068578792504, longitude: -95.9422552224941}, {latitude: 36.15060079362744, longitude: -95.94225362764321}, 
            {latitude: 36.15060079362744, longitude: -95.94198888239526}, {latitude: 36.15062011052135, longitude: -95.94198888239526}, {latitude: 36.15062011052135, longitude: -95.94182142305172}, 
            {latitude: 36.150595642454924, longitude: -95.94182142305172}, {latitude: 36.150596930248085, longitude: -95.941787931183}, {latitude: 36.15043724373503, longitude: -95.9417863363321}, 
            {latitude: 36.15043595593925, longitude: -95.94181823334993}, {latitude: 36.150414063407716, longitude: -95.94181982820082}, {latitude: 36.15041277561156, longitude: -95.94198888239526}, 
            {latitude: 36.15043080475591, longitude: -95.94198888239526}, {latitude: 36.15043209255177, longitude: -95.94203832277292}, {latitude: 36.15041277561156, longitude: -95.94203832277292},
            {latitude: 36.15041277561156, longitude: -95.94218664390579}, {latitude: 36.150363839341715, longitude: -95.94218504905488}, {latitude: 36.150362551544745, longitude: -95.94220737696736}, 
            {latitude: 36.15031232744575, longitude: -95.94220897181826}, {latitude: 36.1503110396479, longitude: -95.94241789728498}, {latitude: 36.15032134202999, longitude: -95.94241630243411}, 
            {latitude: 36.15032005423231, longitude: -95.9424561737064}
        ],
        tags: ['lafortune house', 'all', 'dorm', 'housing'],
        code: "LAFO"
    },
    {
        name:"Rayzor Hall",
        color: EDUC_COLOR ,
        coords: [
            {latitude: 36.15329457039517, longitude: -95.94296104403304}, {latitude: 36.153294028963465, longitude: -95.94292349310994}, 
            {latitude: 36.1533026918702, longitude: -95.94292483421435}, {latitude: 36.1533016090069, longitude: -95.942842356294}, 
            {latitude: 36.15329511182687, longitude: -95.94284369739839}, {latitude: 36.15329240466836, longitude: -95.94265191946977}, 
            {latitude: 36.15336279075925, longitude: -95.94265191946977}, {latitude: 36.153362249328005, longitude: -95.94257949983236}, 
            {latitude: 36.15329186323664, longitude: -95.94258084093677}, {latitude: 36.153291321804936, longitude: -95.94250506853838}, 
            {latitude: 36.15323988577479, longitude: -95.9425057390906}, {latitude: 36.15323988577479, longitude: -95.94247489368948}, 
            {latitude: 36.153022229778976, longitude: -95.94247824645046}, {latitude: 36.15302331264612, longitude: -95.94246550595871}, 
            {latitude: 36.152962130628914, longitude: -95.94246684706312}, {latitude: 36.152962130628914, longitude: -95.94247824645046}, 
            {latitude: 36.15294642904157, longitude: -95.94247757589828}, {latitude: 36.15294751190976, longitude: -95.94258084093677}, 
            {latitude: 36.152938848963814, longitude: -95.94258017038459}, {latitude: 36.15293830752967, longitude: -95.94265594278295}, 
            {latitude: 36.15294805334385, longitude: -95.94265795443954}, {latitude: 36.15294805334385, longitude: -95.9428711900385}, 
            {latitude: 36.1529334346221, longitude: -95.9428711900385}, {latitude: 36.15293451749048, longitude: -95.94296439679403}, 
            {latitude: 36.152948594777946, longitude: -95.94296372624184}, {latitude: 36.152950219080196, longitude: -95.94298183115119}, 
            {latitude: 36.153022771212534, longitude: -95.94298116059899}, {latitude: 36.15302331264612, longitude: -95.94297445507699}, 
            {latitude: 36.153068251619494, longitude: -95.94297378452481}, {latitude: 36.153068793052746, longitude: -95.94296238513742}, 
            {latitude: 36.15319711262925, longitude: -95.94296104403304}, {latitude: 36.15319711262925, longitude: -95.94297445507699}, 
            {latitude: 36.1532610016228, longitude: -95.9429731139726}, {latitude: 36.1532610016228, longitude: -95.94296171458524}],
        tags: ['all', 'ens', 'rayzor hall'],
    },
    {
        name: "John Mabee Hall",
        color: DORM_COLOR,
        coords: [
            {latitude: 36.153546719983936, longitude: -95.94900305303992}, {latitude: 36.15354518858874, longitude: -95.94890063620645}, {latitude: 36.15353446882159, longitude: -95.94889873959843}, 
            {latitude: 36.153532937426164, longitude: -95.94869959575558}, {latitude: 36.153546719983936, longitude: -95.94869959575558}, {latitude: 36.15354518858874, longitude: -95.94860097213818}, {latitude: 36.153520686261686, longitude: -95.94860286874619}, 
            {latitude: 36.153519154865975, longitude: -95.94856303997763}, {latitude: 36.153428802467005, longitude: -95.9485611433696}, {latitude: 36.15342573967201, longitude: -95.94860097213818}, {latitude: 36.153229720542534, longitude: -95.94859717892213}, 
            {latitude: 36.15322665773975, longitude: -95.94862562804252}, {latitude: 36.15318224708592, longitude: -95.94862562804252}, {latitude: 36.15318224708592, longitude: -95.94860476535422}, {latitude: 36.153090362894694, longitude: -95.94860286874619}, 
            {latitude: 36.15308883149059, longitude: -95.9485611433696}, {latitude: 36.153049780675985, longitude: -95.94856168227074}, {latitude: 36.153050546378424, longitude: -95.94853323315034}, {latitude: 36.15316157315231, longitude: -95.94853418145435}, 
            {latitude: 36.15316157315231, longitude: -95.94840900532455}, {latitude: 36.153049780675985, longitude: -95.94840426380449}, {latitude: 36.153047483568635, longitude: -95.94838624602825}, {latitude: 36.152935690929674, longitude: -95.94838529772424}, 
            {latitude: 36.1529310967081, longitude: -95.94897893607212}, {latitude: 36.1529456450751, longitude: -95.94897988437614}, {latitude: 36.15294411366817, longitude: -95.94902824788083}, {latitude: 36.1530122612474, longitude: -95.94902824788083}, 
            {latitude: 36.1530122612474, longitude: -95.94899410893635}, {latitude: 36.15319449830318, longitude: -95.94899410893635}, {latitude: 36.15319373260214, longitude: -95.9490329894009}, {latitude: 36.15327413116939, longitude: -95.94903014448884}, 
            {latitude: 36.15327477376571, longitude: -95.94899430231948}, {latitude: 36.153423508656935, longitude: -95.94899589717153}, {latitude: 36.153422220910194, longitude: -95.94903098389113}, {latitude: 36.15352008960253, longitude: -95.94903018646569}, 
            {latitude: 36.153520733475084, longitude: -95.94899988429876}
        ],
        tags: ['all', 'dorm', 'john mabee hall'],
    },
    {
        name: "Stephenson Hall",
        color: EDUC_COLOR,
        coords: [
            {latitude: 36.153297704044455, longitude: -95.94231961606665}, {latitude: 36.15329588289261, longitude: -95.94222263129699}, {latitude: 36.153281313676366, longitude: -95.94222263129699}, 
            {latitude: 36.153281313676366, longitude: -95.94178845529312}, {latitude: 36.153253996388656, longitude: -95.94178845529312}, {latitude: 36.15325217523579, longitude: -95.94177492253456 }, {latitude: 36.15318934543643, longitude: -95.94177492253456}, 
            {latitude: 36.15317659735504, longitude: -95.94178732756325}, {latitude: 36.15304911642732, longitude: -95.94178507210349}, {latitude: 36.15304911642732, longitude: -95.94180762670109}, {latitude: 36.152961700814224, longitude: -95.94191250557994}, 
            {latitude: 36.15293620457538, longitude: -95.94191250557994}, {latitude: 36.152937115155495, longitude: -95.94220120442925}, {latitude: 36.15292527761334, longitude: -95.9421989489695}, {latitude: 36.15292800935401, longitude: -95.94226886822204}, 
            {latitude: 36.15293620457538, longitude: -95.94226886822204}, {latitude: 36.15293529399528, longitude: -95.94231736060689}, {latitude: 36.15320937813155, longitude: -95.94231848833678}, {latitude: 36.15320937813155, longitude: -95.94233540428499}, 
            {latitude: 36.15328313482854, longitude: -95.94233653201488}, {latitude: 36.153284955980695, longitude: -95.94231961606665}
        ],
        tags: ['all', 'educ', 'ens', 'stephenson hall'],
    },
    {
        name: "Champman Hall",
        color: EDUC_COLOR,
        coords: [
            {latitude: 36.15336590133616, longitude: -95.9478298788146}, 
            {latitude: 36.15336590133616, longitude: -95.9476291603481}, {latitude: 36.15291428294748, longitude: -95.94762426477575}, 
            {latitude: 36.15291131826674, longitude: -95.94782620713534}, {latitude: 36.15303484653547, longitude: -95.94783232660076},
            {latitude: 36.15303385831008, longitude: -95.94803671674651}, {latitude: 36.152961717823885, longitude: -95.94803426896036},
            {latitude: 36.15296270605016, longitude: -95.94821907681668}, {latitude: 36.15319493888226, longitude: -95.94821662903051},
            {latitude: 36.15320086822214, longitude: -95.94814564323138}, {latitude: 36.15321766801611, longitude: -95.94814319544521},
            {latitude: 36.153219644462204, longitude: -95.94815421048301}, {latitude: 36.153269055598784, longitude: -95.94814319544521},
            {latitude: 36.15328289071145, longitude: -95.94814074765902}, {latitude: 36.15328432284544, longitude: -95.94811032941848}, 
            {latitude: 36.153269704186556, longitude: -95.94810496500028}, {latitude: 36.153219892438884, longitude: -95.94811167052237},
            {latitude: 36.15319769371504, longitude: -95.94811032941794}, {latitude: 36.15319606941793, longitude: -95.94803723922716}, 
            {latitude: 36.15312351744584, longitude: -95.94803723922023}, {latitude: 36.15312460031161, longitude: -95.94782735637882}, 
            {latitude: 36.15329840007175, longitude: -95.94782802692778}, {latitude: 36.153295151481665, longitude: -95.94792592755029}, 
            {latitude: 36.15333034453379, longitude: -95.9479265981025}, {latitude: 36.15333088596521, longitude: -95.94782802692778}
        ],
        tags: ['all', 'chapman hall'],
    },
    {
        name: "Mary K. Chapman Center",
        color: UNIV_COLOR,
        coords: [
            {latitude: 36.15352176536669, longitude: -95.94844568202697}, 
            {latitude: 36.15352176536669, longitude: -95.94799257498467}, {latitude: 36.15345369903913, longitude: -95.94798956430665}, 
            {latitude: 36.153451268097754, longitude: -95.9480106390528}, {latitude: 36.15341601943953, longitude: -95.94801214439183}, 
            {latitude: 36.153414803968275, longitude: -95.94803020845994}, {latitude: 36.153386848124185, longitude: -95.94803020845994}, 
            {latitude: 36.153381986237235, longitude: -95.94829213744785}, {latitude: 36.153270162754296, longitude: -95.94829063210882}, 
            {latitude: 36.1532713782278, longitude: -95.9483794471105}, {latitude: 36.15329811863999, longitude: -95.9483794471105}, 
            {latitude: 36.15329933411306, longitude: -95.94840052185664}, {latitude: 36.153326074515704, longitude: -95.94840353253467}, 
            {latitude: 36.15332850546095, longitude: -95.94842159660281}, {latitude: 36.15335281490924, longitude: -95.94842159660281}, 
            {latitude: 36.15335646132582, longitude: -95.94844417668796}
        ],
        tags: ['all', 'mary k chapman center', 'chapman center'],
    },
    {
        name: "Pi Kappa Alpha Fraternity",
        color: FRAT_COLOR,
        coords: [
            {latitude: 36.15116685117342, longitude: -95.94423022653353}, {latitude: 36.151170564386845, longitude: -95.94372207952603}, 
            {latitude: 36.15105081316508, longitude: -95.94372552848762}, {latitude: 36.151046171641184, longitude: -95.94392211929821}, 
            {latitude: 36.15101089605051, longitude: -95.94392211929821}, {latitude: 36.15101182435575, longitude: -95.94403248606906}, 
            {latitude: 36.151051741469814, longitude: -95.94403248606906}, {latitude: 36.151051741469814, longitude: -95.9442279272258}
        ],
        tags: ['all', 'fraternity', 'pi kappa alpha', 'pike'],
    },
    {
        name: "McClure Hall",
        color: ADMIN_COLOR,
        coords: [
            {latitude: 36.151336598493224, longitude: -95.94743438829745}, {latitude: 36.15133730404892, longitude: -95.94715826916898}, 
            {latitude: 36.15114186488037, longitude: -95.94715739537425}, {latitude: 36.15114115932294, longitude: -95.94714865742716}, 
            {latitude: 36.15106989798803, longitude: -95.94714778363243}, {latitude: 36.15106778131373, longitude: -95.94725788176596}, 
            {latitude: 36.15098805320587, longitude: -95.94725788176584}, {latitude: 36.1509852309705, longitude: -95.94758555478221}, 
            {latitude: 36.151137631534766, longitude: -95.94758555478221}, {latitude: 36.15113833709225, longitude: -95.9475584671462}, 
            {latitude: 36.151158798257, longitude: -95.94755759335142}, {latitude: 36.151159503814284, longitude: -95.94743176691314}
      ],
      tags: ['all', 'mcclure hall', 'admin'],
    },
    {
        name: "United Methodist Church",
        color: PRAY_COLOR,
        coords: [
            {latitude: 36.15416877898395, longitude: -95.94673030798657}, {latitude: 36.15417202387157, longitude: -95.9462781960352}, 
            {latitude: 36.15384104464297, longitude: -95.9462741772623}, {latitude: 36.15384266709358, longitude: -95.94622997076038}, 
            {latitude: 36.15378750375412, longitude: -95.94622796137395}, {latitude: 36.15378912620582, longitude: -95.94626011155715}, 
            {latitude: 36.15377290168717, longitude: -95.94626011155715}, {latitude: 36.15377127923514, longitude: -95.9464047873816}, 
            {latitude: 36.15378425885058, longitude: -95.9464047873816}, {latitude: 36.15378588130236, longitude: -95.94645703142929}, 
            {latitude: 36.15384428954413, longitude: -95.94645301265639}, {latitude: 36.15384428954413, longitude: -95.94639875922222}, 
            {latitude: 36.153990309958225, longitude: -95.94639875922222}, {latitude: 36.15398868751067, longitude: -95.94647712529381}, 
            {latitude: 36.15405196294031, longitude: -95.94647913468025}, {latitude: 36.15405358538654, longitude: -95.94659768848084}, 
            {latitude: 36.15377939149503, longitude: -95.94659567909437}, {latitude: 36.15378101394692, longitude: -95.94672628921367}
        ],
        tags: ['all', 'umc', 'united methodist church', 'worship', 'church'],
    },
    {
        name: "West Village",
        color: APT_COLOR,
        coords: [
            {latitude: 36.154548880526676, longitude: -95.94881518718397}, {latitude: 36.15454647290945, longitude: -95.94869144110841}, 
            {latitude: 36.154530823395625, longitude: -95.94868995019185}, {latitude: 36.154530823395625, longitude: -95.94864969544437}, 
            {latitude: 36.15449591293044, longitude: -95.94864820452779}, {latitude: 36.154493505311564, longitude: -95.94867355010953}, 
            {latitude: 36.15433700992701, longitude: -95.94867056827637}, {latitude: 36.15433821373887, longitude: -95.94864969544437}, 
            {latitude: 36.15429728412585, longitude: -95.94864969544437}, {latitude: 36.15429608031339, longitude: -95.94868547744211}, 
            {latitude: 36.15426598499561, longitude: -95.94868547744211}, {latitude: 36.15426598499561, longitude: -95.9486526772775}, 
            {latitude: 36.15422866678552, longitude: -95.9486526772775}, {latitude: 36.15422625915845, longitude: -95.94867205919296}, 
            {latitude: 36.154070967056484, longitude: -95.94867205919296}, {latitude: 36.15406976324056, longitude: -95.94864671361121}, 
            {latitude: 36.15403124112055, longitude: -95.94864820452779}, {latitude: 36.15403244493709, longitude: -95.94867205919296}, 
            {latitude: 36.15401318387029, longitude: -95.94867056827637}, {latitude: 36.154016795320665, longitude: -95.94881667810053}, 
            {latitude: 36.15403244493709, longitude: -95.94881369626741}, {latitude: 36.15403244493709, longitude: -95.94885544193144}, 
            {latitude: 36.15407217087243, longitude: -95.94885544193144}, {latitude: 36.154074578504215, longitude: -95.94883755093255}, 
            {latitude: 36.15422866678552, longitude: -95.94884053276571}, {latitude: 36.15422866678552, longitude: -95.948856932848}, 
            {latitude: 36.15426718880853, longitude: -95.94886140559774}, {latitude: 36.15427080024723, longitude: -95.94881965993368}, 
            {latitude: 36.15429608031339, longitude: -95.94881965993368}, {latitude: 36.15429608031339, longitude: -95.94885842376459}, 
            {latitude: 36.15433941755067, longitude: -95.94885842376459}, {latitude: 36.15433941755067, longitude: -95.94883755093255}, 
            {latitude: 36.15449591293044, longitude: -95.94884053276571}, {latitude: 36.15449591293044, longitude: -95.94885842376459}, 
            {latitude: 36.154532027204475, longitude: -95.948856932848}, {latitude: 36.15453323101333, longitude: -95.94881518718397}
        ],
        tags: ['all', 'apt', 'apartment', 'west village'],
    },
    {
        name: "West Village",
        color: APT_COLOR,
        coords: [
            {latitude: 36.15398622032713, longitude: -95.9487682298253}, {latitude: 36.15398622032713, longitude: -95.94871123288843}, {latitude: 36.153968894663755, longitude: -95.948709891784}, {latitude: 36.15397214322592, longitude: -95.9485268310338}, 
            {latitude: 36.153985678900206, longitude: -95.94852750158601}, {latitude: 36.15398513747329, longitude: -95.94847922182771}, {latitude: 36.153954276132296, longitude: -95.9484798923799}, {latitude: 36.15395265185084, longitude: -95.94844032980019}, 
            {latitude: 36.153985678900206, longitude: -95.94843965924798}, {latitude: 36.15398513747329, longitude: -95.94838534451989}, {latitude: 36.15397701606894, longitude: -95.94838601507209}, {latitude: 36.153978098922906, longitude: -95.94820094266528}, 
            {latitude: 36.153985678900206, longitude: -95.94820161321748}, {latitude: 36.15398459604635, longitude: -95.94815132180258}, {latitude: 36.153953734705155, longitude: -95.94815132180258}, {latitude: 36.153953734705155, longitude: -95.94812986413221}, 
            {latitude: 36.15385140490792, longitude: -95.94813053468444}, {latitude: 36.153851946335756, longitude: -95.94815266290698}, {latitude: 36.15381783637392, longitude: -95.94815333345916}, {latitude: 36.15381783637392, longitude: -95.94819826045648}, 
            {latitude: 36.15383462064271, longitude: -95.94819691935207}, {latitude: 36.15383516207068, longitude: -95.94824050524501}, {latitude: 36.15382595779476, longitude: -95.94824050524501}, {latitude: 36.15382704065081, longitude: -95.94839205004189}, 
            {latitude: 36.15381729494583, longitude: -95.94839137948968}, {latitude: 36.15381837780201, longitude: -95.94843831814359}, {latitude: 36.1538486977686, longitude: -95.94843831814359}, {latitude: 36.15384978062434, longitude: -95.9484785512755}, 
            {latitude: 36.15381946065816, longitude: -95.94847922182771}, {latitude: 36.15382000208622, longitude: -95.94851878440741}, {latitude: 36.15382920636285, longitude: -95.94851945495961}, {latitude: 36.15383137207485, longitude: -95.94871659730602}, 
            {latitude: 36.15381891923007, longitude: -95.94871659730602}, {latitude: 36.15381891923007, longitude: -95.94876420651212}, {latitude: 36.153847073484975, longitude: -95.94876353595993}, {latitude: 36.153847073484975, longitude: -95.94878633473465}, 
            {latitude: 36.15387089630817, longitude: -95.94878767583907}, {latitude: 36.15387035488044, longitude: -95.94882254455338}, {latitude: 36.15393370189821, longitude: -95.94882187400118}, {latitude: 36.15393424332549, longitude: -95.94879639301763}, 
            {latitude: 36.15395265185084, longitude: -95.94879572246545}, {latitude: 36.15395265185084, longitude: -95.9487695709297}
        ],
        tags: ['all', 'apt', 'apartment', 'west village'],
    },
    {
        name: "West Village",
        color: APT_COLOR,
        coords: [
            {latitude: 36.15453684958365, longitude: -95.94837863896831}, {latitude: 36.15453684958365, longitude: -95.94830018436109}, {latitude: 36.154541722391556, longitude: -95.94830018436109}, {latitude: 36.154541722391556, longitude: -95.94825190460278}, 
            {latitude: 36.154534142467995, longitude: -95.94825190460278}, {latitude: 36.154535766737396, longitude: -95.94817143833896}, {latitude: 36.1545233140045, longitude: -95.94817143833896}, {latitude: 36.154522772581274, longitude: -95.94813254631141}, 
            {latitude: 36.15453468389114, longitude: -95.94813254631141}, {latitude: 36.15453468389114, longitude: -95.94808292544873}, {latitude: 36.154529811082774, longitude: -95.94808426655314}, {latitude: 36.154530893929106, longitude: -95.94805811501739}, 
            {latitude: 36.15454118096848, longitude: -95.94805744446518}, {latitude: 36.154540639545374, longitude: -95.9480051413937}, {latitude: 36.15453468389114, longitude: -95.94800581194589}, {latitude: 36.15453522531427, longitude: -95.94792936899525}, 
            {latitude: 36.15452006546515, longitude: -95.94792869844305}, {latitude: 36.15452060688838, longitude: -95.94790724077271}, {latitude: 36.15441123931939, longitude: -95.9479058996683}, {latitude: 36.15440907362343, longitude: -95.94792869844305}, 
            {latitude: 36.15439228947758, longitude: -95.94792936899525}, {latitude: 36.1543906652052, longitude: -95.94800581194589}, {latitude: 36.15437442247968, longitude: -95.9480051413937}, {latitude: 36.15437388105543, longitude: -95.9480554328086}, 
            {latitude: 36.15439932799077, longitude: -95.9480540917042}, {latitude: 36.15439824514263, longitude: -95.94824922239398}, {latitude: 36.15437388105543, longitude: -95.94825056349839}, {latitude: 36.154373339631185, longitude: -95.94830018436109}, 
            {latitude: 36.154395538022214, longitude: -95.94830018436109}, {latitude: 36.1543960794463, longitude: -95.94833572362761}, {latitude: 36.15438633381207, longitude: -95.94833572362761}, {latitude: 36.15438633381207, longitude: -95.94837595675953}, 
            {latitude: 36.15440907362343, longitude: -95.94837662731173}, {latitude: 36.15440961504741, longitude: -95.94840143774309}, {latitude: 36.15452223115806, longitude: -95.94840277884747}, {latitude: 36.15452223115806, longitude: -95.94837863896831}
        ],
        tags: ['all', 'apt', 'apartment', 'west village'],
    },
    {
        name: "Helmerich Hall",
        color: EDUC_COLOR,
        coords: [
            {latitude: 36.15336869951875, longitude: -95.94748017613777}, {latitude: 36.153369610093826, longitude: -95.94727154610996}, {latitude: 36.15338235814382, longitude: -95.94727041838009}, {latitude: 36.153381447568904, longitude: -95.94723771421356}, 
            {latitude: 36.15339237446738, longitude: -95.94723658648367}, {latitude: 36.15339419561696, longitude: -95.9470820874901}, {latitude: 36.153334097657904, longitude: -95.9470820874901}, {latitude: 36.153334097657904, longitude: -95.9469749531515}, 
            {latitude: 36.153249414091945, longitude: -95.94697382542161}, {latitude: 36.153249414091945, longitude: -95.9468610524336}, {latitude: 36.15290885775284, longitude: -95.94686218016348}, {latitude: 36.15290885775284, longitude: -95.94707193792118}, 
            {latitude: 36.15303542832963, longitude: -95.94707306565105}, {latitude: 36.15303542832963, longitude: -95.94705051105346}, {latitude: 36.15315926696964, longitude: -95.94705163878334}, {latitude: 36.153158356392126, longitude: -95.94728958978806}, 
            {latitude: 36.15295529734072, longitude: -95.94728846205815}, {latitude: 36.15295438676083, longitude: -95.94750273073538}, {latitude: 36.15308459957776, longitude: -95.9475016030055}, {latitude: 36.15308551015614, longitude: -95.94747679294814}
        ],
        tags: ['all', 'helmerich hall', 'education'],
    },
    {
        name: "Phillips Hall",
        color: EDUC_COLOR,
        coords: [
            {latitude: 36.15325578812487, longitude: -95.94659378040738}, {latitude: 36.15325396697206, longitude: -95.94634229664413}, {latitude: 36.15321116986878, longitude: -95.94634229664413}, {latitude: 36.15321025929188, longitude: -95.94628591015011}, 
            {latitude: 36.15302268022114, longitude: -95.94628478242024}, {latitude: 36.153021769642024, longitude: -95.94624080095493}, {latitude: 36.152867881620935, longitude: -95.9462419286848}, {latitude: 36.152867881620935, longitude: -95.94665580555079}, 
            {latitude: 36.15294437037923, longitude: -95.94667046603922}, {latitude: 36.153021769642024, longitude: -95.94665580555079}, {latitude: 36.15302359080023, longitude: -95.94656897035003}, {latitude: 36.15298079357123, longitude: -95.94656897035003}, 
            {latitude: 36.15298170415081, longitude: -95.94652611661459}, {latitude: 36.15309006304577, longitude: -95.9465249888847}, {latitude: 36.15309097362407, longitude: -95.94649905109745}, {latitude: 36.15310463229753, longitude: -95.94649792336757}, 
            {latitude: 36.1531064534538, longitude: -95.9464516864425}, {latitude: 36.15312921790375, longitude: -95.9464516864425}, {latitude: 36.15312830732587, longitude: -95.94659378040738}, {latitude: 36.15312011212457, longitude: -95.94659490813727}, 
            {latitude: 36.15312193328048, longitude: -95.94667046603922}, {latitude: 36.15324395063084, longitude: -95.94666821057947}, {latitude: 36.15324395063084, longitude: -95.94659265267751}
        ],
        tags: ['phillips hall', 'all', 'art', 'educ'],
    },
    {
        name: "McFarlin Library",
        color: UNIV_COLOR,
        coords: [
            {latitude: 36.152543609995014, longitude: -95.94600479389928}, {latitude: 36.152543068558124, longitude: -95.94596389021518}, {latitude: 36.152533322693586, longitude: -95.94595047917122}, {latitude: 36.15253386413053, longitude: -95.9459276803965}, 
            {latitude: 36.152519245331554, longitude: -95.94592700984431}, {latitude: 36.152519245331554, longitude: -95.94589214113}, {latitude: 36.152532781256625, longitude: -95.94589214113}, {latitude: 36.152532781256625, longitude: -95.94586867180305}, 
            {latitude: 36.15254198568434, longitude: -95.9458592840723}, {latitude: 36.15254198568434, longitude: -95.94581905094041}, {latitude: 36.152532781256625, longitude: -95.94580631044866}, {latitude: 36.15253223981968, longitude: -95.94578284112173}, 
            {latitude: 36.15247701323033, longitude: -95.94578217056953}, {latitude: 36.15247647179298, longitude: -95.9457607128992}, {latitude: 36.152392548959625, longitude: -95.9457613834514}, {latitude: 36.152392548959625, longitude: -95.94575534848161}, 
            {latitude: 36.15209746473221, longitude: -95.94575668958618}, {latitude: 36.15209854761212, longitude: -95.94589348223457}, {latitude: 36.152151067270076, longitude: -95.94589214113017}, {latitude: 36.152152691588846, longitude: -95.94598400678129}, 
            {latitude: 36.15220358689287, longitude: -95.94598199512471}, {latitude: 36.152204669771336, longitude: -95.94607453132804}, {latitude: 36.152054181659054, longitude: -95.94607509174578}, {latitude: 36.15205201589798, longitude: -95.94610258438591}, 
            {latitude: 36.15203577268805, longitude: -95.94610258438591}, {latitude: 36.152035231247645, longitude: -95.94611800708645}, {latitude: 36.15203577268805, longitude: -95.94611800708645}, {latitude: 36.15202548532001, longitude: -95.94612739481722}, 
            {latitude: 36.15202602676046, longitude: -95.94615153469637}, {latitude: 36.15203577268805, longitude: -95.94615824021835}, {latitude: 36.152035231247645, longitude: -95.94617701567988}, {latitude: 36.15205309877853, longitude: -95.94617701567988}, 
            {latitude: 36.15205309877853, longitude: -95.9462058494244}, {latitude: 36.152209033420625, longitude: -95.9462038377678}, {latitude: 36.15220957485984, longitude: -95.94626821077883}, {latitude: 36.15230649241452, longitude: -95.94626821077883}, 
            {latitude: 36.15230649241452, longitude: -95.94621456660296}, {latitude: 36.15232111125314, longitude: -95.94621523715519}, {latitude: 36.152321652691555, longitude: -95.94620115555901}, {latitude: 36.15246567518053, longitude: -95.94620115555799}, 
            {latitude: 36.15246675805536, longitude: -95.94617299236567}, {latitude: 36.152481918301405, longitude: -95.94617433347007}, {latitude: 36.15248245973873, longitude: -95.9461568991129}, {latitude: 36.15249112273511, longitude: -95.94615086414314}, 
            {latitude: 36.15249112273511, longitude: -95.94612471260741}, {latitude: 36.152481918301405, longitude: -95.94611800708542}, {latitude: 36.15248300117603, longitude: -95.94609923162389}, {latitude: 36.15246513374311, longitude: -95.9460985610717}, 
            {latitude: 36.15246459230568, longitude: -95.94607173898376}, {latitude: 36.152452680681385, longitude: -95.94607173898376}, {latitude: 36.152454304993896, longitude: -95.94603821137386}, {latitude: 36.15253443770263, longitude: -95.94603687026948}, 
            {latitude: 36.15253389626568, longitude: -95.94601340094253}
        ],
        tags: ['mcfarlin library', 'library', 'all'],
    },
    {
        name: "Lottie Jane Mabee Hall",
        color: DORM_COLOR,
        coords: [
            {latitude: 36.151556952252335, longitude: -95.94868758558678}, {latitude: 36.151556410808645, longitude: -95.94859102607025}, {latitude: 36.15155099637149, longitude: -95.94859169662244}, 
            {latitude: 36.15154991348401, longitude: -95.94839924814161}, {latitude: 36.150998180365, longitude: -95.94839589538027}, {latitude: 36.150997638917445, longitude: -95.94854475796824}, 
            {latitude: 36.15143133721366, longitude: -95.94854609907595}, {latitude: 36.15143133721366, longitude: -95.94885924695242}, {latitude: 36.151108635588685, longitude: -95.9488565647423}, 
            {latitude: 36.15110755269508, longitude: -95.94872983037688}, {latitude: 36.151013340896, longitude: -95.94872848927247}, {latitude: 36.151012258001096, longitude: -95.94886930523407}, 
            {latitude: 36.151000887603736, longitude: -95.94886930523407}, {latitude: 36.1510003461562, longitude: -95.94898262855553}, {latitude: 36.1510312086597, longitude: -95.94898329910771}, 
            {latitude: 36.1510312086597, longitude: -95.94901883837422}, {latitude: 36.15110971848224, longitude: -95.94901950892641}, {latitude: 36.15110971848224, longitude: -95.94900274512146}, 
            {latitude: 36.151469238324125, longitude: -95.94900542733193}, {latitude: 36.15146869687983, longitude: -95.94903761383743}, {latitude: 36.151538001719956, longitude: -95.94903761383743}, 
            {latitude: 36.151538001719956, longitude: -95.94899201628796}, {latitude: 36.15154720626442, longitude: -95.94899134573575}, {latitude: 36.15154828915191, longitude: -95.94868758559006}
        ],
        tags: ['lottie jane mabee', 'dorm', 'all'],
    },
    {
        name: "Hardesty Hall",
        color: DORM_COLOR,
        coords: [
            {latitude: 36.153655046182635, longitude: -95.94479439947533}, {latitude: 36.153655046182635, longitude: -95.9442177245923}, 
            {latitude: 36.15339082828421, longitude: -95.94422308900982}, {latitude: 36.153386496835815, longitude: -95.94441352583165}, 
            {latitude: 36.153493832710474, longitude: -95.94441233453934}, {latitude: 36.153492628885665, longitude: -95.94455248068232}, 
            {latitude: 36.15310018101423, longitude: -95.94455546251514}, {latitude: 36.15309980541543, longitude: -95.94439414747659}, 
            {latitude: 36.15308770162368, longitude: -95.94439664585369}, {latitude: 36.15308568432489, longitude: -95.94431045184417}, 
            {latitude: 36.153100814064636, longitude: -95.94429296320455}, {latitude: 36.153100814064636, longitude: -95.94425423835969}, 
            {latitude: 36.153083667026024, longitude: -95.94425423835969}, {latitude: 36.153083667026024, longitude: -95.94411557843134}, 
            {latitude: 36.152842599439, longitude: -95.9441168276199}, {latitude: 36.15284461674407, longitude: -95.94464273599678}, 
            {latitude: 36.15293136081248, longitude: -95.94464273599678}, {latitude: 36.152932369463876, longitude: -95.94480263213039}
        ],
        tags: ['hardesty hall', 'dorm', 'all'],
    },
    {
        name: "Kappa Sigma Faternity",
        color: FRAT_COLOR,
        coords: [
            {latitude: 36.15119060500146, longitude: -95.94359437479582}, {latitude: 36.15119051541939, longitude: -95.943293528552}, 
            {latitude: 36.15106643152878, longitude: -95.94329259721178}, {latitude: 36.151061919383594, longitude: -95.9435934201113}
        ],
        tags: ['kappa sigma', 'k sig', 'ksig', 'fraternity', 'all'],
    },
    {
        name: "Kappa Alpha Fraternity",
        color: FRAT_COLOR,
        coords: [
            {latitude: 36.15120029171758, longitude: -95.94294613860745}, {latitude: 36.15120029171758, longitude: -95.94277570334239}, 
            {latitude: 36.151084480106896, longitude: -95.94277197798141}, {latitude: 36.151082976058866, longitude: -95.94277942870339}, 
            {latitude: 36.151042366751504, longitude: -95.94277942870339}, {latitude: 36.151040110678245, longitude: -95.94315196480187}, 
            {latitude: 36.15110177665699, longitude: -95.94315289614211}, {latitude: 36.15110177665699, longitude: -95.9431631408848}, 
            {latitude: 36.15118224316611, longitude: -95.94316220954458}, {latitude: 36.15118224316611, longitude: -95.94307373222118}, 
            {latitude: 36.151113809037454, longitude: -95.94307466356143}, {latitude: 36.151113809037454, longitude: -95.94300574438321}, 
            {latitude: 36.151181491143035, longitude: -95.94300667572347}, {latitude: 36.151181491143035, longitude: -95.94294427592696}
        ],
        tags: ['kappa alpha', 'fraternity', 'all'],
    },
    {
        name: "Lambda Chi Alpha Fraternity",
        color: FRAT_COLOR,
        coords: [
            {latitude: 36.15123789285342, longitude: -95.94250188927067}, {latitude: 36.15123864487596, longitude: -95.94238174637893}, 
            {latitude: 36.151052143068505, longitude: -95.94237895235818}, {latitude: 36.1510491349712, longitude: -95.94271237216631}, 
            {latitude: 36.15117171484286, longitude: -95.94271423484682}, {latitude: 36.151173218889156, longitude: -95.94249909524994}
        ],
        tags: ['k a', 'kappa alpha', 'fraternity', 'all'],
    },
    {
        name: "Sigma Nu Fraternity",
        color: FRAT_COLOR,
        coords: [
            {latitude: 36.1512221003785, longitude: -95.94226998548794}, {latitude: 36.15122059633312, longitude: -95.94199337743481}, 
            {latitude: 36.15113336165186, longitude: -95.94199430877507}, {latitude: 36.15113336165186, longitude: -95.94201386692023}, 
            {latitude: 36.15103259043374, longitude: -95.94201293558}, {latitude: 36.15103334245824, longitude: -95.94225880940499}, 
            {latitude: 36.15113336165186, longitude: -95.94225880940499}, {latitude: 36.15113260962833, longitude: -95.94226998548794}
        ],
        tags: ['sigma nu', 'sig nu', 'fraternity', 'all'],
    },
    {
        name: "Sigma Chi",
        color: FRAT_COLOR,
        coords: [
            {latitude: 36.15119126744248, longitude: -95.94192259557609}, {latitude: 36.15119201946545, longitude: -95.94179220794162}, 
            {latitude: 36.15113712176943, longitude: -95.94179220794162}, {latitude: 36.151135617722424, longitude: -95.94157613700449}, 
            {latitude: 36.15103033461836, longitude: -95.94157695685246}, {latitude: 36.15103087606569, longitude: -95.94163596544513}, 
            {latitude: 36.15102113001322, longitude: -95.94163596544513}, {latitude: 36.15102492014487, longitude: -95.94192027957351}
        ],
        tags: ['sigma chi', 'sig chi', 'fraternity', 'all'],
    },
    {
        name: "Kendall Hall",
        color: EDUC_COLOR,
        coords: [
            {latitude: 36.152213334778864, longitude: -95.94535078439179}, {latitude: 36.152213334778864, longitude: -95.94517711397823}, 
            {latitude: 36.15213593471175, longitude: -95.94515343164913}, {latitude: 36.15205944515864, longitude: -95.94479594125244}, 
            {latitude: 36.15197020725237, longitude: -95.9449042033284}, {latitude: 36.1518409031636, longitude: -95.94480496307258}, 
            {latitude: 36.151741648474726, longitude: -95.94492337471819}, {latitude: 36.15176350272895, longitude: -95.94494592931736}, 
            {latitude: 36.151697939948036, longitude: -95.94502712587432}, {latitude: 36.151647857231254, longitude: -95.94499103851567}, 
            {latitude: 36.15162236056317, longitude: -95.94504516955364}, {latitude: 36.151660605562206, longitude: -95.94507223507264}, 
            {latitude: 36.151617807585836, longitude: -95.94512749384059}, {latitude: 36.151659694967215, longitude: -95.94532146339337}, 
            {latitude: 36.15158485385023, longitude: -95.94548544141507}, {latitude: 36.15158756106769, longitude: -95.94549214693697}, 
            {latitude: 36.15164982704339, longitude: -95.94549214693697}, {latitude: 36.15166173878961, longitude: -95.94556590767783}, 
            {latitude: 36.151712634412284, longitude: -95.94556590767783}, {latitude: 36.15172779480413, longitude: -95.94563028068802}, 
            {latitude: 36.15180197239517, longitude: -95.94562826903548}, {latitude: 36.151801430953164, longitude: -95.94550220522386}, 
            {latitude: 36.15182687872328, longitude: -95.94550354632823}, {latitude: 36.15183662467562, longitude: -95.94558133038221}, 
            {latitude: 36.151847453510115, longitude: -95.94557998927785}, {latitude: 36.151849619276824, longitude: -95.94559407087382}, 
            {latitude: 36.151881022890194, longitude: -95.94558602424972}, {latitude: 36.151884271538876, longitude: -95.94559742363694}, 
            {latitude: 36.15192000666535, longitude: -95.94559943529353}, {latitude: 36.15195195168885, longitude: -95.94558937701068}, 
            {latitude: 36.15195086880692, longitude: -95.94556791934062}, {latitude: 36.152015300256316, longitude: -95.94555987271433}, 
            {latitude: 36.152015300256316, longitude: -95.94557730707128}, {latitude: 36.15209110189715, longitude: -95.94556858989056}, 
            {latitude: 36.15208839469707, longitude: -95.94555048498145}, {latitude: 36.152184229522796, longitude: -95.94553908559423}, 
            {latitude: 36.15215607467089, longitude: -95.94548275921032}, {latitude: 36.15215715754999, longitude: -95.94537278865121}
        ],
        tags: ['kendall hall', 'music', 'drama', 'education', 'all'],
    },
    {
        name: "Alan Chapman Student Union",
        color: UNIV_COLOR,
        coords: [
            {latitude: 36.153721193745774, longitude: -95.94369644200562}, {latitude: 36.15368622620406, longitude: -95.94365559478364}, 
            {latitude: 36.15368523321894, longitude: -95.94316367554875}, {latitude: 36.15340223194781, longitude: -95.94316490534683}, 
            {latitude: 36.15336747733541, longitude: -95.94312186241379}, {latitude: 36.15333272270763, longitude: -95.94316613514493}, 
            {latitude: 36.15320264096406, longitude: -95.94316490534683}, {latitude: 36.15320164797133, longitude: -95.94399009986809}, 
            {latitude: 36.15339925298012, longitude: -95.94399009986809}, {latitude: 36.153442944472644, longitude: -95.94404175138773}, 
            {latitude: 36.15348564295318, longitude: -95.94399009986809}, {latitude: 36.15368523321662, longitude: -95.94399009986809}, 
            {latitude: 36.15368721918685, longitude: -95.94374045085638}
        ],
        tags: ['acac', 'acsu', 'alan chapman student union', 'food', 'dining', 'all'],
    },
    {
        name: "Oliphant Hall",
        color: EDUC_COLOR,
        coords: [
            {latitude: 36.15137066203855, longitude: -95.94503105769124}, {latitude: 36.151204022375424, longitude: -95.94503218542111}, 
            {latitude: 36.151202201174954, longitude: -95.9450434627199}, {latitude: 36.150976371990126, longitude: -95.94503895180037}, 
            {latitude: 36.15097910379867, longitude: -95.94578099806081}, {latitude: 36.15115484994815, longitude: -95.94577761487118}, 
            {latitude: 36.15115758175046, longitude: -95.94560507219967}, {latitude: 36.15123225097714, longitude: -95.94560507219967}, 
            {latitude: 36.1512286085775, longitude: -95.94565018139484}, {latitude: 36.15124317817507, longitude: -95.94572461156686}, 
            {latitude: 36.15136155605516, longitude: -95.94572573929675}, {latitude: 36.151371572636826, longitude: -95.94564792593509}, 
            {latitude: 36.15136155605516, longitude: -95.94556447392405}, {latitude: 36.15137248323508, longitude: -95.94542350768916}, 
            {latitude: 36.1513351486974, longitude: -95.94525209274752}
        ],
        tags: ['oliphant hall', 'biology', 'education', 'collegian', 'ens', 'foreign languages', 'languages', 'all'],
    },
    {
        name: "John Zink Hall",
        color: EDUC_COLOR,
        coords: [
            {latitude: 36.15116668775367, longitude: -95.94486077038829}, {latitude: 36.15116577715301, longitude: -95.94438374064944}, 
            {latitude: 36.150942679673115, longitude: -95.94438486837932}, {latitude: 36.15094450087959, longitude: -95.94485964265841}
        ],
        tags: ['john zink hall', 'all'],
    },
    {
        name: "Harwell Hall",
        color: EDUC_COLOR,
        coords: [
            {latitude: 36.151595579498725, longitude: -95.9448382158036}, {latitude: 36.151596490094384, longitude: -95.94470401594799}, 
            {latitude: 36.15155460268272, longitude: -95.94470176048823}, {latitude: 36.15155369208659, longitude: -95.94469161091932}, 
            {latitude: 36.1514735595836, longitude: -95.9446927386492}, {latitude: 36.15147082779228, longitude: -95.94458109339118}, 
            {latitude: 36.15139433759678, longitude: -95.94458222112105}, {latitude: 36.15139160580269, longitude: -95.94469499410894},
            {latitude: 36.15129803558016, longitude: -95.94469543590208}, {latitude: 36.15129695268918, longitude: -95.94470281197626}, 
            {latitude: 36.15126446595314, longitude: -95.94470281197626}, {latitude: 36.15126554884456, longitude: -95.94483960462463}, 
            {latitude: 36.151303450034774, longitude: -95.94483893407245}, {latitude: 36.15130453292566, longitude: -95.94486441505596}, 
            {latitude: 36.151554138874474, longitude: -95.94486374450376}, {latitude: 36.151554138874474, longitude: -95.94483759296804}
        ],
        tags: ['harwell hall', 'all'],
    },
    {
        name: "Mabee Gym",
        color: UNIV_COLOR,
        coords: [
            {latitude: 36.15068958547719, longitude: -95.94443557847757}, {latitude: 36.15068958547719, longitude: -95.94397997560642}, 
            {latitude: 36.150672283957604, longitude: -95.9439811033363}, {latitude: 36.150672283957604, longitude: -95.94391569500331}, 
            {latitude: 36.15063039605233, longitude: -95.94391569500331}, {latitude: 36.15063221726605, longitude: -95.94380404974528}, 
            {latitude: 36.150675015776734, longitude: -95.94380404974528}, {latitude: 36.1506759263831, longitude: -95.94365067848172}, 
            {latitude: 36.15052749740739, longitude: -95.94364842302195}, {latitude: 36.15052567619122, longitude: -95.94371495908483}, 
            {latitude: 36.15048469881621, longitude: -95.94371383135497}, {latitude: 36.15048378820762, longitude: -95.9434093442876}, 
            {latitude: 36.15030348750111, longitude: -95.94340708882785}, {latitude: 36.150302946048754, longitude: -95.94346676797346},
            {latitude: 36.14990930919817, longitude: -95.94346676797286}, {latitude: 36.14990930919817, longitude: -95.94359752565148}, 
            {latitude: 36.14993529903714, longitude: -95.94359752565148}, {latitude: 36.14993529903714, longitude: -95.94374169437405}, 
            {latitude: 36.14994612813417, longitude: -95.94374236492625}, {latitude: 36.14994612813417, longitude: -95.94377321032736}, 
            {latitude: 36.14991526520369, longitude: -95.94377388087955}, {latitude: 36.14991364083859, longitude: -95.94397839929994}, 
            {latitude: 36.14986599278072, longitude: -95.94397906985213}, {latitude: 36.14986545132533, longitude: -95.94443370424239}, 
            {latitude: 36.14987140733408, longitude: -95.9444343748068}, {latitude: 36.14987140733408, longitude: -95.94447594904308}, 
            {latitude: 36.149932050307626, longitude: -95.94447661959528}, {latitude: 36.149932050307626, longitude: -95.94448533677385}, 
            {latitude: 36.14997211796085, longitude: -95.94448466622165}, {latitude: 36.1499715765062, longitude: -95.9445745202162}, 
            {latitude: 36.15005875065459, longitude: -95.94457586132057}, {latitude: 36.15005875065459, longitude: -95.94453763984531}, 
            {latitude: 36.15011343749324, longitude: -95.94453763984531}, {latitude: 36.15011452040056, longitude: -95.94458256684257}, 
            {latitude: 36.150514653637764, longitude: -95.9445825668474}, {latitude: 36.15051519508865, longitude: -95.9444813134655}, 
            {latitude: 36.15060615878468, longitude: -95.9444826545699}, {latitude: 36.15060615878468, longitude: -95.94443571591604}
        ],
        tags: ['mabee gym', 'all'],
    },
    {
        name: "Baptist Collegiate Ministries",
        color: PRAY_COLOR,
        coords: [
            {latitude: 36.150668728008576, longitude: -95.94652298094276}, {latitude: 36.150671790911254, longitude: -95.94631435405996}, 
            {latitude: 36.150431352686454, longitude: -95.94631150914792}, {latitude: 36.15042905550239, longitude: -95.94634944130844}, 
            {latitude: 36.150298115900505, longitude: -95.94635228622047}, {latitude: 36.150298115900505, longitude: -95.94650591147052}, 
            {latitude: 36.150427524046336, longitude: -95.94650401486248}, {latitude: 36.15042828977436, longitude: -95.94652203263873}
        ],
        tags: ['bcm', 'baptist collegiate ministries', 'worship', 'church', 'all'],
    },
    {
        name: "Westby Hall",
        color: ADMIN_COLOR,
        coords: [
            {latitude: 36.150680422217576, longitude: -95.9467207707458}, {latitude: 36.150679880767804, longitude: -95.9465491093831}, 
            {latitude: 36.150303572289715, longitude: -95.9465477682787}, {latitude: 36.15030098982796, longitude: -95.94671686621788}
        ],
        tags: ['westby hall', 'all'],
    },
    {
        name: "Collins Hall",
        color: ADMIN_COLOR,
        coords: [
            {latitude: 36.1502546285302, longitude: -95.94723815756743}, {latitude: 36.150255054543315, longitude: -95.94712142086452}, 
            {latitude: 36.15025126437444, longitude: -95.9471220914167}, {latitude: 36.15025180582716, longitude: -95.94706978834526}, 
            {latitude: 36.15025722035401, longitude: -95.94707045889744}, {latitude: 36.15025830325934, longitude: -95.94701748527382}, 
            {latitude: 36.15025234727985, longitude: -95.94701748527382}, {latitude: 36.150254513090616, longitude: -95.94686191716389}, 
            {latitude: 36.15018466566313, longitude: -95.94686057605949}, {latitude: 36.1501862900226, longitude: -95.94667885641383}, 
            {latitude: 36.150159758813466, longitude: -95.94667818586163}, {latitude: 36.15016030026679, longitude: -95.94659771959788}, 
            {latitude: 36.15016842206642, longitude: -95.94659906070225}, {latitude: 36.15016950497297, longitude: -95.94654675763081}, 
            {latitude: 36.150159217360134, longitude: -95.94654608707862}, {latitude: 36.15016030026679, longitude: -95.94637241405934}, 
            {latitude: 36.15014892974592, longitude: -95.94637308461154}, {latitude: 36.15014892974592, longitude: -95.94628188951262}, 
            {latitude: 36.14999461537056, longitude: -95.94628054840825}, {latitude: 36.149993532461586, longitude: -95.94633285147971}, 
            {latitude: 36.149952923364545, longitude: -95.9463321809275}, {latitude: 36.14995184045501, longitude: -95.94647903185887}, 
            {latitude: 36.149993532461586, longitude: -95.94647970241107}, {latitude: 36.149990825189114, longitude: -95.94668623248806}, 
            {latitude: 36.14996700118722, longitude: -95.94668556193585}, {latitude: 36.14996591827787, longitude: -95.94674926439468}, 
            {latitude: 36.14991285570152, longitude: -95.94674859384247}, {latitude: 36.149912314246485, longitude: -95.94682570734524}, 
            {latitude: 36.14996862555123, longitude: -95.94682637789742}, {latitude: 36.149969167005885, longitude: -95.94687599876009}, 
            {latitude: 36.149993532461586, longitude: -95.9468753282079}, {latitude: 36.149992449552606, longitude: -95.94705235398816}, 
            {latitude: 36.14995454772883, longitude: -95.94705302454037}, {latitude: 36.14995400627407, longitude: -95.94719249939754}, 
            {latitude: 36.14999786409737, longitude: -95.94719182884535}, {latitude: 36.149997322642896, longitude: -95.94724815522999}, 
            {latitude: 36.1500904527549, longitude: -95.94725016688658}, {latitude: 36.150091535662526, longitude: -95.9471710417272}, 
            {latitude: 36.15011698398748, longitude: -95.9471717122794}, {latitude: 36.15011590108021, longitude: -95.94725150799098}, 
            {latitude: 36.150211738316344, longitude: -95.94725284909536}, {latitude: 36.15021227976931, longitude: -95.94723742639482}
        ],
        tags: ['collins hall', 'administration', 'all'],
    },
    {
        name: "Fisher South",
        color: DORM_COLOR,
        coords: [
            {latitude: 36.150314614315036, longitude: -95.94776448050031}, {latitude: 36.15031407286278, longitude: -95.94769608417613}, 
            {latitude: 36.15029837074525, longitude: -95.94769675472833}, {latitude: 36.15029782929286, longitude: -95.94767864981897}, 
            {latitude: 36.150306492530575, longitude: -95.94767730871459}, {latitude: 36.150306492530575, longitude: -95.94761628846457}, 
            {latitude: 36.150181958396615, longitude: -95.94761628846457}, {latitude: 36.15018141694343, longitude: -95.94760287742061}, 
            {latitude: 36.15011427671913, longitude: -95.9476035479728}, {latitude: 36.150115359626426, longitude: -95.94759416024202}, 
            {latitude: 36.149980537552686, longitude: -95.94759483079423}, {latitude: 36.149979454643535, longitude: -95.94761695901676}, 
            {latitude: 36.14992097752662, longitude: -95.94761695901676}, {latitude: 36.14992043607163, longitude: -95.94768937865415}, 
            {latitude: 36.14990744115075, longitude: -95.94769004920636}, {latitude: 36.14990798260583, longitude: -95.94769004920636}, 
            {latitude: 36.149906899695665, longitude: -95.94772961178602}, {latitude: 36.14989661204837, longitude: -95.94772894123383}, 
            {latitude: 36.149898236413826, longitude: -95.94785500504706}, {latitude: 36.14990798260583, longitude: -95.94785500504706}, 
            {latitude: 36.14990744115075, longitude: -95.947939494624}, {latitude: 36.14992043607163, longitude: -95.94809170997296}, 
            {latitude: 36.14996916700576, longitude: -95.94809170997296}, {latitude: 36.14996808409643, longitude: -95.94808098113778}, 
            {latitude: 36.149982161916384, longitude: -95.94808098113778}, {latitude: 36.14998270337096, longitude: -95.94810377991251}, 
            {latitude: 36.15003847317101, longitude: -95.94810310936032}, {latitude: 36.15003901462517, longitude: -95.947939494624}, 
            {latitude: 36.15007799931595, longitude: -95.9479401651762}, {latitude: 36.15007908222375, longitude: -95.94781074860198}, 
            {latitude: 36.150181958396615, longitude: -95.94781007804978}, {latitude: 36.15018249984981, longitude: -95.94776313939593}
        ],
        tags: ['fisher south', 'dorm', 'all'],
    },
    {
        name: "Fisher Suites",
        color: DORM_COLOR,
        coords: [
            {latitude: 36.150601446240245, longitude: -95.94908446744611}, {latitude: 36.15060015844716, longitude: -95.94901269915609}, 
            {latitude: 36.15057569037451, longitude: -95.9490111043052}, {latitude: 36.15057569037451, longitude: -95.94888192138313}, 
            {latitude: 36.150553797882004, longitude: -95.94888351623403}, {latitude: 36.15055508567585, longitude: -95.94885161921623}, 
            {latitude: 36.15059629506777, longitude: -95.94885161921623}, {latitude: 36.15059629506777, longitude: -95.94877666122441}, 
            {latitude: 36.15057569037451, longitude: -95.94877506637351}, {latitude: 36.15057569037451, longitude: -95.94874157450484}, 
            {latitude: 36.150597582860925, longitude: -95.94874157450484}, {latitude: 36.15059500727462, longitude: -95.94866980621481}, 
            {latitude: 36.15057440258102, longitude: -95.94866661651302}, {latitude: 36.15057569037451, longitude: -95.94863152979346}, 
            {latitude: 36.15041214042977, longitude: -95.94863631434613}, {latitude: 36.15041214042977, longitude: -95.94866342681125}, 
            {latitude: 36.150394111281116, longitude: -95.94866502166214}, {latitude: 36.15039282348462, longitude: -95.94874157450484},
            {latitude: 36.15041342822593, longitude: -95.94874157450484}, {latitude: 36.15041342822593, longitude: -95.94877187667174}, 
            {latitude: 36.150394111281116, longitude: -95.94877347152264}, {latitude: 36.15039282348462, longitude: -95.94885321406713}, 
            {latitude: 36.15041214042977, longitude: -95.94885161921623}, {latitude: 36.15041214042977, longitude: -95.94887873168135}, 
            {latitude: 36.15039282348462, longitude: -95.94888192138313}, {latitude: 36.150394111281116, longitude: -95.94896166392762}, 
            {latitude: 36.15041214042977, longitude: -95.94896006907673}, {latitude: 36.15041085263357, longitude: -95.94900313005076}, 
            {latitude: 36.15037221873793, longitude: -95.94900472490164}, {latitude: 36.15037093094106, longitude: -95.94908606229701}
        ],
        tags: ['fisher suites', 'fisher west', 'west', 'suites', 'dorm', 'all'],
    },
    {
        name: "Fisher East",
        color: ADMIN_COLOR,
        coords: [
            {latitude: 36.150609172998315, longitude: -95.94816742818456}, {latitude: 36.15060788520536, longitude: -95.94807811653473}, 
            {latitude: 36.150582129341736, longitude: -95.94807652168383}, {latitude: 36.150582129341736, longitude: -95.94804940921871}, 
            {latitude: 36.150604021826354, longitude: -95.94805100406961}, {latitude: 36.1506027340333, longitude: -95.94796807182335}, 
            {latitude: 36.15058470492848, longitude: -95.94796807182335}, {latitude: 36.150583417135124, longitude: -95.94793617480555}, 
            {latitude: 36.1506027340333, longitude: -95.94793457995465}, {latitude: 36.150601446240245, longitude: -95.94785802711196}, 
            {latitude: 36.15056410023219, longitude: -95.94785962196283}, {latitude: 36.15056410023219, longitude: -95.94782772494504}, 
            {latitude: 36.150583417135124, longitude: -95.94782772494504}, {latitude: 36.15058470492848, longitude: -95.94770332657566}, 
            {latitude: 36.15060788520536, longitude: -95.94770492142653}, {latitude: 36.15061046079124, longitude: -95.94762517888205}, 
            {latitude: 36.15055691349019, longitude: -95.94762454407109}, {latitude: 36.15055691349019, longitude: -95.9476218618623}, 
            {latitude: 36.150385814914706, longitude: -95.9476205207579}, {latitude: 36.15038527346293, longitude: -95.94769495205188}, 
            {latitude: 36.150425882336116, longitude: -95.94769562260406}, {latitude: 36.1504247994331, longitude: -95.94774792567551}, 
            {latitude: 36.15040584862798, longitude: -95.94774792567551}, {latitude: 36.1504063900796, longitude: -95.94782705083489}, 
            {latitude: 36.1504247994331, longitude: -95.94782638028269}, {latitude: 36.1504242579816, longitude: -95.947857896236}, 
            {latitude: 36.150405307176335, longitude: -95.94785722568379}, {latitude: 36.150403682821384, longitude: -95.94793232752998}, 
            {latitude: 36.150425882336116, longitude: -95.94793299808217}, {latitude: 36.15042534088459, longitude: -95.94796451403548}, 
            {latitude: 36.1504063900796, longitude: -95.94796518458767}, {latitude: 36.150405307176335, longitude: -95.94804296864264}, 
            {latitude: 36.1504247994331, longitude: -95.94804229809044}, {latitude: 36.1504247994331, longitude: -95.94807783735693}, 
            {latitude: 36.15038906362532, longitude: -95.94807783735693}, {latitude: 36.15038906362532, longitude: -95.94816702079927}
        ],
        tags: ['fisher east', 'admin', 'all'],
    },
    {
        name: "Pat Case Dining Center",
        color: UNIV_COLOR,
        coords: [
            {latitude: 36.150601685536095, longitude: -95.94863231337524}, {latitude: 36.15060245126245, longitude: -95.94851282706965}, 
            {latitude: 36.15061470288281, longitude: -95.94843411783658}, {latitude: 36.15069969844656, longitude: -95.94843411783658}, 
            {latitude: 36.15069969844656, longitude: -95.94827290615444}, {latitude: 36.15067859124557, longitude: -95.94827133016338}, 
            {latitude: 36.150679132695345, longitude: -95.94824517862764}, {latitude: 36.15064989440319, longitude: -95.94824651973205}, 
            {latitude: 36.15065043585313, longitude: -95.94823780255346}, {latitude: 36.150617407399096, longitude: -95.94823780255346}, 
            {latitude: 36.15061686594892, longitude: -95.94816873567707}, {latitude: 36.15038439107587, longitude: -95.94816830339822},
            {latitude: 36.15038439107587, longitude: -95.94819914879933}, {latitude: 36.15026473013929, longitude: -95.94819914879933},
            {latitude: 36.15026310577811, longitude: -95.94816025677274}, {latitude: 36.15002703207787, longitude: -95.94815958622053}, 
            {latitude: 36.15002757353214, longitude: -95.94851900219868}, {latitude: 36.15037843510266, longitude: -95.94851967275088}, 
            {latitude: 36.150378976559374, longitude: -95.94863634883822}
        ],
        tags: ['pat case dining center', 'pcdc', 'dining', 'food', 'all'],
    },
    {
        name: "Physical Plant",
        color: ADMIN_COLOR,
        coords: [
            {latitude: 36.15067754035221, longitude: -95.94601184617325}, {latitude: 36.15067699890245, longitude: -95.94588108849463}, 
            {latitude: 36.1506905351455, longitude: -95.94588041794242}, {latitude: 36.1506905351455, longitude: -95.94580464554406}, 
            {latitude: 36.15067862325175, longitude: -95.94580464554406}, {latitude: 36.15067862325175, longitude: -95.94563700749455}, 
            {latitude: 36.15069486674279, longitude: -95.94563834859895}, {latitude: 36.150694325293124, longitude: -95.94558068110993}, 
            {latitude: 36.15068349629942, longitude: -95.94557934000552}, {latitude: 36.15068349629942, longitude: -95.94552569582969}, 
            {latitude: 36.15069486674279, longitude: -95.94552435472528}, {latitude: 36.150694325293124, longitude: -95.94530843691753}, 
            {latitude: 36.15068457919921, longitude: -95.94530843686229}, {latitude: 36.15068457919921, longitude: -95.94524272274688}, 
            {latitude: 36.15069432529351, longitude: -95.94524272274688}, {latitude: 36.15069432529351, longitude: -95.94498858346385}, 
            {latitude: 36.150066994325485, longitude: -95.94498710142247}, {latitude: 36.150066994325485, longitude: -95.94516010388956}, 
            {latitude: 36.150525604512005, longitude: -95.94516211554613}, {latitude: 36.150525063061195, longitude: -95.94531030758189}, 
            {latitude: 36.150538599330446, longitude: -95.94530963702968}, {latitude: 36.150538057879736, longitude: -95.94549537998854}, 
            {latitude: 36.150483912788275, longitude: -95.94549403888414}, {latitude: 36.15048337133716, longitude: -95.9456355253979}, 
            {latitude: 36.14989968486902, longitude: -95.94563351375321}, {latitude: 36.149898601958725, longitude: -95.94580651622032}, 
            {latitude: 36.15048445424295, longitude: -95.94580785734001}, {latitude: 36.15048445424295, longitude: -95.94601103465601}
        ],
        tags: ['physical plant', 'pp', 'all'],
    },
    {
        name: "Lorton Hall",
        color: EDUC_COLOR,
        coords: [
            {latitude: 36.15154936926564, longitude: -95.94817893140035}, {latitude: 36.151552617928054, longitude: -95.94804347985635}, 
            {latitude: 36.15146382110716, longitude: -95.94804079764756}, {latitude: 36.15146490399583, longitude: -95.94792009825193}, 
            {latitude: 36.15156344680177, longitude: -95.94792278046071}, {latitude: 36.15156452968906, longitude: -95.94780744548265}, 
            {latitude: 36.15147898154712, longitude: -95.94780610437826}, {latitude: 36.15147799193827, longitude: -95.94765657123808}, 
            {latitude: 36.151346962323096, longitude: -95.9476538890293}, {latitude: 36.151346420877935, longitude: -95.947686746087}, 
            {latitude: 36.15133667486467, longitude: -95.947686746087}, {latitude: 36.151331260412356, longitude: -95.94826476208168}, 
            {latitude: 36.15146283149811, longitude: -95.94826811484268}, {latitude: 36.15146337294245, longitude: -95.94817759029593}
        ],
        tags: ['lorton hall', 'education', 'english', 'psychology', 'all'],
    },
    {
        name: "Alexander Health Center",
        color: UNIV_COLOR,
        coords: [
            {latitude: 36.15355404616125, longitude: -95.94638872785532}, {latitude: 36.153551749068676, longitude: -95.946066304491}, 
            {latitude: 36.153455271119654, longitude: -95.94606440788297}, {latitude: 36.153454505421166, longitude: -95.9461488069401}, 
            {latitude: 36.15343383155931, longitude: -95.9461488069401}, {latitude: 36.15343230016192, longitude: -95.94612699594782}, 
            {latitude: 36.15341086059529, longitude: -95.94612699594782}, {latitude: 36.15341086059529, longitude: -95.9461488069401}, 
            {latitude: 36.1533855925271, longitude: -95.94614691033209}, {latitude: 36.153384826827924, longitude: -95.94638872785532}
        ],
        tags: ['alexander health center', 'medicine', 'all'],
    },
    {
        name: "Tyrell hall",
        color: EDUC_COLOR,
        coords: [
            {latitude: 36.151609969946094, longitude: -95.94716634730229}, {latitude: 36.151609969946094, longitude: -95.94661381229115}, 
            {latitude: 36.15149734965314, longitude: -95.94661381229115}, {latitude: 36.15149734965314, longitude: -95.94716634730229}
        ],
        tags: ['tyrell hall', 'all'],
    }
];

type BuildingProps = {
    color: string
    coords: LatLng[]
    name: string
    setVisible: (event: React.SetStateAction<boolean>) => void
    setData: (event: React.SetStateAction<BuildingData>) => void
    visible?: boolean
}

export const Building: FC<BuildingProps> = ({color, coords, name, visible, setData, setVisible}) => {
    return (
        <Polygon 
            coordinates={coords}
            fillColor={color}
            strokeWidth={0.00001}
            strokeColor={color}
            onPress={() => {
                for (var val of buildingMap) {
                    if (val.name == name) {
                        setData(val);
                    }
                }
                setVisible(!visible);
            }}
        />
    )
}
    
type BuildingListProps = {
    setVisible: (event: React.SetStateAction<boolean>) => void
    visible: boolean
    buildingData: BuildingData
}
    
export const BuildingList: FC<BuildingListProps> = ({setVisible, visible, buildingData}) => {
    
    const [dataState, setDataState] = useState<BuildingData>({name: "", color: 'black', coords: [], tags: ['']})

    return (
        <View>
        <Modal
            animationIn={'slideInLeft'}
            animationOut={'slideOutLeft'}
            onBackdropPress={() => setVisible(false)}
            backdropOpacity={0}
            isVisible={visible}
        >
            <View style={styles.infoView}>
                <View style={styles.buttonRow}>

                    <View style={styles.button}>
                        <Button 
                            onPress={() => {
                                setVisible(!visible)
                            }} 
                            title={'Close'}
                        />
                        <Text 
                            numberOfLines={1}
                            adjustsFontSizeToFit={true}
                            style={{fontSize: 50}}
                        >
                            {
                                buildingData.name
                            }
                        </Text>
                        <Text 
                            numberOfLines={1}
                            adjustsFontSizeToFit={true}
                            style={{fontSize: 15}}
                        >
                            {
                                buildingData.code
                            }
                        </Text>
                    </View>

                    <View style={styles.button}>
                        
                    </View>
                </View>
            </View>
        </Modal>
        </View>
        
    ); 
}

const styles = StyleSheet.create({
    buttonPopupPressable: {
      position: 'relative',
      height: 50, 
      width: 50,
      padding: 5,
    },
    eventAddIcon: {
        position: 'relative',
        height: '110%',
        width: '110%'
    },

    infoView: {
        marginTop: 'auto',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        height: '50%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },

    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },

    button: {
        marginRight: '60%',
        width: '100%',
        height: '100%',
    }
});