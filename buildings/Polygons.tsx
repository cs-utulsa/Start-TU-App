import React, { useState, useEffect, FC} from 'react';
import {StyleSheet, Image, Text, View, Pressable, Animated, ScrollView} from 'react-native'
import MapView, { Polygon, Marker, Overlay, PROVIDER_GOOGLE, LatLng } from 'react-native-maps';

const DORM_COLOR = '#103cab'
const APT_COLOR = '#4D81F0'
const EDUC_COLOR = '#ff4040'
const ADMIN_COLOR = '#930700'
const SPORTS_COLOR = '#E3c759'
const PRAY_COLOR = '#9EAFB1'
const FRAT_COLOR = '#89CFF0'
const SORO_COLOR = '#F4C2C2'

const Building = ({color}: any, {coords}: any) => {
    return (
        <Polygon 
            coordinates={coords}
            fillColor={color}
            strokeWidth={0.00001}
            holes={[[{latitude: 0.0, longitude: 0.0}, {latitude: 0.00000000001, longitude: 0.00000000001}]]}
        />
    )
}

export const BuildingList = () => {
    return (
        <MapView>
        
        {/* Keplinger Hall */}
        <Building 
            color={EDUC_COLOR} 
            coords={[
                {latitude: 36.154399370636966, longitude: -95.94231245481298},{latitude: 36.154399370636966, longitude: -95.94184588923831},{latitude: 36.1537623145845, longitude: -95.94185726888648},
                {latitude: 36.153658179929934, longitude: -95.94173209275668},{latitude: 36.15346216138149, longitude: -95.94173209275668},{latitude: 36.15345909858778, longitude: -95.94219107189925},{latitude: 36.15367043107294, longitude: -95.94220624476347},
                {latitude: 36.15377150292973, longitude: -95.94231245481298}
            ]}
        />

            {/* Rayzor Hall */}
            <Polygon 
              fillColor={EDUC_COLOR} 
              coordinates={[
                {latitude: 36.153297704044455, longitude: -95.94231961606665}, {latitude: 36.15329588289261, longitude: -95.94222263129699}, {latitude: 36.153281313676366, longitude: -95.94222263129699}, 
                {latitude: 36.153281313676366, longitude: -95.94178845529312}, {latitude: 36.153253996388656, longitude: -95.94178845529312}, {latitude: 36.15325217523579, longitude: -95.94177492253456 }, {latitude: 36.15318934543643, longitude: -95.94177492253456}, 
                {latitude: 36.15317659735504, longitude: -95.94178732756325}, {latitude: 36.15304911642732, longitude: -95.94178507210349}, {latitude: 36.15304911642732, longitude: -95.94180762670109}, {latitude: 36.152961700814224, longitude: -95.94191250557994}, 
                {latitude: 36.15293620457538, longitude: -95.94191250557994}, {latitude: 36.152937115155495, longitude: -95.94220120442925}, {latitude: 36.15292527761334, longitude: -95.9421989489695}, {latitude: 36.15292800935401, longitude: -95.94226886822204}, 
                {latitude: 36.15293620457538, longitude: -95.94226886822204}, {latitude: 36.15293529399528, longitude: -95.94231736060689}, {latitude: 36.15320937813155, longitude: -95.94231848833678}, {latitude: 36.15320937813155, longitude: -95.94233540428499}, 
                {latitude: 36.15328313482854, longitude: -95.94233653201488}, {latitude: 36.153284955980695, longitude: -95.94231961606665}
              ]}
              holes={[[
                {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
              ]]}
            />
      
            {/* John Mabee Hall */}
            <Polygon 
              strokeWidth={0.1} 
              fillColor={DORM_COLOR} 
              coordinates={[
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
              ]} 
              // holes={[[
              //   {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153412562806324, longitude: -95.94872716477444}, 
              //   {latitude: 36.15321360565575, longitude: -95.94872397507265}, {latitude: 36.15321231790557, longitude: -95.94868490122583}, {latitude: 36.15315758850287, longitude: -95.94868809092762}, {latitude: 36.153155656876194, longitude: -95.94865380163345},
              //   {latitude: 36.15308740603646, longitude: -95.948653004208}, {latitude: 36.1530861182842, longitude: -95.94869925488385}, {latitude: 36.153053280594335, longitude: -95.9486984574584}, {latitude: 36.153053280594335, longitude: -95.9488435888895}
              // ]]}
                holes={[[
                  {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
                ]]}
            />

            {/* Champman Hall */}
            <Polygon 
              strokeWidth={0.1} 
              fillColor={EDUC_COLOR} 
              coordinates={[
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
              ]}
              holes={[[
                {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
              ]]}
            />

            {/* Mary K. Chapman Center */}
            <Polygon 
            strokeWidth={0.1}
              coordinates={[
                {latitude: 36.15352176536669, longitude: -95.94844568202697}, 
                {latitude: 36.15352176536669, longitude: -95.94799257498467}, {latitude: 36.15345369903913, longitude: -95.94798956430665}, 
                {latitude: 36.153451268097754, longitude: -95.9480106390528}, {latitude: 36.15341601943953, longitude: -95.94801214439183}, 
                {latitude: 36.153414803968275, longitude: -95.94803020845994}, {latitude: 36.153386848124185, longitude: -95.94803020845994}, 
                {latitude: 36.153381986237235, longitude: -95.94829213744785}, {latitude: 36.153270162754296, longitude: -95.94829063210882}, 
                {latitude: 36.1532713782278, longitude: -95.9483794471105}, {latitude: 36.15329811863999, longitude: -95.9483794471105}, 
                {latitude: 36.15329933411306, longitude: -95.94840052185664}, {latitude: 36.153326074515704, longitude: -95.94840353253467}, 
                {latitude: 36.15332850546095, longitude: -95.94842159660281}, {latitude: 36.15335281490924, longitude: -95.94842159660281}, 
                {latitude: 36.15335646132582, longitude: -95.94844417668796}
              ]}
              holes={[[
                {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
              ]]}
            />

            {/* Pike */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={FRAT_COLOR}
              coordinates={[
                {latitude: 36.15116685117342, longitude: -95.94423022653353}, {latitude: 36.151170564386845, longitude: -95.94372207952603}, 
                {latitude: 36.15105081316508, longitude: -95.94372552848762}, {latitude: 36.151046171641184, longitude: -95.94392211929821}, 
                {latitude: 36.15101089605051, longitude: -95.94392211929821}, {latitude: 36.15101182435575, longitude: -95.94403248606906}, 
                {latitude: 36.151051741469814, longitude: -95.94403248606906}, {latitude: 36.151051741469814, longitude: -95.9442279272258}
              ]}
              holes={[[
                {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
              ]]}
            />

            {/* McClure */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={ADMIN_COLOR}
              coordinates={[{latitude: 36.151336598493224, longitude: -95.94743438829745}, {latitude: 36.15133730404892, longitude: -95.94715826916898}, 
                {latitude: 36.15114186488037, longitude: -95.94715739537425}, {latitude: 36.15114115932294, longitude: -95.94714865742716}, 
                {latitude: 36.15106989798803, longitude: -95.94714778363243}, {latitude: 36.15106778131373, longitude: -95.94725788176596}, 
                {latitude: 36.15098805320587, longitude: -95.94725788176584}, {latitude: 36.1509852309705, longitude: -95.94758555478221}, 
                {latitude: 36.151137631534766, longitude: -95.94758555478221}, {latitude: 36.15113833709225, longitude: -95.9475584671462}, 
                {latitude: 36.151158798257, longitude: -95.94755759335142}, {latitude: 36.151159503814284, longitude: -95.94743176691314}
              ]}
              holes={[[
                {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
              ]]}
            />

            {/* United Methodist Church */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={PRAY_COLOR}
            coordinates={[{latitude: 36.15416877898395, longitude: -95.94673030798657}, {latitude: 36.15417202387157, longitude: -95.9462781960352}, 
              {latitude: 36.15384104464297, longitude: -95.9462741772623}, {latitude: 36.15384266709358, longitude: -95.94622997076038}, 
              {latitude: 36.15378750375412, longitude: -95.94622796137395}, {latitude: 36.15378912620582, longitude: -95.94626011155715}, 
              {latitude: 36.15377290168717, longitude: -95.94626011155715}, {latitude: 36.15377127923514, longitude: -95.9464047873816}, 
              {latitude: 36.15378425885058, longitude: -95.9464047873816}, {latitude: 36.15378588130236, longitude: -95.94645703142929}, 
              {latitude: 36.15384428954413, longitude: -95.94645301265639}, {latitude: 36.15384428954413, longitude: -95.94639875922222}, 
              {latitude: 36.153990309958225, longitude: -95.94639875922222}, {latitude: 36.15398868751067, longitude: -95.94647712529381}, 
              {latitude: 36.15405196294031, longitude: -95.94647913468025}, {latitude: 36.15405358538654, longitude: -95.94659768848084}, 
              {latitude: 36.15377939149503, longitude: -95.94659567909437}, {latitude: 36.15378101394692, longitude: -95.94672628921367}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />

            {/* West Village 1 */}
            <Polygon
            strokeWidth={0.1}
            fillColor={APT_COLOR}
            coordinates={[{latitude: 36.154548880526676, longitude: -95.94881518718397}, {latitude: 36.15454647290945, longitude: -95.94869144110841}, 
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
            ]}
              holes={[[
                {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
              ]]}
            />

            {/* West Village 2 */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={PRAY_COLOR}
            coordinates={[

            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />

            {/* Hardesty Hall */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={DORM_COLOR}
            coordinates={[
              {latitude: 36.153655046182635, longitude: -95.94479439947533}, {latitude: 36.153655046182635, longitude: -95.9442177245923}, 
              {latitude: 36.15339082828421, longitude: -95.94422308900982}, {latitude: 36.153386496835815, longitude: -95.94441352583165}, 
              {latitude: 36.153493832710474, longitude: -95.94441233453934}, {latitude: 36.153492628885665, longitude: -95.94455248068232}, 
              {latitude: 36.15310018101423, longitude: -95.94455546251514}, {latitude: 36.15309980541543, longitude: -95.94439414747659}, 
              {latitude: 36.15308770162368, longitude: -95.94439664585369}, {latitude: 36.15308568432489, longitude: -95.94431045184417}, 
              {latitude: 36.153100814064636, longitude: -95.94429296320455}, {latitude: 36.153100814064636, longitude: -95.94425423835969}, 
              {latitude: 36.153083667026024, longitude: -95.94425423835969}, {latitude: 36.153083667026024, longitude: -95.94411557843134}, 
              {latitude: 36.152842599439, longitude: -95.9441168276199}, {latitude: 36.15284461674407, longitude: -95.94464273599678}, 
              {latitude: 36.15293136081248, longitude: -95.94464273599678}, {latitude: 36.152932369463876, longitude: -95.94480263213039}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />

            {/* K Sig */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={FRAT_COLOR}
            coordinates={[
              {latitude: 36.15119060500146, longitude: -95.94359437479582}, {latitude: 36.15119051541939, longitude: -95.943293528552}, 
              {latitude: 36.15106643152878, longitude: -95.94329259721178}, {latitude: 36.151061919383594, longitude: -95.9435934201113}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />

            {/* KA */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={FRAT_COLOR}
            coordinates={[
              {latitude: 36.15120029171758, longitude: -95.94294613860745}, {latitude: 36.15120029171758, longitude: -95.94277570334239}, 
              {latitude: 36.151084480106896, longitude: -95.94277197798141}, {latitude: 36.151082976058866, longitude: -95.94277942870339}, 
              {latitude: 36.151042366751504, longitude: -95.94277942870339}, {latitude: 36.151040110678245, longitude: -95.94315196480187}, 
              {latitude: 36.15110177665699, longitude: -95.94315289614211}, {latitude: 36.15110177665699, longitude: -95.9431631408848}, 
              {latitude: 36.15118224316611, longitude: -95.94316220954458}, {latitude: 36.15118224316611, longitude: -95.94307373222118}, 
              {latitude: 36.151113809037454, longitude: -95.94307466356143}, {latitude: 36.151113809037454, longitude: -95.94300574438321}, 
              {latitude: 36.151181491143035, longitude: -95.94300667572347}, {latitude: 36.151181491143035, longitude: -95.94294427592696}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />

            {/* Lambda */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={FRAT_COLOR}
            coordinates={[
              {latitude: 36.15123789285342, longitude: -95.94250188927067}, {latitude: 36.15123864487596, longitude: -95.94238174637893}, 
              {latitude: 36.151052143068505, longitude: -95.94237895235818}, {latitude: 36.1510491349712, longitude: -95.94271237216631}, 
              {latitude: 36.15117171484286, longitude: -95.94271423484682}, {latitude: 36.151173218889156, longitude: -95.94249909524994}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />

            {/* Sig Nu */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={FRAT_COLOR}
            coordinates={[
              {latitude: 36.1512221003785, longitude: -95.94226998548794}, {latitude: 36.15122059633312, longitude: -95.94199337743481}, 
              {latitude: 36.15113336165186, longitude: -95.94199430877507}, {latitude: 36.15113336165186, longitude: -95.94201386692023}, 
              {latitude: 36.15103259043374, longitude: -95.94201293558}, {latitude: 36.15103334245824, longitude: -95.94225880940499}, 
              {latitude: 36.15113336165186, longitude: -95.94225880940499}, {latitude: 36.15113260962833, longitude: -95.94226998548794}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />

            {/* Sigma Chi */}
            <Polygon 
            strokeWidth={0.1}
            fillColor={FRAT_COLOR}
            coordinates={[
              {latitude: 36.15119126744248, longitude: -95.94192259557609}, {latitude: 36.15119201946545, longitude: -95.94179220794162}, 
              {latitude: 36.15113712176943, longitude: -95.94179220794162}, {latitude: 36.151135617722424, longitude: -95.94157613700449}, 
              {latitude: 36.15103033461836, longitude: -95.94157695685246}, {latitude: 36.15103087606569, longitude: -95.94163596544513}, 
              {latitude: 36.15102113001322, longitude: -95.94163596544513}, {latitude: 36.15102492014487, longitude: -95.94192027957351}
            ]}
            holes={[[
              {latitude: 36.153411918932846, longitude: -95.94884518374039}, {latitude: 36.153411918932846, longitude: -95.94884518374038}
            ]]}
            />
            </MapView>
        
    ); 
}
