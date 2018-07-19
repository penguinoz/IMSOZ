import {collections as CLT} from '/imports/global/collections.js';
import {global} from '/imports/global/global_things.js';

var haveQusetionList = CLT.EnQuestionList.find({qCode:	"TQ0001"}).fetch();
if(haveQusetionList && !haveQusetionList.length){
  var questionItems = [
    {qCode :"TQ0001", type :"DR", subType :"DR0001", hintType :"P", dateTitle :"DT0009", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"나의 직업과 상관없는 꿈이 있다면 무엇인가요?", hint :"나의 꿈은 노래가 필요한 곳에서는 달콤한 목소리를 내는 가수가 되고, 연주가 필요한 곳에서는 마음을 울리는 기타리스타 될거야"},
    {qCode :"TQ0002", type :"DR", subType :"DR0001", hintType :"P", dateTitle :"DT0009", sex :["M","F"], generation :[20,30,40,50], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"일에 대한 꿈이 있다면 무엇인가요?", hint :"IT분야 마케팅 최고 권위자가 되고싶다."},
    {qCode :"TQ0003", type :"DR", subType :"DR0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"어릴적 꿈은 무엇이었나요?", hint :"초등학교때, 편의점 주인이 되고싶었다."},
    {qCode :"TQ0004", type :"DR", subType :"DR0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :90, question :"오늘 당신의 꿈을 위해 무엇을 했나요 ?", hint :"꿈을 다시 기억하고 지금 무엇을 해야 되는지 생각해보기"},
    {qCode :"TQ0005", type :"DR", subType :"DR0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"나만의 좌우명이 있나요?", hint :"하면된다! "},
    {qCode :"TQ0006", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0005", sex :["M"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"군대가던 날 기억하세요 ?", hint :"입대일 / 함께 갔던 사람들 / 입대일의 두려움 ", profileEtc : 'PF0004'},
    {qCode :"TQ0007", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0005", sex :["M"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"제대하던 날 기억하세요 ?", hint :"제대일 / 군대 동기 / 제대하고 가장 먼저 한 일" , profileEtc : 'PF0005'},
    {qCode :"TQ0008", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :90, question :"최근에 나에게 실망했을 때는 언제였나요?", hint :"다이어트한다고 해놓고 또 빵에 손을 댔지…"},
    {qCode :"TQ0009", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :180, question :"최근에 어떤 운동을 하셨나요?", hint :"어제 헬스장에서 웨이트와 유산소를 열심히 했다."},
    {qCode :"TQ0010", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"요즘 당신의 취미는 무엇인가요?", hint :"지난 주에 꽂꽂이를 처음 배웠는데, 너무 재밌다."},
    {qCode :"TQ0011", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :90, question :"최근에 만든 요리는 무엇인가요?", hint :"오늘 아침에 감자 리조또를 만들어보았다."},
    {qCode :"TQ0012", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :90, question :"최근에 어떤 꿈을 꾸셨나요?", hint :"엊그제 돼지꿈을 꿔서 로또를 샀다."},
    {qCode :"TQ0013", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :30, question :"최근 먹었던 가장 맛있는 요리는?", hint :"어제 남편이 해준 스파게티!"},
    {qCode :"TQ0014", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :180, question :"다이어트에 성공한 적이 있나요?", hint :"지난 봄, 운동과 식단조절로 5kg 감량에 성공했다."},
    {qCode :"TQ0015", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :180, question :"가장 최근에 알게되어 기쁜 일이 있었다면?", hint :"오늘아침, 버스비를 현금으로 내면 1300원이라는 것을 알았다."},
    {qCode :"TQ0016", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :180, question :"최근에 억울한 상황이 있었다면 어떤일인가요?", hint :"어제, 택시 아저씨가 길을 헤매서 요금도 많이 나오고 시간도 많이 걸렸다."},
    {qCode :"TQ0017", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :180, question :"요즘 가장 좋아하는 노래는 무엇인가요?", hint :"지난주에 크러쉬가 신곡을 냈다. 녹는당…"},
    {qCode :"TQ0018", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"지난 크리스마스때는 뭐하셨어요?", hint :"집에서 해리포터 시리즈를 봤다. "},
    {qCode :"TQ0019", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"올해 새해 계획이 있다면 무엇이었나요?", hint :"영어공부와 운동이었는데, 음…"},
    {qCode :"TQ0020", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"최근에 기차를 타보셨나요?", hint :"작년 겨울에 기차를 타고 정동진에 가서 해돋이를 보았다."},
    {qCode :"TQ0021", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :180, question :"요즘 자주가는 아지트가 있다면?", hint :"동네에 있는 유미마트에 자주 가고 있다."},
    {qCode :"TQ0022", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :180, question :"최근 아팠던 적이 있다면 언제였나요?", hint :"지난주, 노로바이러스에 걸려서 엄청 고생했다."},
    {qCode :"TQ0023", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :60, question :"오늘 가장 행복한 일은 무엇이었나요?", hint :"점심 메뉴가 기대이상으로 맛있어서 행복했다."},
    {qCode :"TQ0024", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :60, question :"오늘 가장 실망한 일은 무엇이었나요?", hint :"야심차게 고른 와인이 상해있었다.ㅠㅠ"},
    {qCode :"TQ0025", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :60, question :"오늘 가장 뿌듯한 일은 무엇이었나요?", hint :"다이어트중이라 간식을 안먹고 꾹 참았다."},
    {qCode :"TQ0026", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :180, question :"요즘 관심있는 TV 프로가 있다면 무엇인가요?", hint :"밥잘사주는 예쁜누나. 곧 끝난다..ㅠㅠ"},
    {qCode :"TQ0027", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :90, question :"최근에 본 영화는 무엇인가요?", hint :"어제, 데드풀2를 봤는데, 진짜 엄청나게 재밌었다."},
    {qCode :"TQ0028", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["F"], generation :[20,30], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"혹시, 소개팅 해보셨어요? ", hint :"지난주에 키큰 남자와 소개팅을 했다. "},
    {qCode :"TQ0029", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"가장 최근 연주한 악기가 있다면 무엇인가요?", hint :"지난 주말, 오랜만에 피아노를 쳤다."},
    {qCode :"TQ0030", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"꾸준히 즐기는 스포츠가 있나요?", hint :"작년부터 요가를 꾸준히 하고있다."},
    {qCode :"TQ0031", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"최근 도전하고 있는 것이 있다면?", hint :"골프를 치고 있는데, 싱글이 목표다"},
    {qCode :"TQ0032", type :"IM", subType :"IM0001", hintType :"P", dateTitle :"DT0010", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"복권에 당첨된 적이 있으세요?", hint :"한달 전에, 로또 4등에 당첨되었다. 이게 한계인가…^^"},
    {qCode :"TQ0033", type :"IM", subType :"IM0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"최근에 기차를 타보셨나요?", hint :"작년 겨울에 기차를 타고 정동진에 가서 해돋이를 보았다."},
    {qCode :"TQ0034", type :"IM", subType :"IM0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"나의 첫번째 비행 ! 기억이 나나요 ?", hint :"고등학교 수학여행 제도도행 비행기 !! "},
    {qCode :"TQ0035", type :"IM", subType :"IM0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"이번 여름에 가족여행을 간다면 어디로 가고싶으세요?", hint :"동해바다에 가서 푸른 바다를 보고싶다."},
    {qCode :"TQ0036", type :"IM", subType :"IM0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :180, question :"최근에 다녀온 여행에 대해 얘기해주세요.", hint :"지난 달, 처음으로 유럽여행을 다녀왔다."},
    {qCode :"TQ0037", type :"IM", subType :"IM0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"가본 여행지 중 제일 좋았던 곳은 어디인가요?", hint :"신혼여행지였던 몰디브! 천국이었다."},
    {qCode :"TQ0038", type :"IM", subType :"IM0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"가장 기억에 남는 여행이 있었다면?", hint :"대학 때 아르바이트해서 모은 돈으로 갔던 첫 배낭여행."},
    {qCode :"TQ0039", type :"IM", subType :"IM0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"최악의 여행지는 어디였나요?", hint :"작년 여름에 갔던 도쿄. 친구랑 대판싸웠다…"},
    {qCode :"TQ0040", type :"IM", subType :"IM0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"여행지에서 만난 특별한 인연이 있나요?", hint :"작년 겨울, 독일 출장에서 하석진씨를 만났다!"},
    {qCode :"TQ0041", type :"IM", subType :"IM0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"가장 가고싶은 여행지는 어디인가요?", hint :"스위스에 가보고싶다."},
    {qCode :"TQ0042", type :"IM", subType :"IM0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"가족여행을 하신 적이 있나요?", hint :"지난 여름, 동해로 가족여행을 다녀왔다."},
    {qCode :"TQ0043", type :"IM", subType :"IM0003", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"부모님께 받았던 최고의 칭찬은 무엇이었나요?", hint :"지난 달 어머니 환갑때 내 자식이어서 고맙다고 하셨다."},
    {qCode :"TQ0044", type :"IM", subType :"IM0003", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"형제/자매와 다퉜던 적이 있나요?", hint :"어제 동생이 또 내 옷을 몰래 입고나가서 싸웠다."},
    {qCode :"TQ0045", type :"IM", subType :"IM0003", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"형제/자매에게 미안한 일이 있다면 무엇인가요?", hint :"어제 언니 옷을 몰래 입고나갔는데, 떡볶이를 흘렸다…"},
    {qCode :"TQ0046", type :"IM", subType :"IM0003", hintType :"P", dateTitle :"DT0008", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"당신의 결혼식!! 기억이 나나요 ?", hint :"결혼기념일 / 혼식장 / 사회자 / 주례 / 그날의 기억", profileEtc :"PF0001"},
    {qCode :"TQ0047", type :"IM", subType :"IM0003", hintType :"P", dateTitle :"DT0003", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"엄마 생일은 알고 있나요 ?", hint :"최근 엄마 생일에 무엇을 하셨나요 ?", profileEtc :"PF0002"},
    {qCode :"TQ0048", type :"IM", subType :"IM0003", hintType :"P", dateTitle :"DT0002", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"아버지 생일은 알고 있나요 ?", hint :"보통 아버지 생신에는 무엇을 하나요 ?", profileEtc :"PF0003"},
    {qCode :"TQ0049", type :"IM", subType :"IM0006", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"요즘 가장 관심있는 사람은 누구인가요?", hint :"회사에 새로 입사한 유바비대리. 내스타일이다!"},
    {qCode :"TQ0050", type :"IM", subType :"IM0004", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"가장 보고싶은 친구는 누구인가요?", hint :"미국으로 이민간 친구, 3년전에 만나고 못만났다."},
    {qCode :"TQ0051", type :"IM", subType :"IM0004", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :30, question :"가장 최근에 만난 친구는 누구인가요?", hint :"지난 주말, 고등학교 동창을 만나 폭풍수다를 떨었다."},
    {qCode :"TQ0052", type :"IM", subType :"IM0004", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"지금 가장 생각나는 친구는 누구인가요?", hint :"중, 고등학교 동창인 친구. 6년동안 매일 붙어다녔는데,,"},
    {qCode :"TQ0053", type :"IM", subType :"IM0004", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :90, question :"친구와 나만 아는 비밀이 있다면?", hint :"중학교때 야구하다 학교 창문 깨먹은 것. 아직도 우리 둘만의 비밀"},
    {qCode :"TQ0054", type :"IM", subType :"IM0005", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :180, question :"요즘 가장 자주 만나는 사람들은 누구인가요?", hint :"지난 주말에 동창회 모임을 했다. 매달 만나고 있다."},
    {qCode :"TQ0055", type :"IM", subType :"IM0005", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :180, question :"가장 최근 회식은 언제였나요?", hint :"지난주 목요일에 회사 동료들과 상사를 술안주삼아 회식했다."},
    {qCode :"TQ0056", type :"IM", subType :"IM0005", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :180, question :"가장 즐거운 모임이 있다면?", hint :"고등학교 친구들 모임, 지난 달 모임은 특히 재밌었다."},
    {qCode :"TQ0057", type :"SC", subType :"SC0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"학창시절, 가장 잘한 일이 있다면?", hint :"중학교때 전교회장 선거에 출마한 일"},
    {qCode :"TQ0058", type :"SC", subType :"SC0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"기억에 남는 스승의 날이 있나요?", hint :"친구들과 정성껏 준비한 스승의날 이벤트에 선생님이 우셨다."},
    {qCode :"TQ0059", type :"SC", subType :"SC0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"가장 무서웠던 선생님이 있다면?", hint :"지각해서 학주선생님께 엄청 혼나고 펑펑 울었다."},
    {qCode :"TQ0060", type :"SC", subType :"SC0003", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"혹시 수학여행 때 기억나세요?", hint :"수학여행은 역시 경주지. 선생님 몰래 밤새 놀았는데"},
    {qCode :"TQ0061", type :"SC", subType :"SC0004", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"학창시절, 기억에 남는 짝꿍이 있나요?", hint :"초등학교 1학년때 짝꿍이 맘에 안들어서 울었던 기억이 있다."},
    {qCode :"TQ0062", type :"CR", subType :"CR0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :180, question :"요즘 업무에 대한 가장 큰 고민이 있다면?", hint :"신입사원이 일을 너무 못한다"},
    {qCode :"TQ0063", type :"CR", subType :"CR0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"지금 하는 일은 언제부터 시작하셨나요?", hint :"입사 첫날 그 긴장감은 말도못했지."},
    {qCode :"TQ0064", type :"CR", subType :"CR0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"신입사원 때 기억나세요?", hint :"어리버리의 끝판왕이었지. 상사한테 혼나서 눈물콧물 빼던 시절."},
    {qCode :"TQ0065", type :"CR", subType :"CR0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"직업상 애로사항이 있다면?", hint :"외부 회의가 많아서 늘 바쁘다"},
    {qCode :"TQ0066", type :"CR", subType :"CR0003", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"출장가서 있었던 가장 기억나는 에피소드 ?", hint :"노트북을 잃어버려서 ㅠㅠ 완전 엉망진창이 되었었는데 …"},
    {qCode :"TQ0067", type :"CR", subType :"CR0002", hintType :"P", dateTitle :"DT0006", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"당신의 첫번째 직장은 어디인가요 ? ", hint :"직장명 / 입사일 / 위치 / 첫 출근의 기억 "},
    {qCode :"TQ0068", type :"CR", subType :"CR0002", hintType :"P", dateTitle :"DT0006", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"당신의 두번째 직장은 어디인가요 ?", hint :"직장명 / 입사일 / 위치 / 첫 출근의 기억 "},
    {qCode :"TQ0069", type :"CR", subType :"CR0002", hintType :"P", dateTitle :"DT0006", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"당신의 세번째 직장은 어디인가요 ?", hint :"직장명 / 입사일 / 위치 / 첫 출근의 기억 "},
    {qCode :"TQ0070", type :"CR", subType :"CR0002", hintType :"P", dateTitle :"DT0006", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"당신의 네번째 직장은 어디인가요 ?", hint :"직장명 / 입사일 / 위치 / 첫 출근의 기억 "},
    {qCode :"TQ0071", type :"CR", subType :"CR0002", hintType :"P", dateTitle :"DT0006", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"당신의 다섯번째 직장은 어디인가요 ?", hint :"직장명 / 입사일 / 위치 / 첫 출근의 기억 "},
    {qCode :"TQ0072", type :"BD", subType :"BD0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :60, question :"최근 자녀가 자랑스러웠을 때는 언제인가요?", hint :"유치원 때 어버이날, 카네이션을 달아줬을 때."},
    {qCode :"TQ0073", type :"BD", subType :"BD0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :60, question :"최근 자녀때문에 속상했을 때는 언제인가요?", hint :"지난 주, 중2가 되더니 말로 가슴에 못을 박는다…ㅠ"},
    {qCode :"TQ0074", type :"BD", subType :"BD0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"기억에 남는 자녀의 생일이 있었나요?", hint :"아무래도 첫 생일인 돌잔치가 기억에 남는다."},
    {qCode :"TQ0075", type :"BD", subType :"BD0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"자녀가 돌잡이에서 잡은 물건은 무엇이었나요?", hint :"청진기를 잡기를 기대했는데, 마이크를 잡았다."},
    {qCode :"TQ0076", type :"BD", subType :"BD0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"돌아오는 자녀의 생일에 어떤 선물을 할 계획이세요?", hint :"다음달, 딸의 생일에 BTS 콘서트표를 구해줄 예정이다."},
    {qCode :"TQ0077", type :"BD", subType :"BD0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"자녀가 어떤사람으로 성장하기를 바라시나요?", hint :"남에게 좋은 영향을 끼칠 수 있는 사람"},
    {qCode :"TQ0078", type :"BD", subType :"BD0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"반려동물을 처음 만난 날은 언제인가요?", hint :"우리 댕댕이와 처음 만난 날"},
    {qCode :"TQ0079", type :"BD", subType :"BD0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"반려동물때문에 가장 속상했던 날이 있었나요?", hint :"실수로 발을 밟아서 강아지가 엄청 울었어요ㅠㅠ"},
    {qCode :"TQ0080", type :"BD", subType :"BD0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :30, question :"최근 반려동물과 산책을 함께한건 언제였나요?", hint :"주말에 날씨가 너무 좋아서 공원을 10바퀴나 돌았다."},
    {qCode :"TQ0081", type :"BD", subType :"BD0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :30, question :"가장 최근에 찍은 반려동물 사진은?", hint :"어제 저녁, 늘어지게 자고 있는게 너무 귀여워서 한컷!"},
    {qCode :"TQ0082", type :"TC", subType :"TC0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"1년 후 나에게 꼭 해주고 싶은 말이 있다면?", hint :"힘든시간 잘 이겨내줘서 대견해!"},
    {qCode :"TQ0083", type :"TC", subType :"TC0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :90, question :"한달 후 나에게 꼭 해주고 싶은 말이 있다면?", hint :"힘든시간 잘 이겨내줘서 대견해!"},
    {qCode :"TQ0084", type :"TC", subType :"TC0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :180, question :"다가오는 기념일이 있나요?", hint :"한살 더 먹었구나. 또 일년을 잘 살아줘서 고마워."},
    {qCode :"TQ0085", type :"TC", subType :"TC0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"내년 새해 첫날에 나에게 해주고싶은 말이 있다면?", hint :"넌 영어공부와 운동을 새해계획에 넣을거야, 그치?"},
    {qCode :"TQ0086", type :"TC", subType :"TC0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :90, question :"1주일 후, 친구의 미래를 예언해준다면?", hint :"친구야. 너 계속 그렇게 먹으면 2kg는 찔거 같아."},
    {qCode :"TQ0087", type :"TC", subType :"TC0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[10,20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :365, question :"한달 후, 친구의 미래를 예언해준다면?", hint :"친구야. 너 계속 그렇게 먹으면 10kg는 찔거 같아."},
    {qCode :"TQ0088", type :"TC", subType :"TC0002", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"자녀가 성년이 되면 어떤 말을 해주고 싶으세요?", hint :"너도 이제 성인이구나. 너의 인생은 오로지 너에게 달려있다."},
    {qCode :"TQ0089", type :"EN", subType :"EN0001", hintType :"V", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"미리 유서를 써본다면 ? ", hint :"ㅇ 삶을 뒤돌아보니-ㅇ 희망 묘비명 - ㅇ 상속 - 첫번째 아들 누구에게는 ㅇ 기부 - ㅇ 장기기증 - ㅇ 유언 집행자 / 관계- "},
    {qCode :"TQ0090", type :"EN", subType :"EN0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"생의 마지막 순간, 누가 가장 생각날까요?", hint :"엄마. 그동안 좋은 자식이 아니어서 미안했고 고마웠어요."},
    {qCode :"TQ0091", type :"EN", subType :"EN0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"생의 마지막 순간, 가장 뿌듯한 일은 무엇일까요?", hint :"남편과 결혼한 건 내 생에 가장 잘한 일이었다."},
    {qCode :"TQ0092", type :"EN", subType :"EN0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"생의 마지막 순간, 가장 아쉬운 일은 무엇일까요?", hint :"부모님께 효도를 제대로 못한게 가장 아쉽다."},
    {qCode :"TQ0093", type :"EN", subType :"EN0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"생의 마지막 순간, 배우자에게 하고픈 말이 있다면?", hint :"여보. 고마웠고, 사랑해요."},
    {qCode :"TQ0094", type :"EN", subType :"EN0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"생의 마지막 순간, 자녀에게 하고픈 말이 있다면?", hint :"얘들아. 엄마를 잘 부탁하고, 아빠를 잊지 말아다오."},
    {qCode :"TQ0095", type :"EN", subType :"EN0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"생의 마지막 순간, 자신에게 하고픈 말이 있다면?", hint :"그래, 열심히 살았어. 수고했어."},
    {qCode :"TQ0096", type :"EN", subType :"EN0001", hintType :"P", dateTitle :"DT0001", sex :["M","F"], generation :[20,30,40,50,60], regDate :global.fn_dateFormat().HMS, updateDate :global.fn_dateFormat().HMS, cycle :-1, question :"생의 마지막 순간, 생각나는 인생의 한장면은 무엇일까요?", hint :"내 아이가 태어나던 순간이 기억날 것 같다."},
  ];
  _.each(questionItems, function(item){
    CLT.EnQuestionList.insert(item);
  });

}

var EnBucketList = CLT.EnBucketList.find().fetch();
if(EnBucketList.length === 0){
  var s3bucket = "";
  var s3bucketPath = "";
  var s3region = "";

  // if(Meteor.settings.public.serverType === "prod"){
    s3bucket = "s3-ims-prod";
    s3bucketPath = "https://s3.ap-northeast-2.amazonaws.com/s3-ims-prod/";
    s3region = "s3-ap-northeast-2";
  // } else {
  //   s3bucket = "iml-images";
  //   s3bucketPath = "https://s3.ap-northeast-2.amazonaws.com/iml-images/";
  //   s3region = "s3-ap-northeast-2";
  // }
  var items = [
    {
    "_id" : "4CgBETTZ2ZHwctMyW",
    "title" : "가족과 소중한 시간을 담을 카메라 구매하기!!",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "folder" : "bucketlist_images/",
            "bucketUrl" : s3bucketPath,
            "fileName" : "1522386463585-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-30+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.07.32",
            "extension" : "png",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [
        "오두막4",
        "mark4",
        "canon",
        "카메라"
    ],
    "category" : "BL0005",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p>카메라?? 핸드폰이면 충분하지 뭐하러 비싸게 돈주고 사?</p><p>라고 생각했다 사진기를 알기 전까진...</p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\"" + s3bucketPath + "bucketlist_images%2F1522386463585-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-30+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.07.32_originRe.png\"></p><p><br></p><p>충동적으로 구매한 보급형 캐논 카메라 100d&nbsp;</p><p>어떻게 찍는지 알아가면서 빠져들게 됬고 결국 보급형 dslr 의 한계를 알게된 나는 고급기 5d mark4를 사려고 한다<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 409px; height: 215.16px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522386294924-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-30+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.04.44_originRe.png\">그런데 가격이... 흠....&nbsp;</p><p>돈좀 모아볼까??</p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>한달에 용돈 40 생활비 쓰고 남은돈 10만원으로... 언제사지?...</span></strong></p><p><br></p><p>아내가 주는 월용돈 40만원 에서 통신비,교통비 만 빼도 10만원 선인데...</p><p><br></p><p>카메라가 330정도에 렌즈가 ef 24-70 f2.8L 정도면 240 이니까....</p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 370px; height: 169.58px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522387444865-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-30+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.23.56_originRe.png\"></p><p><br></p><p>약 57개월 걸리고 점심 안먹고 버스대신 걸어다니면.......&nbsp;</p><p>.</p><p>.</p><p>.</p><p>.</p><p>적금통장이 어딨더라???</p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>어디서 사야 하나?? 정품, 병행? 수입? 뭐가 이게다 뭐지???</span></strong></p><p><br></p><p><br></p><p>구매하려고 이것저것 알아보고 있는데 정품,병행수입,해외구매, 뭔 종류가 많아서 알아봤다.</p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522388851119-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-30+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.44.45_originRe.png\"></p><p><br></p><p>병행수입이 뭔데 좀더 싸지? 했는데 쉽게 말해 사설업체가 일본이나 미국 내수용으로 나온 카메라를 수입해와서 파는거란다. 당연히 캐논코리아 에 서 무상보증따위는 안해준다. 대신 병행수입업체에서 사설 수리업체에 무상으로 해준다는데.... 음.... 그냥 맘고생 하고 싶지  않으면 믿을만한 업체에서 정품을 사라는게 대다수의 의견이다.&nbsp;</p><p><br></p><p>근데 가격차가 좀 많이 나긴하네....</p><p><br></p><p><strong><span style='font-size: 18px;'>드디어 eos5d mark4를 구매하다.</span></strong></p><p><br></p><p style=\"text-align: center;\">드디어 도착 했다 적금까지 깨가면서 산 오두막4<br><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522390767618-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-30+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+3.19.18_originRe.png\"></p><p>워낙 가격대가 있다보니 쉽게 구매결정을 못하고 있다가 버킷리스트에 작성하고 나니 나도 모르게 구매 준비를 하고 있었다.</p><p><br></p><p>어디서 사야 할지 많이 알아봤는데 유명한건 3개 정도 업체 가 있었다. 추천해 주는 사람들이 꽤 있었는데 최저가 보단 조금 비싼 가격으로 팔고 있어서 결국 다나와 최저가로 사버렸다.</p><p>용산도 생각해 봤는데 용산 판매자들이 다그런건 아니겠지만 수년전에 아버지랑 캠코더 사러 갔다가 화려한 말빨에 단종된  캠코더를 비싼가격에 속아 사서 엄청난 후회를 하고는 용산가기가 꺼려진다.</p><p><br><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522391775949-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-30+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+3.36.05_originRe.png\"></p><p><br></p><p>구성품</p><p>보증서. 설명서. 스트랩. 충전기. 배터리. 소프트웨어cd, 케이블,</p><p><br></p><p>렌즈는 고민했어 24-70 말고&nbsp;</p><p>좀더 가격적으로 타협을해서산 ef24-105렌즈 가격도 ef 24-70보단 사면서 광각에서 망원까지 무난하게 버용성으로 쓸수 있어서 결정했다.</p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522393700223-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-30+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.05.27_originRe.png\"></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522393705538-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-30+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.06.51_originRe.png\"></p><p>묵직한 그립감 무거운 셔터소리가 감슴을 두군 거리게 한다.</p><p>빨리 많이 찍어보고 익숙해져서 가족들과의 시간을 이쁘게 찍어보고 싶다.</p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522394414989-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-30+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.18.34_originRe.png\"></p><p><br></p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "8P5s8ZSkYQSGeg8QG",
    "title" : "힐링여행 일본 하코네 온천",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "bucketUrl" : s3bucketPath,
            "folder" : "bucketlist_images/",
            "fileName" : "1522209647369-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+1.00.32",
            "extension" : "png",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [

    ],
    "category" : "BL0003",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p>티비에 나온 하코네 온천<br><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522209647369-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+1.00.32_originRe.png\"></p><p><br></p><p>사랑이와 추성훈이 소개했던 하코네 온천 그당시에는 그러려니 하고 봤는데</p><p>알고보니 내가 가고 싶어 하던 하코네 온천이 그곳 이었다.</p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522209733878-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+11.38.45_originRe.png\"></p><p>산이 내려다 보이는 료칸에서 온천욕 올 가을 꼭 아내와 함께 떠나야지</p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522210237435-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+1.10.23_originRe.png\"></p><p><br></p><p><strong><span style='font-size: 18px;'>하코네에 도착~~!!</span></strong></p><p><br></p><p>하네다 공항에 도착~</p><p>공항 버스를 타고 신주쿠에서 기차를 몇번 갈아타고 일본도착 4시간이 되서야 숙소에 도착했다 온천 이외 시설들도 많아 돌아다닐것 없어 첫날은 료칸에서 보내기로 했다.</p><p><br><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522214543617-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.17.07_originRe.png\"></p><p><br><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522214550252-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.17.31_originRe.png\"></p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522214615406-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.23.06_originRe.png\"></p><p><br></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>아기자기 수족관, 신사, 현란한 유람선~</span></strong></p><p><br></p><p>아침일찍 또한차래 온천을 즐기고 주변 볼거리를 찾아 나섰다.</p><p>오사카에서 봤던것 보단 작지만 아기자기 물고기들이 놀고 있는 수족관</p><p><br></p><p>가파른 급경사를 올라가는 하코네 등산전차<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522215590688-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.39.35_originRe.png\"></p><p><br></p><p>부유층들의 별 장이 많았던 하코네고라공원 지금은 별장건물이 그대로 료칸으로 사용 되고 있어요~!<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522215731360-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.41.58_originRe.png\"></p><p><br></p><p>화려한 해적관광선을 타고 고요한 수면에 비친 하코네의 자연경관을 즐길수도 있었어요<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522215945305-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.45.33_originRe.png\"></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>이제 다시 집으로...</span></strong></p><p><br></p><p>순식간에 지나버린 일본여행 아쉽지만 다음 여행을 기대하며 다시 현실로 복귀 합니다~<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522216805424-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.58.45_originRe.png\"></p><p><br></p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "CrYbArmCHeSLetELG",
    "title" : "동남아의 보석 다낭에 다녀오기",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "bucketUrl" : s3bucketPath,
            "folder" : "bucketlist_images/",
            "fileName" : "1522217787574-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+3.16.11",
            "extension" : "png",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [
        "쌀국수",
        "다낭",
        "동남아여행",
        "베트남여행"
    ],
    "category" : "BL0003",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p>우연히 보게된 아름다운 바다가 보이는 휴양지 사진 한장 알고보니 베트남의 다낭이란걸 알게됬고 가격도 시간도 생각보다 저렴해 계획을 세우게 된 다낭 여행 너무 기대되네ㅎㅎㅎ<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522217787574-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+3.16.11_originRe.png\"></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>다낭도착 숙소까지 픽업서비스로 편하게~</span></strong></p><p><br></p><p>숙소까지 차를타곡 1시간거리 대중교통 보단 편하고 그리 비싸지도 않아 픽업버스를 이용했어요.<br><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522220425805-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.00.10_originRe.png\"></p><p><br></p><p>빨리 짐을풀고 바로앞에 보이 는 해변에 해수욕을 하러 갔습니다. 이국적인 바다가 너무 이쁜 곳이었어요<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522220662082-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.03.27_originRe.png\"></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>다낭 여행 2일차</span></strong></p><p><br></p><p>고풍스런 건물들이 있는 바나힐 시계탑광장의 분수&nbsp;<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522221343945-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.15.29_originRe.png\"></p><p><br></p><p>바나힐로 오르는 케이블은 듣던데 로 멋짐 풍경 이었습니다. &nbsp;날이 좋지 않은날엔 안개뿐이 보이지 않는다고 하는데 다행이 오늘은 화창하게 반겨주네요<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522221438049-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.17.04_originRe.png\"></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>다낭여행 3일차</span></strong></p><p><br></p><p>빡빡한 일정 오늘은 호이안 에서 전 통 시클로 체험을 했습니다.&nbsp;<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522221643941-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.20.29_originRe.png\"></p><p><br></p><p>전통배 퉁버이 체험도 하고 저녁엔 야시장도 연다고 하는데 빡빡한 스케줄에&nbsp;</p><p>너무 힘들어서 숙소로 일찍 돌아왔어요<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522221741870-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.21.43_originRe.png\"></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>다낭여행 마지막날</span></strong></p><p><br></p><p> 이 여행의 목적(ㅋㅋㅋㅋ) 이던 쌀국수를 마지막으로 다낭을 떠납니다.</p><p>쌀국수 맛집 퍼흥 이라는 곳인데 유명한 쌀국수 맛집이었어요</p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522222472105-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.34.22_originRe.png\"></p><p> 가격도 저렴하고 너무 맛있었네요&nbsp;</p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "KTywpYErAhGEcFNeq",
    "title" : "내 손으로 잡은 물고기 회쳐 먹기",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "bucketUrl" : s3bucketPath,
            "folder" : "bucketlist_images/",
            "fileName" : "1522204835299-%EB%82%9A%EC%8B%9C",
            "extension" : "jpg",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-05-28 13:44:51",
    "tagList" : [
        "낚시",
        "바다낚시",
        "버킷리스트",
        "취미"
    ],
    "category" : "BL0004",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p>나이가 30중반이 넘으면 낚시를 해보는게 좋을것 같다고 막연히 생각했다&nbsp;</p><p><br></p><p>최근에 도시어부라는 프로그램을 보니 더욱 더 낚시를 해야겠다는 생각이 든다</p><p><br></p><p>방송을 통해 접한 &nbsp;낚시의 즐거움은 3가지 정도 인것 같다</p><p><br></p><p>1. 물고기 잡는 재미</p><p>2. 입질을 기다리며 멍때리는 재미</p><p>3. 잡은 물고기를 요리하는 재미</p><p><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 209px; height: 260.553px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522204835299-%EB%82%9A%EC%8B%9C_originRe.jpg\">[낚시의 즐거움]</p><p style=\"text-align: center;\"><br></p><p>낚시하는 사람들이 주변에도 많던데 나도 한번 시작해 보겠다</p><p><br></p><p><strong><span style='font-size: 18px;'>낚시는 등산 만큼 쉽게 시작한다</span></strong></p><p><br></p><p>낚 시 인구는 취미활동 인구 순위 중 부동의 2위란다</p><p>등산 다음으로 낚시라는데 그만큼 쉽게 시작할 수 있는것 같다</p><p><br></p><p>낚시 장비는 구매 해도 되고 낚시터나 항구에서 대여해도 되는데</p><p>내가 가고 싶을때 장비걱정 없이 편하게 떠나는게 좋을것 같아 장비를&nbsp;</p><p>구매하기로 했다</p><p><br></p><p>저렴한 장비는 10만원대에서 구매 가능하고 비싼 장비는 100만원대까지도 간다고 한다</p><p><br></p><p>참고 <a href=\"http://slds2.tistory.com/519\">http://slds2.tistory.com/519</a>&nbsp;</p><p><br></p><p>서투른 낚시꾼이 장비 탓한다고 저렴한 장비로 구매하는 것도 좋을것 같다</p><p><br></p><p>난 배멀 미가 심하니까 방파제 낚시를 하면 좋을것 같아서</p><p>초보자가 가장 하기 쉬운 원투낚시를 하기로 하고 장비를 알아보았다</p><p>세트로 파는 제품이 있는데 인터넷 글들 보니까 사지 말란다</p><p>세트는 불필요하거나 안좋은 장비가 포함되어 나중에 쓰 지 않는단다</p><p><br></p><p>이것저것 알아보고 구매하기로 한 장비는</p><p>낚시대 : <span>&nbsp;</span>유정비어대 30-450, 78000원</p><p>스피닝 릴 :다이와 크로스캐스트 4500, 56000원</p><p>낚시줄 : 네오 R18 바다원줄, 4710원</p><p>채비(도래+낚 시바늘+추): 원터치 모듬 채비, &nbsp;2000원</p><p>바늘빼기집게 : 4500원</p><p>라인커터 : 손톱깍이로 대체&nbsp;</p><p>살림통 : 양동이로 대체</p><p>낚시의자 : 집에 있는 의자로 대체</p><p><br></p><p>총 비용 15만원 정도에 장비 마련 할수 있다</p><p><br></p><p>원투낚시 채비법은 낚시줄에 바늘 엮는거라고 생각하면 되는데</p><p><a href=\"https://blog.naver.com/again6510/220306209504\">https://blog.naver.com/again6510/220306209504</a></p><p>여기에 사용법을 참고 하면 될것 같다</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 357px; height: 280.84px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522302877696-ff14_19_i1_originRe.jpg\"></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[낚아 보자]</p><p><br></p><p><br></p><p>장비 사고 원줄에 채비 묶어서 멀리 던지면 낚시 시작이다</p><p>두근두근 하다</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>초보가 하기 편한 낚시 포인트</span></strong></p><p><br></p><p> 나같은 왕초보가 시작부터 많은 고기를 낚을 거라고는 생각안한다</p><p>고기가 얼마나 잡히는지도 중요하지만 편하게 낚시할 수 있는곳이 가장 좋다</p><p>너무 멀지 않으면서 힘들지 않은곳으로...</p><p>방파제 테트라포트에 올라가서 낚시하는건 무리인것 같고</p><p>선착장에서 차 세워두고 하는것이 가장 편할것 같다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522304138849-13638_43327_4831_originRe.jpg\"></p><p style=\"text-align: center;\">[이렇게 편하게 텐트도 치고]</p><p><br></p><p>[초보용 서울근 교 낚시 포인트]</p><p><a href=\"https://m.blog.naver.com/PostView.nhn?blogId=slds2&amp;logNo=220322587446&amp;proxyReferer=https%3A%2F%2Fwww.google.co.kr%2F\">https://m.blog.naver.com/PostView.nhn?blogId=slds2&amp;logNo=220322587446&amp;proxyReferer=https%3A%2F%2Fwww.google.co.kr%2F</a></p><p><br></p><p>이왕이면 구경거리나 먹거리도 있었으면 하는데</p><p>얼마전에 갔다온 꽂지해수욕장이 생각났다</p><p>일몰이 정말 기가 막혔고 선착장에서 여러 사람들이 낚시를 하고 있던 기억이 난다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522304284151-download_originRe.jpg\"></p><p style=\"text-align: center;\">[이 사진 오른쪽에 선착장이 있었다]</p><p><br></p><p>좀 멀긴 하지만 여기로 다녀오는게 좋을것 같다</p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>장비가 왔다</span></strong></p><p><br></p><p>구매한 장비가 도착했다</p><p>20만원 정도  들었다</p><p>처음부터 너무 많은 돈을 쓴것은 아닌지 걱정이 되지만,,,,,,</p><p><br></p><p>어쨌든 미끼만 달아서 던지기만 하면 된다</p><p>두근두근</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522304918130-1_originRe.JPG\"></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>낚시!!</span></strong></p><p><br></p><p>낚시하기 추운 날씨지만 어차피 할일도 없고</p><p>반짝반짝 빛나는 새 장비가 나를 오랬동안 기다렸다</p><p>일단 한번 가보자 안되면 노을만 보고 와도 된다</p><p>잠깐만 해보고 오자라는 생각으로 출발했다</p><p><br></p><p>서해안고속도로를 타고 안면도로 가는데 2시간30분정도 걸린다</p><p>점심먹고 출발해서 3시쯤 도착했다</p><p><br></p><p>꽃지해수욕장 주차장에 차를 대고 (지금 무료) 방포방파제로 십오분정도 걸어 갔다</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 227px; height: 303.174px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522305436551-fef4b3882211d9f978f700202ad796a5_originRe.jpg\"></p><p style=\"text-align: center;\">[방포방파제]</p><p><br></p><p>정말 엄청 추웠다&nbsp;</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522305685074-%EB%B0%A9%ED%8C%8C%EC%A0%9C%EB%82%9A%EC%8B%9C1_originRe.jpg\"></p><p><br></p><p>이렇게 입었어야 했다</p><p><br></p><p>물고기가 잘아서 바늘은 2.5m로 맞췄다&nbsp;</p><p>(옆에 아저씨가 그렇게 하라고 했다)</p><p><br></p><p>손이 얼어서 채비도 묶기가 힘들었다&nbsp;</p><p><br></p><p>겨우겨우 지렁이까지 끼어서 첫 캐스팅!을 시작했다</p><p><br></p><p>옆에 아저씨를 낚을 뻔했다....</p><p><br></p><p>죄송하다고 사과를 하고 다시 힘차게 던졌다!</p><p><br></p><p>바위에 걸려 줄을 끊었다....</p><p><br></p><p>여기까지 온게 아쉬워 근처 낚시용품 점에 가서 채비를 사왔다</p><p><br></p><p>낚을 뻔했던 아저씨가 멀리만 던지려고 하지말고 정확하게 던져 보라고 충고 해주셨다&nbsp;</p><p><br></p><p>그래서 힘을 빼고 천천히 정확히 던졌고 가깝지만 바다에 바늘이 들어갔다!!</p><p><br></p><p>이제 기다리는 시간.. 30분정도 뒤에 낚시대가 흔들리는 느낌이 들었고 강하게 한번 챈 다음에 릴을 돌려 줄을 감았다&nbsp;</p><p>느낌이 있었다 초보인 나도 알수 있는 느낌!!</p><p><br></p><p>낚시대가 휘어가고 생선의 형체가 보였다 잡고나서 확인하니</p><p>옆에 아저씨가 우럭이란 다 우럭!!</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522306969084-images_originRe.jpg\"></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;[횟집에서 돈주고 사먹던 우럭!!]</p><p><br></p><p>첫수이자 마지막이었지만 잡은 우럭은 옆에 아저씨 드렸다</p><p>옆에 아저씨는 이미 한바구니였지만 나는 한마리뿐이니</p><p>뭐 회떠 먹기도 애매하고... 춥기도 해서 빠르게 짐을 정리해 돌아왔다</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522307378228-KakaoTalk_20180329_160838830_originRe.jpg\"></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; [돌아오며 마주친 노을]</p><p><br></p><p>기다릴때 추웠지만 아무생각없이 멍때리면서 힐링한 시간이었고</p><p>손맛!</p><p>이게 바로 손맛이었다!</p><p><br></p><p>아직 회뜨는 법을 몰라 회를 떠서 먹어보는 것까진 못 했지만</p><p>버킷리스트 하나를 이뤘고 새로운 취미를 하나 얻게 된것 같다</p><p><br></p>",
    "followCnt" : 0,
    "contextImage" : [

    ],
    "tempSave" : false,
},
{
    "_id" : "MRC2mKpM4c7i2ZATA",
    "title" : "도쿄 카라멜 넘버슈가에서 디져트 사먹어 보기",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "folder" : "bucketlist_images/",
            "bucketUrl" : s3bucketPath,
            "fileName" : "1522219174222-%EB%84%98%EB%B2%84%EC%8A%88%EA%B0%80",
            "extension" : "png",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [

    ],
    "category" : "BL0002",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p>울 아들 카라멜 완전 좋아하는데 ... .</p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522219174222-%EB%84%98%EB%B2%84%EC%8A%88%EA%B0%80_originRe.png\"></p><p>캬라멜 좋아하는 사람이라면 한번쯤 들어봤을법한 일본의 유명 간식!</p><p>오전에 가지 않으면 인기 있는 넘버는 맛 볼 수 없는 오모테산도 넘버슈가ㅠㅠ<br>친구는 여행 둘째날 오후에 갔다가 맛있다고 유명한 카라멜은 모두 없어서 잼만 시식해보고 나왔다고 하네요.<br>저는 올해 도쿄 여행에서 꼭 오픈시간에 맞춰서 오전에 방문할 생각입니다.</p><p>개당 천원으로 결코 싼 가격은 아니지만 여행에서의 쇼핑은 그런맛 아닐까요?!</p><p>넉넉히 20개쯤 사올생각입니다. 벌써부터 기대되요.</p><p><br></p><p><strong><span style='font-size: 18px;'>돈 모았당</span></strong></p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 350px; height: 218.167px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522295777146-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C_originRe.jpg\"></p><p><br></p><p><br></p><p>아 다모았당&nbsp;</p><p><br></p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "Ptqsp8tzekj4DskbN",
    "title" : "[체코 여행] 스카이 다이빙 체험하기~!",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "folder" : "bucketlist_images/",
            "bucketUrl" : s3bucketPath,
            "fileName" : "1522406125354-%EC%8A%A4%EC%B9%B4%EC%9D%B4%EB%8B%A4%EC%9D%B4%EB%B9%99",
            "extension" : "jpg",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [
        "프라하",
        "체코",
        "스카이다이빙"
    ],
    "category" : "BL0004",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p style=\"text-align: center;\">다가 올 유럽여행 중에 꼭 한번&nbsp;</p><p style=\"text-align: center;\">해보고 싶었던&nbsp;</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><span style=\"color: rgb(84, 172, 210);\"><span style=\"font-size: 14px;\"><strong><u>!!!! 스카이다이빙 !!!!</u></strong></span></span></p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" src=\""+ s3bucketPath + "bucketlist_images%2F1522406125354-%EC%8A%A4%EC%B9%B4%EC%9D%B4%EB%8B%A4%EC%9D%B4%EB%B9%99_originRe.jpg\" style=\"width: 562px; height: 204.6px;\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">일상에서 벗어나 짜릿함을 만끽하고&nbsp;</p><p style=\"text-align: center;\">모든 스트레스를 날려버렸으면 좋겠다!!!</p><p style=\"text-align: center;\">그리고 깔끔하게 버킷리스트를 complete!!!!</p><p style=\"text-align: center;\"><br></p><p><br></p><p><strong><span style='font-size: 18px;'>프라하 여행 3일차 스카이다이빙 체험 위기</span></strong></p><p><br></p><p>오늘 안그래도 추적추적 비도 내리고 바람도 많이 부는 프라하인데</p><p>게스트 하우스 사장님을 통해 연결되어 있는 스카이다이빙 업체에서 연락이 왔다.</p><p><br></p><p>내일 날씨가 좋지 않아서 진행이 어려울 것 같다는 비극적인 연락이었다 T^T &nbsp;아직 확정되진 않았지만 현재로선 거의 못 할 분위기다.....</p><p><br></p><p>어찌보면 스카이 다이빙때문에 온 여행인데.. 이렇게 허무하게 끝나는것인가... 제발 내일 기적이 일어났으면.......</p><p><br></p><p>비야 오지 말고, 구름도 끼지 말 고, 바람아 너무 쌔게 불지 말아줄래????</p><p>제발!!!!</p><p><br></p><p><strong><span style='font-size: 18px;'>스카이다이빙 꿀팁</span></strong></p><p><br></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><strong><span style=\"font-size: 14px;\">스카이다이빙을 할 때&nbsp;</span></strong></p><p style=\"text-align: center;\"><strong><span style=\"font-size: 14px;\">몇가지 팁을 알면 더 재밌게 즐길 수 있다고 한다.</span></strong></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 461px; height: 236px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522408919434-%EC%8A%A4%EC%B9%B4%EC%9D%B4%EB%8B%A4%EC%9D%B4%EB%B9%9902_originRe.jpg\"><br></p><p style=\"text-align: center;\"><strong>1. 조금 비싸더라도  사진, 영상이 포함된 패키지로 신청</strong></p><p style=\"text-align: center;\">: 다이빙 영상과 사진은 잊지못할 좋은 추억이 될것이 분명하기때문이다.</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><strong>2. 입벌리지  말기</strong></p><p style=\"text-align: center;\">: 뛰어내릴때 입을 벌리면 바람때문에 영상에 보거스처럼 나오게 된다 ㅋㅋ.</p><p style=\"text-align: center;\">되도록 입을 벌리지 않고 자연스럽게 웃는것이 좋다고 한다.</p><p style=\"text-align: center;\">(근데 영상을 보니까 꼭 그런건 아닌것 같기도 하다 ㅋㅋ)&nbsp;</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><strong>3. 손바닥에 매직으로 크게 글씨쓰기</strong></p><p style=\"text-align: center;\">: 스카이다이빙 을 하기전에 준비된 매직으로 메시지를 손바닥에 적으면 영영상이 더 특별해진다고 한다.</p><p style=\"text-align: center;\"><br></p><p><br></p><p><strong><span style='font-size: 18px;'>게스트하우스를 통해 스카이다이빙 예약</span></strong></p><p><br></p><p>같이 가는 친구를 통해 정보를 들었는데</p><p>우리가 묵게 될 한인 게스트하우스를 통해 프라하 스카이다이빙을 예약할 수 있다는 정보 였다.</p><p><br></p><p>추석을 맞이하여 프라하로 여행을 가는 사람들이 많은 성수기기 때문에 예약이 꽉차 있으면 어쩔 수 없이 포기해야하는 상황이지만 일단은 우리의 운을 믿어보기로 하고 게스트 하우스 사장님께 스카이다이빙을 예 약해 달라고 부탁드렸다.</p><p><br></p><p><strong><span style='font-size: 18px;'>하늘이 도운 우리의 스카이다이빙</span></strong></p><p><br></p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "RBRpBrLQHxHqHtAko",
    "title" : "겨울 솔로 캠핑",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "folder" : "bucketlist_images/",
            "bucketUrl" : s3bucketPath,
            "fileName" : "1522471929051-%EC%BA%A1%EC%B2%98",
            "extension" : "JPG",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [

    ],
    "category" : "BL0004",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p>회의가 많아 말을 많이하거나 걱정거리가 많아 고민이 많아지면 캠핑이 가고 싶어진다&nbsp;</p><p><br></p><p>맑은 공기를 마시며 그냥 아무 생각없이 장작불을 쬐고 멍때리고 있으면 그 순간 만큼은 아무 걱정이 없어진다&nbsp;</p><p><br></p><p>아직 한번도 혼자 캠핑한 적이 없기에 더욱 도전해 보고 싶은 마음이 든다</p><p>&nbsp;<img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 412px; height: 297px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522471929051-%EC%BA%A1%EC%B2%98_originRe.JPG\"></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>겨울 캠핑, 추위를 이기는 방법</span></strong></p><p><br></p><p>겨울 캠핑은 아무래도 추위와의 싸움이 아닐까 쉽다</p><p>(여름은 벌레)</p><p><br></p><p>나는 유유자적 심심한 힐링을 하려고 하 는것이지 혹한기 훈련을 하는게 아니기 때문에 추위를 견딜 수 있는 장비를 마련하기로 했다</p><p><br></p><p>인터넷으로 찾아 보고 지인들의 추천도 받았다</p><p><br></p><p><strong>1. 텐트</strong><br>겨울은 바깥에서 하는 활동이 다른 계절만큼 많지 않기 때문에 대부분의 시간을 텐트 안에서 보내게 된다&nbsp;</p><p>솔로 캠핑이지만 텐트안에 난로가 필요하기 때문에 생활공간과 숙박공간을 함께 쓰는 리빙쉘 텐트가 적합하다&nbsp;</p><p>취사까지 내부에서 해야 하는 겨울 캠핑의 특성상 다른 계절보다 결로가 심해지므로, 그라운드시트나 방수포를 이용한 바닥공사는 필수로 한다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 396px; height: 143.96px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522482105130-7252_2_originRe.jpg\"></p><p>가격은 10만원 대 부터 200만원대 고가 제품까지 많이 있는데 캠핑을 처 음 하는 사람이라면 저렴한 제품으로 시작하는것이 좋다</p><p>대부분 사놓고 안쓰는 경우가 많다</p><p><br></p><p><strong>2. 전기매트</strong><br>전기를 사용할 수 있는 캠핑장이라면 전기매트를 가져간다. 발포매트 여러 겹을 겹친 다음 전기매트를 깔 면 되는데, 이때 발포매트와 발포매트 사이에 모직 담요를 한 장 깔아두는 것이 팁. 에어박스나 에어매트리스 등은 전기매트의  열이 닿으면 매트리스와 매트리스 충전재의 접착제 부분이 떨어질 수 있으니 직접 닿지 않도록 해야한다.<br><br><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 212px; height: 141.333px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522482252083-7252_3_originRe.jpg\"></p><p><strong>3. 에어매트</strong><br>전기매트 대신 에어매트를 이용할 수 있다 겨울에 바닥에서 올라오는 냉기를 막아주고 여름에도 사용할 수 있다. 바람을 넣고 빼는 형태 기 때문에 휴대도 편하다</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522482437604-7252_4_originRe.jpg\"></p><p><br></p><p><strong>4. 야전침대</strong><br>매트가 별로라면 야전침대를 챙겨도 된다. 맨바닥에서 떨어져 있기 때문에 습기와 냉기를 피할 수 있다. 전기 매트, 에어매트 구매가 망설여진다면 야전침대를 준비하는 것도 방법이다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522482693822-7252_5_originRe.jpg\"></p><p><strong>5. 침낭</strong><br>침낭 충전재 중에 다운이 충전되 침낭도 있으나 관리면에서나 비용면에서나 합성섬유 충전재를 선택하는 편이 현명하다. 다운재질은 습기에 약하다.</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522482911093-7252_6_originRe.jpg\"></p><p><br></p><p><strong>6. 난로</strong></p><p>난로는 사용법이 간편하고 연료도 구하기 쉬운 석유난로를 사용한다 불완전 연소로 인한 그울임이나 유독가스가 문제가 되는데 요즘은 문제 없는 제품들이 나오고 있다고 한다 하지만 텐트에 배기구를 설치해 공기가 순환되도록 주의해야 한다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 118px; height: 172.673px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522484179657-7252_7_originRe.jpg\"></p><p><br></p><p><strong>7. 서큘레이터</strong></p><p>대류현상으로 인해 난로의 더운 공기는 위로 향하고 찬공기는 아래로 내려와 잘 때 추위가 많이 느껴진다. 서큘레이터를 이용해 공기를 순환시키면 위 아래 따뜻하게 잘 수 있다</p><p>&nbsp;<img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 192px; height: 192px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522484254413-41QJ6ZVrwNL._QL70__originRe.jpg\"></p><p><br></p><p><strong>8. 그밖에</strong></p><p>복장은 두껍고 무거운 옷보다는 가볍고 보 온 효과가 좋은 폴라폴리스 계열의 옷을 여러 벌 챙기는 것이 좋다</p><p>신발은 눈에 젖어도 동상에 걸리지 않도록 방수기능이 되면서 목이 높은것을 준비한다&nbsp;</p><p>핫팩을 챙겨 잘 때 발이나 손에 붙여두는 것도 좋다</p><p>추가로 화목난로를 챙길 때는 반드시 안전망과 배기구 설치를 해야한다</p><p><br></p><p><strong><span style='font-size: 18px;'>겨울철 캠핑 주의 사 항</span></strong></p><p><br></p><p>아무래도 혼자가려니 걱정이 많이 돼, 겨울 캠핑 주의사항을 인터넷으로 많이 알아 보았다&nbsp;</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522485864817-5252356142_7596d24766_z_originRe.jpg\"></p><p><br></p><p><strong>1. 낙상, 동상 주의하기</strong></p><p>캠핑장은 산속에 대부분 있기 때문에 서리나 얼음이 많다. 얼음을 밟고 미끄러지는 낙상사고를 주의해야한다. 미리미리 아이젠을 챙겨 두는것이 좋다. 야외 활동을 하다 보면 동상이 올수 있는데 이때 는 42도 내외의 미지근한 물에 언 부위를 담궈 녹여준다. 상비약과 연고도 미리 준비한다</p><p><br></p><p><strong>2. 음식물  처리</strong></p><p>겨울에 배가 고픈 멧되지 같은 야생 동물들이 먹이를 찾아 캠핑장으로 내려올 수도 있기 때문에 남은 음식 물은 냄새가 나지 않도록 위생봉투에 묶어둔다. 음식물은 먹을 만큼만 준비해야한다.</p><p><br></p><p><strong>3. 캠핑장 시설 체크</strong></p><p>사전에 식수대나 화장실의 동파는 없는지 캠핑장 시설물을 체크한다</p><p><br></p><p><strong>4. 가스 용 품 사용</strong></p><p>가스 버너와 가스 난로와 같은 제품을 텐트에서 사용할 때는 사용 중이나 사용 후에 반드시 환기를 해야한다. 가스가 연소할 때 산소를 이용하는 밀폐된 텐트안의 산소가 줄어들어 산소 부족을 일으키기 때문에 매우 위험하다</p><p> 가스로 난방하는 경우에는 잘 때는 반드시 끄도록 한다</p><p><br></p><p><strong>5. 화재</strong></p><p>난방과 취사를 텐트  안에서 하기 때문에 화재 발생에 늘 주의해야한다. 난로가 넘어지지 않도록 주의하고 주변에 타는 물건이 없도록 안전망을 준비 한다. 화재에 대비해 소형 소화기는 필수다&nbsp;</p><p><a href=\"https://www.youtube.com/watch?v=ExFiNudUUSA\">https://www.youtube.com/watch?v=ExFiNudUUSA</a></p><p><br></p><p><strong><span style='font-size: 18px;'>솔캠 캠핑장을 찾아서..</span></strong></p><p><br></p><p>겨울 솔로 캠핑하기 좋은 캠프장소는 어디일까?</p><p>우선 나같은 초보가 사람하나 없는 산속에서 야영을 하다가는 백이면 백 문제가 생길 것이다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522579748589-images_originRe.jpg\"></p><p>오지 캠핑보다는 겨울에도 사람들이 찾는 캠핑장이 좋을 것이다</p><p><br></p><p>캠핑장중에서도 겨울철에는 온수, 장작, 시설이 잘 갖춰진 오토캠핑장을 찾는것이 좋겠다</p><p><br></p><p>오토캠핑장의 편리함을 가지면서도 조금 조용하고 자신만의 시간을 가진것 같은 느낌을 가질 수 있는 캠핑장을 한번 찾아보았다</p><p><br></p><p>겨울철은 비성수기여서 일박 요금은 3~4만원 정도로 성수기에 비해 싸고 주말 예약도 쉽다</p><p><br></p><p>ㅇ 자라섬 오토캠핑장</p><p>경기도 가평군, 북한강변에 위치한 자라섬 캠핑장은 3면이 강으로 둘러싸여 있어 입지조건이 탁월한 곳으로 2008년에는 세계캠핑캐라바닝대회가 열렸던 곳인 만 큼 시설 면에서 좋다</p><p><br></p><p>ㅇ 솔내음오토캠핑장</p><p>강원도 대관령에 위치한 ‘솔내음오토캠핑장’은 눈 내린 맑 은 계곡 따라 산책로가 있는 겨울 캠핑장으로 제격이다. 전기와 온수 등 겨울 캠핑에 필요한 것을 완벽히 갖춘 캠핑 사이트로서 대관령 눈꽃축제장이 주변에 있어 겨울을 맘껏 즐길 수 있다.</p><p><br></p><p>ㅇ 광릉 솔개 캠핑장</p><p>광릉 솔개 캠핑장은 수목원 가까이에 있어 숲이 내뿜는 피톤치드를 호흡하며 신선한 기운을 느껴볼 수 있는 캠핑장이다.&nbsp;</p><p><br></p><p>ㅇ 힐링 캠핑장</p><p>강원도 원주시 신림면 황둔리 힐링 캠핑장은 '미군 텐트'를 준비하고 있다. 겨울 캠핑에 필요한 장비와 설비 가 완비되어 있어 별도의 장비 없이 캠핑을 즐길 수 있는 곳이다. 장비 준비가 번거롭다면 이곳으로 떠나는것도 나쁘지 않다. 눈썰매, 눈꽃산행까지 즐길 수 있는 겨울 캠핑장으로 이만한 곳도 없다.</p><p><br></p><p>혼자있는 시간을 즐기기 위해 캠핑장에 사람이 좀 적으면 좋겠다고 생각하는 사람들은 각 캠핑장의 온라인 예약현황을 확인하거나 캠핑장에 문의해 예약현황이 어떤지  확인해보는게 좋다</p><p><br></p><p>가족들이 많이 찾는 캠핑장의 경우 아이들이 시도 때도 없이 소리를 질러 산만한 경우가 많다&nbsp;</p><p><br></p><p>팁으로 수영장이나 축구골대가 있거나, 펜션과 같이 하는 캠핑장은 피하는것이 좋다</p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>짐 줄이기</span></strong></p><p><br></p><p>꼭 필요한것을 제외하고는 짐을 최소화 해야 한차에 다 들어갈 것 같아 필수와 선택을 나누어 보었다</p><p><br></p><p>ㅇ 필수</p><p>텐트 + 발포매트 +  그라운드시트</p><p>전기장판</p><p>침낭</p><p>야전침대(매트 대신)</p><p>코펠 + 수저 + 칼 + 가위 + 도마</p><p>테이블</p><p>가스버너</p><p>부탄가스</p><p>핫팩</p><p><br></p><p>ㅇ 선택</p><p>서큘레이터</p><p>석유난로</p><p>화로대</p><p>토치</p><p><br></p><p>보온이 중요하긴 하지만 난로가 솔로캠핑에 큰 짐이 될것 같다는 생각이 들었다. 짐을 줄이기 위해 난로 대신 야 전침대와 전기장판을 가져가기로 했다</p><p>바닥의 냉기를 야전침대로 막고 장판으로 보온하면 자는동안 큰 무리는 없을 것이다</p><p>테이블은 없어도 상관없지만 바닥에서 밥먹고 밥차리는게 쉬운일은 아니니 테이블은 필수로 챙겼다</p><p><br></p><p>취 사는 캠핑장 집에서 쌀을 챙기고 가는길에 라면과 오리고</p><p>기팩, 각종 주류를 구매한다</p><p><br></p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "WMeMumZzb6NKFfcax",
    "title" : "집에서 수제 맥주 만들기",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "folder" : "bucketlist_images/",
            "bucketUrl" : s3bucketPath,
            "fileName" : "1522314747502-download",
            "extension" : "jpg",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [
        "수제맥주",
        "맥주",
        "홈브루잉",
        "버킷리스트",
        "음주"
    ],
    "category" : "BL0004",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p>나도 맥주를 좋아하지만 우리 아버지도 맥주를 좋아하신다</p><p><br></p><p>곧 결혼을 하게 되는데 기념으로 아버지께 내가 만든 맥주를 드리면 좋아하실것 같아 수제 맥주를 한번 만들어 볼까 한다</p><p><br></p><p>수제 맥주를 만드는일은 홈브루잉이라고도 한다</p><p>몇시간짜리 강좌도 많이 있고 인터넷에 자료도 많고 해볼만 한것 같다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 396px; height: 264px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522314747502-download_originRe.jpg\"></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>아버지는 어떤 맥주를 좋아하실까?</span></strong></p><p><br></p><p> 아버지는 하이트나 카스같은 국산 맥주를 좋아하신다</p><p><br></p><p>집에서 만드는 맥주가 그런 톡쏘는 맛을 완전하게 따라하긴 어렵지만</p><p>그나마 비슷한 거라면 필스너가 되겠다</p><p><br></p><p>필스너는 가벼우면서도 톡쏘는 맛이 나는 맥주로 시중에 판매되는 맥주에 맛이 비슷하다</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 404px; height: 222.04px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522315187121-2015022702406_1_originRe.jpg\"></p><p><br></p><p>수제 맥주를 만들 때 필요한 맥주원액은 인터넷으로 구매가 가능하다</p><p><br></p><p>나는 IPA를 자주 마시니 필스너와 IPA원액을 구매해서 동시에 두종류를 만들어 봐야겠다</p><p><br></p><p><br></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>집에서 맥주는 어떻게 만드는가?</span></strong></p><p><br></p><p>홈브루잉 방법은 인터넷에서 검색해보면 많은 정보가 나온다</p><p>서적도 판매하고 있고, 3시간짜리 오프라인 강좌도 있다고 한다</p><p><br></p><p><span lang=\"EN-US\">수제맥주공방</span>에서 진행하는 체험 강습의 경우<span lang=\"EN-US\">,<span>&nbsp;</span></span><span lang=\"EN-US\">재료와 강습료를 포함</span>하여<span>&nbsp;</span>약<span lang=\"EN-US\"><span>&nbsp;</span>20</span>만원 내외로 맥주를 만들 수 있도록 수업을 진행하고 있다</p><p><a href=\"http://www.outdoornews.co.kr/news/articleView.html?idxno=24248\">http://www.outdoornews.co.kr/news/articleView.html?idxno=24248</a></p><p><br></p><p>집에서 제일 쉽게 만드는 방법은 맥주제조기를 구매하는 방식이다</p><p>썬비어라는 제품이 유명한 제품인데 가격이 기계값만 삼십만원 이 넘는다</p><p><a href=\"http://beernara.com/product/detail.html?product_no=1147&amp;cate_no=1&amp;display_group=3\">http://beernara.com/product/detail.html?product_no=1147&amp;cate_no=1&amp;display_group=3</a></p><p>온도 조절이 가능하기 때 문에 기온에 관계없이 웬만해선 실패할 확률은 적지만 비싼게 단점이다</p><p><br></p><p>저렴하게는 수제 맥주 제조용 킷을 구 매하는 방법이 있다 6만원 정도에서</p><p>판매되고 있다. 수동방식이기 때문에 잘 관리해주지 않으면 실패한다</p><p><a href=\"http://mrbeer.firstmall.kr/goods/view?no=148\">http://mrbeer.firstmall.kr/goods/view?no=148</a></p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522319821292-1_originRe.JPG\"></p><p><br></p><p><br></p><p>맥주제조기를 통해 만들면 맥주 제조의 과정이 너무 단순해져 구입하는것과 별 차이가 없어 재미가 없으니 제조용 킷을 구매할 것이다</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>맥주 제조킷 구매</span></strong></p><p><br></p><p>미스터비어에서 제조킷을 사고</p><p>원액은 체코 필스너와 디아블로 IPA 두통을 구매했다</p><p>ㅇ 구매 비용이 좀 들었다</p><p>&nbsp;- &nbsp;제조킷 : 62,000원</p><p>&nbsp;- 원액 2통 : 84,800원</p><p>&nbsp;- 총 : 146,800원</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522321166055-20151220_214210_originRe.jpg\"></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 169px; height: 169px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522321248324-download_originRe.jpg\"></p><p>돈을 쓰고 나니 더욱 더 실패하면 안되겠다는 생각이 든다</p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>수제 맥주 만들기 - 1</span></strong></p><p><br></p><p>1) 발효조 소독</p><p>발효조에 4L의 물을 넣고 제조킷 구매할 때 준 소독제를 반만 넣고 잘 흔들어서 소독한다&nbsp;</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 179px; height: 183.177px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522321825440-1_originRe.JPG\"></p><p><br></p><p>발효조에 붙은 물꼭지를 틀어 물을 흘려보내며 꼭지 내부도 소독한다</p><p>나머지 살때 받았던 뚜겅이나 캔오프너도 발효조에 넣고 흔들어주고</p><p>10분정도 기다리 면 된다</p><p><b",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "X3xoCA2gtEGi6kX4q",
    "title" : "프랑스 파리 본토에서 3대 진미 먹어보기!!",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "folder" : "bucketlist_images/",
            "bucketUrl" : s3bucketPath,
            "fileName" : "1522306491605-3%EB%8C%80%EC%A7%84%EB%AF%B8",
            "extension" : "jpg",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [
        "프랑스",
        "푸아그라",
        "거위간",
        "달팽이",
        "에스카르고",
        "송로버섯",
        "트러플",
        "캐비어",
        "철갑상어 알"
    ],
    "category" : "BL0002",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p style=\"text-align: center;\"><span style=\"font-size: 14px;\">죽기전에 한번은 먹어봐야 할<strong>&nbsp;<span style=\"color: rgb(209, 72, 65);\">3대 진미</span>&nbsp;</strong><strong>!!!</strong></span></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><span style=\"font-size: 14px;\"><strong>푸아그라, 캐비어, 트러플</strong></span></p><p style=\"text-align: center;\">그리고 추가로 <span style=\"font-size: 14px;\"><strong>달팽이 요리</strong></span>도!!</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">!!!! 본토 프랑스에서 꼭 한번 먹어보자 !!!!</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 405px; height: 183.48px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522306491605-3%EB%8C%80%EC%A7%84%EB%AF%B8_originRe.jpg\"></p><p><br></p><p><strong><span style='font-size: 18px;'>냉.부.에 나온 3대 진미</span></strong></p><p><br></p><p style=\"text-align: center;\">예전에 냉장고를 부탁해에 권지용, 태양 편에서</p><p style=\"text-align: center;\">지용님 냉장고에 3가지 진미가 모두!!! 나왔었다는......</p><p style=\"text-align: center;\">그것도 프랑스에서 직접 공수한 최상급</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 466px; height: 185px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522306557750-3%EB%8C%80%EC%A7%84%EB%AF%B8_%EB%83%89%EB%B6%80_originRe.jpg\"></p><p style=\"text-align: center;\">&nbsp;&lt; 냉장고를 부탁해 권지용, 태양 편 &gt;&nbsp;</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">상대적 박탈감이 들었지만</p><p style=\"text-align: center;\">쪼금만 기다려라!! 나도 본토가서 먹고만다!!</p><p><br></p><p><strong><span style='font-size: 18px;'>세계 3대 진미 자세히 알아보자!!!!</span></strong></p><p><br></p><p style=\"text-align: justify;\"><span style=\"font-size: 14px;\"><span style=\"color: rgb(0, 0, 0);\"><strong class=\"\">&lt; 푸아그라 &gt;</strong></span></span></p><p style=\"text-align: justify;\"><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 598px; height: 237.9px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522307017561-%ED%91%B8%EC%95%84%EA%B7%B8%EB%9D%BC_originRe.jpg\"></p><p style=\"text-align: justify;\"><br></p><p style=\"text-align: justify;\"> 프랑스어 Foie Gras에서, Foie는 간이라는 뜻이고 Gras는 ‘지방질의’, 또는 ‘살이 찐’이라는 뜻입니다. 그러니까 푸아그라는 쌀 찐 지방질의 간이라는 의미입니다.</p><p style=\"text-align: justify;\"><br></p><p style=\"text-align: justify;\">그 유래 는 4,500년 전 이집트 사람들이 당시 철새였던 야생 거위를 대이동 직전에 잡으면 고기 보다 간의 맛이 뛰어났다는 것을 알게 됐습니다. 거위들이 이동을 위해 엄청나게 많은 양의 먹이를 먹어서 여행에 필요한 에너지를 지방의 형태로 간에 축적했기 때문입 니다.&nbsp;</p><p style=\"text-align: justify;\"><br></p><p style=\"text-align: justify;\">그래서 거위의 이동철이 아니라 1년 내내 그 맛을 즐기기 위해 거위를 가금류로 길들인 뒤 의도적으로 많은 양의 먹이를 먹여서 간을 붓게 만드는 것이었습니다.</p><p style=\"text-align: justify;\"><br></p><p style=\"text-align: justify;\">그리고 사실 푸아그라는 프랑스에서도 아무때나 먹는 음식은 아니라는 것입니다. 트러플이나 캐비아 보다는 싸지만, 여전히 서민들에게는 비싸기 때문에 크리스마스나 연말연시에 온 가족이 모여 먹는 별식이라고 합니다.</p><p style=\"text-align: justify;\"><br></p><p style=\"text-align: justify;\"><strong><span style=\"font-size: 14px;\">&lt; 트러플 &gt;</span></strong></p><p style=\"text-align: justify;\"><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 498px; height: 244px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522307036808-%ED%8A%B8%EB%9F%AC%ED%94%8C_originRe.jpg\"></p><p style=\"text-align: justify;\">트러플은 보통 송로버섯이라고 부르는데 트러플의 어원은 투버(Tuber)라는 라틴어에서 왔습니다. 뜻은 덩이줄기, 부딪혀서 생긴 혹, 결절, 종기, 버섯의 일종이라는 뜻으로 쓰이고 있습니다.</p><p style=\"text-align: justify;\"><br></p><p style=\"text-align: justify;\">라틴어가 암시하는 것처럼 트러플은 땅속에서 종기처럼 자라서 진한 향을 내뿜는 버섯입니다. 하지만 인간의 후각으로 땅속에 있는 트러플을 발견하기란 하늘의 별따기이기 때문에 잘 훈련된 개, 암퇘지로 트러플을 찾는다고 합니다.</p><p style=\"text-align: justify;\"><br></p><p style=\"text-align: justify;\">트러플의 향은 매우 진하기 때문에 호두만한 트러 플 하나를 두면 온 집안에 냄새가 배일 정도라고 합니다. 그렇기 때문에 트러플은 얇게 저며서 계란요리, 샐러드, 파스타, 리조 토 등에 올려서 먹는 토핑 재료나 푸아그라를 만들때 주로 쓰인다고 합니다.</p><p style=\"text-align: justify;\"><br></p><p style=\"text-align: justify;\"><span style=\"font-size: 14px;\"><strong>&lt; 캐비어 &gt;</strong></span></p><p style=\"text-align: justify;\"><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 565px; height: 228.14px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522307027920-%EC%BA%90%EB%B9%84%EC%96%B4_originRe.jpg\"></p><p style=\"text-align: justify;\">송로버섯(트러플)과 마찬가지로 그 희귀함으로 인해 최고급 요리로 손꼽히며, '바다의 보석'이라는 별명이 붙을 정도로 귀한 요리입니다. 그러나 이에 반해 수요는 꾸준하기 때문에 가격이 상당히 높은편입니다.<br><br>일반적으로 철갑상어(sturgeon, 스터전)의 알을 특정하여 캐비아라 생각하는 경우가 많지만, 사실 캐비아는 가공하거나 염장처리를 한 생선류의 알을 모두 통칭하는 표현이다. 따라서 철갑상어의 알은 블랙 캐비아로, 연어의 알은 레드 캐비아로 구분합니다.</p><p style=\"text-align: justify;\"><br></p><p style=\"text-align: justify;\">&nbsp;일본과 한국에서는 ‘캐비아’하 면 철갑상어의 알로 통용되나 노르웨이 아이슬란드 등 북유럽 지역을 포함한 여러 다른 나라들에서는 여전히 여러 생선류의 알을 모두 통칭하는 표현으로 사용되고 있습니다.</p><p><br></p><p><strong><span style='font-size: 18px;'>파리 푸아그라 맛집을 알아보자!!</span></strong></p><p><br></p><p><span style=\"font-size: 18px;\"><strong><u>1. Comptoir de la Gastronomie</u></strong></span></p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 528px; height: 176.9px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522315413784-%ED%91%B8%EC%95%84%EA%B7%B8%EB%9D%BC+%EB%A7%9B%EC%A7%91_originRe.jpg\"></p><p><br></p><p>푸아그라, 트러플을 파는 반찬가계 옆에 위치한 레 스토랑이라고 하는데 가계 이름을 한글로 직역하면<strong>&nbsp;'식도락 카운터</strong>' 란다 ㅋㅋㅋㅋ</p><p>가격을 보니 대략 푸아그라 요리가 <strong>2만원~3만원</strong>(17~19유로)인것 같은데 저렴하진 않지만 요리로 먹어보기엔 적당한 듯하다.</p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 388px; height: 274.5px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522315838636-%ED%91%B8%EC%95%84%EA%B7%B8%EB%9D%BC+01_originRe.JPG\"></p><p><br></p><p style=\"text-align: center;\"><strong><span style=\"color: rgb(226, 80, 65);\">아래는 주요 정보 !!!</span></strong></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 405px; height: 180.56px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522316513195-%ED%91%B8%EC%95%84%EA%B7%B8%EB%9D%BC_%EB%A7%9B%EC%A7%9101_%EC%A7%80%EB%8F%84_originRe.jpg\"></p><p><strong>주소 : &nbsp;</strong>34 Rue Montmartre, 75001 Paris / 퐁피두 센터 인근</p><p><strong>운영시간 :&nbsp;</strong></p><p>&nbsp; - 상점 : 월~토 09:00-20:00</p><p>&nbsp; - 레스토랑 : 월-목 12:00-23:00, 금-토 12:00-24:00</p><p><strong>가까운 지하철 역 :&nbsp;</strong>RER A,B,D, Chatelet - Les Halles역, M4 Les Halles역, M4 Etien Marcel역</p><p><br></p><p>참고사이트 :</p><p><a href=\"http://blog.naver.com/PostView.nhn?blogId=95773321&amp;logNo=220629410460&amp;parentCategoryNo=&amp;categoryNo=2&amp;viewDate=&amp;isShowPopularPosts=true&amp;from=search\">http://blog.naver.com/PostView.nhn?blogId=95773321&amp;logNo=220629410460&amp;parentCategoryNo=&amp;categoryNo=2&amp;viewDate=&amp;isShowPopularPosts=true&amp;from=search</a></p><p>&nbsp;</p><p><br></p><p><br></p><p><span style=\"font-size: 18px;\"><strong><u>2. Le comptoir de la gastronomie</u></strong></span></p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 751px; height: 242.78px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522317218417-%ED%91%B8%EC%95%84%EA%B7%B8%EB%9D%BC_%EB%A7%9B%EC%A7%9102_originRe.jpg\"></p><p><br></p><p><span style=\"font-size: 12px;\">'Le comptoir de la gastronomie'에서&nbsp;</span>푸아그라 요리중 제일 맛있는걸 추천 받은게 아래 푸아그라 라비올리라고 한다. 크림소스에 라비올리(이탈리아식 만두)를 넣어서 먹는것 같은데 굉장히 부드럽고 느끼할것 같은 아주 맘에든다 ㅎ&nbsp;</p><p>라비올리안은 푸아그라로 채워져 있다고  한다.</p><p><br></p><p style=\"text-align: center;\"><a href=\"http://blog.naver.com/PostView.nhn?blogId=95773321&amp;logNo=220629410460&amp;parentCategoryNo=&amp;categoryNo=2&amp;viewDate=&amp;isShowPopularPosts=true&amp;from=search\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 586px; height: 244px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522316948744-%ED%91%B8%EC%95%84%EA%B7%B8%EB%9D%BC_02_originRe.JPG\"></a></p><p style=\"text-align: center;\">&lt;푸아그라 라비올리&gt;</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: justify;\">식전음식으로 에스카르고(달팽이) 요리가 &nbsp;나오는데 아주 맛있다고 한다. :)</p><p style=\"text-align: justify;\"><br></p><p style=\"text-align: justify;\"><br></p><p style=\"text-align: center;\"><strong><span style=\"color: rgb(226, 80, 65);\">아래는 주요 정보 !!!</span></strong></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 653px; height: 195.2px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522317102206-%ED%91%B8%EC%95%84%EA%B7%B8%EB%9D%BC_%EB%A7%9B%EC%A7%9102_%EC%A7%80%EB%8F%84_originRe.jpg\"></p><p><br></p><p>주소 : 34 rue montmartre, 75001, Paris</p><p>전화번호 : 01 42 33 31 32</p><p>운영시간 : 월~목 12:00 ~23:00, 금~토 12:00~00:00, 일요일 휴무</p><p><br></p><p>참고사이트 :&nbsp;</p><p><a href=\"http://blog.naver.com/PostView.nhn?blogId=airfrancekr&amp;logNo=220681484279\">http://blog.naver.com/PostView.nhn?blogId=airfrancekr&amp;logNo=220681484279</a></p><p><br></p><p><strong><span style='font-size: 18px;'>여행을 위한 자금 마련하자!!</span></strong></p><p><br></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><strong><span style=\"font-size: 14px;\">8박 9일 여행경비 체크!!!</span></strong></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: justify;\">1. 비행기 (직항) : 왕복 약 1,100,000 원 <a href=\"https://www.skyscanner.co.kr/\"></a></p><p style=\"text-align: justify;\">2. 숙소 : 약 40만원 ~ 60만원 (에어비엔비 - 집전체)</p><p style=\"text-align: justify;\">3. 기타 경비 : 약 150 ~ 200 만원</p><p style=\"text-align: justify;\"><a href=\"https://www.skyscanner.co.kr/\"></a></p><p style=\"text-align: justify;\"><br></p><p style=\"text-align: center;\"><span style=\"font-size: 14px;\"><strong>총경비 : 약 300 ~ 400만원!!!!!</strong></span></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">&lt;참고사이트&gt;</p><p style=\"text-align: center;\">비행기 : <a href=\"https://www.skyscanner.co.kr/\">https://www.skyscanner.co.kr/</a></p><p style=\"text-align: center;\"><a href=\"https://www.airbnb.co.kr/?logo=1\"></a><a href=\"https://www.airbnb.co.kr/?logo=1\"></a>숙소 : <a href=\"https://www.airbnb.co.kr/?logo=1\">https://www.airbnb.co.kr/?logo=1</a></p><p style=\"text-align: center;\"><a href=\"https://www.skyscanner.co.kr/\"></a></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">아..... 적은돈이 아니구나 그래도!!! 모아보자!!</p><p style=\"text-align: center;\">우선 이 계획을 위해 만든 통장!!! 짜잔!!!</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 414px; height: 273.28px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522376896894-%ED%86%B5%EC%9E%A5_originRe.jpg\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">이제 여기다가 매달 30만원씩..... 적금처럼 모아주겠으</p><p style=\"text-align: center;\">그리고 여행 필수 카드 VIVA G카드!!!</p><p style=\"text-align: center;\">수수료가 이 카드만큼 싼게 없더구 만 ㅎㅎㅎㅎ</p><p style=\"text-align: center;\"><br></p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "Zg4LqhcA9ukHQLqXg",
    "title" : "그림쟁이의 '잇' 아이템  '신티크 프로 13' 겟 하기!!",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "folder" : "bucketlist_images/",
            "bucketUrl" : s3bucketPath,
            "fileName" : "1522387652814-%EC%8B%A0%ED%8B%B0%ED%81%AC+%ED%94%84%EB%A1%9C",
            "extension" : "jpg",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [
        "신티크 프로",
        "신티크",
        "와콤",
        "타블렛",
        "와콤팬",
        "13인치",
        "디자인",
        "그림"
    ],
    "category" : "BL0005",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p style=\"text-align: center;\"><span style=\"font-size: 14px;\"><strong>최근들어 <span style=\"color: rgb(226, 80, 65);\"><strong>그림</strong></span>그리는 취미가 생겼다.</strong></span></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">그러다가 알게된 와콤 타블릿!!!</p><p style=\"text-align: center;\">그리고 그 왕좌자리를 꿰차고 있는&nbsp;</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><span style=\"font-size: 14px;\"><span style=\"color: rgb(226, 80, 65);\"><strong>!! 와콤 신티크 !!&nbsp;</strong></span></span>&nbsp;</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><span style=\"font-size: 18px;\">겟</span>해주겠어!!</p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 411px; height: 264px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522387652814-%EC%8B%A0%ED%8B%B0%ED%81%AC+%ED%94%84%EB%A1%9C_originRe.jpg\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 442px; height: 264px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522387646153-%EC%8B%A0%ED%8B%B0%ED%81%AC+%ED%94%84%EB%A1%9C02_originRe.jpg\"></p><p><br></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>신티크 프로 13 알아보기</span></strong></p><p><br></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><strong>아래는 와콤사이트에서 제공하는&nbsp;</strong></p><p style=\"text-align: center;\"><strong>Cintiq Pro 13 소개 내용이다</strong></p><p><br></p><p>Wacom Cintiq Pro 13은 Wacom의 가 장 발전된 크리에이티브 펜 디스플레이입니다. 펜으로 직접 화면 위에 그리는 작업을 하는 전문 아티스트와 디자이너들을 위해  제작되었습니다. Wacom의 획기적인 최신 기능이 집약되어 있고 매우 정교한 Wacom Pro Pen 2가 포함된 Wacom Cintiq Pro 13은 컴팩트하지만 기능은 결코 약하지 않습니다.</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 511px; height: 264px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522394593730-%EC%8B%A0%ED%8B%B0%ED%81%AC+%ED%94%84%EB%A1%9C03_originRe.jpg\"></p><p style=\"text-align: center;\">뭐 간단히 정리해보면&nbsp;</p><p style=\"text-align: center;\">매우 정교한 와콤프로팬을 이용해서&nbsp;</p><p style=\"text-align: center;\">13인치 디스플레이모니터에&nbsp;</p><p style=\"text-align: center;\">직접 그림작업을 할 수 있다는 말인것 같다.</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">추가적으로 좀더 설명하자면</p><p style=\"text-align: center;\">자체적인 OS를 갖 고 있지 않고</p><p style=\"text-align: center;\">Windows나 Mac OS를 가진 컴퓨터</p><p style=\"text-align: center;\">연결하여 모니터 처럼 화면을 띄우고</p><p style=\"text-align: center;\">포토샵이나 일러스트같은</p><p style=\"text-align: center;\"> 디자인 프로그램을 실행해서</p><p style=\"text-align: center;\">디스플레이 위에 팬으로 작업을 할 수 있는</p><p style=\"text-align: center;\">팬 디스플레이인 것이다</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 435px; height: 85.4px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522394300431-%EC%8B%A0%ED%8B%B0%ED%81%AC13+%EC%8B%AC%ED%94%8C%EC%8A%A4%ED%8C%A9_originRe.jpg\"></p><p style=\"text-align: center;\">좀 더 자세한 스팩은 아래 사이트에서 확인할 수 있다.</p><p style=\"text-align: center;\"><br></p><p><a href=\"https://www.wacom.com/ko-kr/products/pen-displays/wacom-cintiq-pro-13\">https://www.wacom.com/ko-kr/products/pen-displays/wacom-cintiq-pro-13</a></p><p><br></p><p style=\"text-align: center;\">와콤  쇼핑몰에서 표시된 정가는</p><p style=\"text-align: center;\"><span style=\"font-size: 14px;\"><strong>1,290,000</strong></span>원이다.....</p><p style=\"text-align: center;\">ㅎㄷㄷ한 가격...T^T</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">다른 쇼핑몰 사이트를 뒤져보면</p><p style=\"text-align: center;\">좀더 싼 가격으로 구매할 수 있겠지 만...</p><p style=\"text-align: center;\">그래도 100만원 안팍의 가격일거라고 생각된다.</p><p style=\"text-align: center;\">(무지 비싸네....)</p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 509px; height: 203.74px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522395180900-%EC%8B%A0%ED%8B%B0%ED%81%AC%EC%A0%95%EA%B0%80_originRe.jpg\"></p><p><br></p><p><strong><span style='font-size: 18px;'>신티크 가격 알아보기 !!!</span></strong></p><p><br></p><p>129만원상당의 신티크를 최저가로 찾아본 결과.....</p><p>가격에 큰 변화가 없다느걸 알았다....</p><p>제일 싼가격이 해외구매로 100만원 정도;;;;;</p><p>보통 할인된 가격을 보니 거의 1~2만원 정도 할인된 가격이다...</p><p>결국 재 값주고 사야된다는 말이 된다..T^T</p><p><br></p><p>좀 더 알아보고 총알 마련 계획을 세워야 겠다</p><p><br></p><p><strong><span style='font-size: 18px;'>내게로 온 '신티크 프로' !!!</span></strong></p><p><br></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><span style=\"font-size: 14px;\">드뎌 왔구나</span></p><p style=\"text-align: center;\"><span style=\"font-size: 14px;\">연말에 나에게 주는 큰 선물 ㅎㅎ</span></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><span style=\"color: rgb(226, 80, 65);\"><span style=\"font-size: 14px;\"><strong>!!!!! 신티크 !!!!!</strong></span></span></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 523px; height: 243px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522401123758-%ED%9B%84%EA%B8%B0_%EC%8B%A0%ED%8B%B0%ED%81%AC_originRe.jpg\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">상자도 넘나 이쁜것</p><p style=\"text-align: center;\">열어보면은~</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 433px; height: 244px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522401161355-%ED%9B%84%EA%B8%B0_%EC%8B%A0%ED%8B%B0%ED%81%AC02_originRe.jpg\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 576px; height: 243px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522401186288-%ED%9B%84%EA%B8%B0_%EC%8B%A0%ED%8B%B0%ED%81%AC03_originRe.jpg\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">디스플레이를 들면&nbsp;</p><p style=\"text-align: center;\">그 밑에 연결 선과 액세서리들이 가지런하게 ㅎㅎㅎ</p><p style=\"text-align: center;\">팬 이쁜거 보소~</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">기왕이면 더 넓은 16인치를 살까 생각도 했지만&nbsp;</p><p style=\"text-align: center;\">13인치가 딱 적당한 느낌~!!!</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 531px; height: 254px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522401263513-%ED%9B%84%EA%B8%B0_%EC%8B%A0%ED%8B%B0%ED%81%AC04_originRe.jpg\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">후다닥 연결을 하고나면은~</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 598px; height: 244px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522401556038-%ED%9B%84%EA%B8%B0_%EC%8B%A0%ED%8B%B0%ED%81%AC06_originRe.jpg\"></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 436px; height: 242.78px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522401438784-%ED%9B%84%EA%B8%B0_%EC%8B%A0%ED%8B%B0%ED%81%AC05_originRe.jpg\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">따란~&nbsp;</p><p style=\"text-align: center;\">준비완료~ ㅎㅎㅎㅎ</p><p style=\"text-align: center;\">선이 좀 많아서 지저분 해보이긴 하지만</p><p style=\"text-align: center;\">잘 정리하면 되겠다는 느 낌적인 느낌</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 485px; height: 317.2px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522401535968-%ED%9B%84%EA%B8%B0_%EC%8B%A0%ED%8B%B0%ED%81%AC07_originRe.jpg\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">앞으로 뭐가 될지는 모르겠지만</p><p style=\"text-align: center;\">너로다가  기가맥힌 캐릭터를 디자인해주겠오</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">미션 완료!!!</p><p><br></p><p><strong><span style='font-size: 18px;'>총알 장전 완료!!</span></strong></p><p><br></p><p>드디어 총알장전 완료!!</p><p>이제 사는일만 남았다. 우워!!!!</p><p><br></p><p>3개월동안 안쓰고 안먹느라 고생한 나 스스로에게 주는 선물!</p><p>쫌만 기다려 신티크~</p><p>바로 주문해주겠오!!</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 532px; height: 274px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522396356872-%EC%8B%A0%ED%8B%B0%ED%81%AC+%ED%94%84%EB%A1%9C04_originRe.jpg\"></p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "hwuvXPsPeajxDKK9h",
    "title" : "가족과 함께 클라이밍 체험!! 클라이밍카페 가보기 ''",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "folder" : "bucketlist_images/",
            "bucketUrl" : s3bucketPath,
            "fileName" : "1522312992297-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+5.42.30",
            "extension" : "png",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [
        "클라이밍",
        "암벽타기"
    ],
    "category" : "BL0004",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p style=\"text-align: center;\">솔직히 김자인선수가 유명해지기 전에는 관심도 없었는데&nbsp;</p><p style=\"text-align: center;\">어느날 아무생각 없이 경기를 보던중 갑자기 '나도 해볼수 있나 싶어 찾아 봤다'<br><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522312992297-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+5.42.30_originRe.png\"></p><p style=\"text-align: center;\">그런데 생각보다 클라이밍 센터가 한국에 많았다.</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">아이들도 할수 있는것 같던데 아이들이랑 가봐야겠다.</p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522313635827-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+5.53.32_originRe.png\"></p><p style=\"text-align: center;\"><br></p><p><br></p><p><strong><span style='font-size: 18px;'>장소는 어디? 장비는 필요??</span></strong></p><p><br></p><p style=\"text-align: center;\">서울주변 클라이밍 센터를 찾아보는데</p><p style=\"text-align: center;\">&nbsp;15짜리 암벽을 체험할수 있는 곳이 있었다.<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 357px; height: 353.43px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522314582117-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+6.09.33_originRe.png\"></p><p style=\"text-align: center;\">인천 디스커버리 클라임스퀘어 라는 곳인데</p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 366px; height: 272.06px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522314665165-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+6.10.57_originRe.png\"></p><p><br></p><p>장비 구매할 필요 도 없고 체험비용만 주면 하루를 이용 할 수 있다고 한다.</p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>첫 클라이밍 생각보다 높네...</span></strong></p><p><br></p><p style=\"text-align: center;\">일산에서 출발한지 40여분 정 도 걸린듯하다.</p><p style=\"text-align: center;\">국내에서 가장큰지는 모르겠지만 실내 15미터 이상 암장은</p><p style=\"text-align: center;\">흔하지 않다고 한다.</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522314979127-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+6.16.12_originRe.png\"></p><p style=\"text-align: center;\">일단 1인 3만 5천원 강습권으로 강습을 받았다.</p><p style=\"text-align: center;\">클라이밍 강습 선생님이 친절하게 알려주셔서 어려움은 없었는데</p><p style=\"text-align: center;\">운동을 너무 안했더 니 조금하고 팔이 후덜덜거려서 추락...<img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522315433320-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+6.23.42_originRe.png\"></p><p style=\"text-align: center;\">카페 테리아에서 조금 쉬다가 15미터 암장으로 향했다.</p><p style=\"text-align: center;\">보기엔 무서운데 막상올라보니....</p><p style=\"text-align: center;\">당연히 무섭다... 적당히 11미터 정도가서 내려왔 다.</p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522315567385-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+6.25.51_originRe.png\"></p><p style=\"text-align: center;\">한번 해보니 너무 매력있는 스포츠인거 같아&nbsp;</p><p style=\"text-align: center;\">계속 해보고 싶어 강습비랑 장비 물어보고 관뒀다</p><p style=\"text-align: center;\">돈도 시간도 부족해서....</p><p style=\"text-align: center;\">그냥 다음에 1일권으로 또 놀러와야지.</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><br></p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "mCt8neJBfxMiuesE5",
    "title" : "가족과 함께 서울 둘레길 투어하기",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "folder" : "bucketlist_images/",
            "bucketUrl" : s3bucketPath,
            "fileName" : "1522395802146-%EC%BA%A1%EC%B2%98",
            "extension" : "JPG",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [
        "서울둘레길",
        "트래킹",
        "운동",
        "가족",
        "버킷리스트"
    ],
    "category" : "BL0004",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p>주중에 회사에서 앉아만 있다가 주말에는 피곤해서 외출을 거의 안하다 보니 다리 근력도 약해진것 같고 건강도 좋지 못한것 같다</p><p><br></p><p>걷기운동이라도 좀 하면 좋을 것 다는 생각에 서울 둘레길 투어를 가족과 함께 해보려고 한다</p><p><br></p><p>서울의 모든 둘레길을 돌고 나면 건강도 얻고 해냈다는 성취감도 얻을 수 있을것 같다</p><p><br></p><p>서울 둘레길은</p><p>남산, 낙산, 인왕산, 북악산 등 내사산과 4대문을 잇는</p><p>내사산<span>&nbsp;</span>둘레길(한양 도성길) 18.6km와</p><p>관악산, 북한산, 대모산, 수락산, 봉산, 아차산<span>&nbsp;</span>(실제 외사산은 북한산,관악산,아차산,덕양산) 등 서울의 외곽을 한 바퀴 도는 외사산 둘레길(서울둘레길) 157km가 있다</p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 404px; height: 234.96px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522395802146-%EC%BA%A1%EC%B2%98_originRe.JPG\"></p><p><br></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>서울 둘레길과 트래킹 주의사항</span></strong></p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522404147007-sbu2_img06_originRe.jpg\"></p><p style=\"text-align: center;\">[이 마크를 잘 따 라 다녀야 길을 잃지 않는다]</p><p><br></p><p>서울 둘레길은 8개 코스 157km(숲길 85km, 하천길 32km, 마을길 40km)로 서울의 역사, 문화, 자연생태 등을 스토리로 엮어 탐방객들이 느끼고, 배우고, 체험할 수 있도록 조성한 도보길이다.</p><p><br></p><p>둘레길 곳곳에 휴게시설과 북카페, 쉼터를 만들어 시민들이 자연스럽게 휴식을 취할 수 있고, 전통 깊은 사찰과 유적지을 연결해 서울의 역사와 문화, 자연생태를<span>&nbsp;</span>곳곳에서 체험할 수 있도록 조성하였다.<br>대중교통으로 접근하기 쉬우며 주로 경사가 심하지 않은 흙길로 되어 있어 누구나 안전하고 편안하게 이용할 수 있다.</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522402487734-141589050615_20141114_originRe.jpg\"></p><p><br></p><p>서울 둘레길을 다니는 또하나의 재미는 스 탬프 모으기 이다</p><p>둘게길 곳곳에 우체통을 재활용한 28개의 스탬프 시설이 있다</p><p>스탬프 안의 그림들은 모두 특별한 의미를 담고 있다고 한다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 381px; height: 153.72px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522403884891-sbu2_img07_originRe.jpg\"></p><p><br></p><p>스탬프를 모두 모으면 서울 둘레길 완주 인증서를 받을 수 있다</p><p>인증서는 스탬프 북을 들고 1코스 초입에 있는 창포원 서울 둘레길 안내센터에서 발급 받을 수 있다</p><p>수요일을 제외한 주말까지 업무를 본다고 하니 참고하자</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 154px; height: 220.22px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522404114898-print_seoul02_originRe.jpg\"></p><p><br></p><p>트레킹은 비교적 경사가 낮아 가볍게 생각하는 사람들도 있지만 트레킹도 산을 따라 다니기 때문에 잘 준비해야한다</p><p><br></p><p>일반 운동화 보다는 <strong>트레킹화</strong>를 신는것이 좋다</p><p>트래킹화를 신어야 미끄러짐이 덜하고 발을 보호 할 수  있다</p><p>트래킹화가 없다면 경등산화도 괜찮다</p><p>바닥이 두껍고 미끄럽지 않은 운동화가 있다면 대체해도 무방하다</p><p><br></p><p><strong>복장</strong>은 체온 변화에 대처하기 위해 두꺼운 점퍼 하나 보다는 얇은 옷을 두 겹 정도 껴입는 것이  좋으며 바지는 청바지 처럼 딱 붙는 것보다는 신축성있는 바지가 활동하기 편하다</p><p><br></p><p><strong>배낭</strong>은 클 필요는 없지만 하나 정도 챙겨서 물과 간식, 여분의 옷 한벌 정도를 챙겨두면 좋다</p><p><br></p><p>또 사전에 <strong>코스정보</strong>를 확인해 길을 잃지 않을수 있도록 준비하고 트래킹 당일 <strong>날씨</strong>도 사전에 체크해 비오는 날 가족들을 고생시키는 불상사가 없도록 주의해야 한다</p><p><br></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>1코스 출발!</span></strong></p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 413px; height: 753.96px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522405070212-1%EC%BD%94%EC%8A%A4_originRe.jpg\"></p><p><br></p><p>토요일 아침 아홉시에 집에서 출발해서 도봉산 역에 10시쯤 도착했다 간단히 김밥을 먹고 창포원으로 향했다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522405777134-20180226_092410_originRe.jpg\"></p><p><br></p><p>창포원 입구에서 좌측에는 서울 둘레길 안내센터가 있다</p><p>여기서 지도와 스탬프 북을 배포하니 받아가면 된다</p><p>스탬프를 모두 모으고 나면 다시 이곳에서 완주인증서를 발급받을&nbsp;</p><p>수 있다</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522405875840-20180226_093006_originRe.jpg\"></p><p><br></p><p>창포원은 아직 추운날씨라 꽃이 피지 않아 적막 했다</p><p>창포원을 나와 일반도록와 다리를 건너 수락산 입구로 향했다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522405935094-%EC%BA%A1%EC%B2%98_originRe.JPG\"></p><p><br></p><p>엊그제 내린 눈이 아직 다 녹지 않았다 길은 미끄러웠지만</p><p>눈이  내린 산의 고요함이 마음에 들었다</p><p><br></p><p>산에서는 계단의 주황색 표시와 나무에 매단 주황색 표시끈을 잘 따라다녀 야 길을 잃지 않는다 중간중간 지도도 확인하고 길을 헤매 다시 오르는 일이 없도록 주의하자</p><p><br></p><p>수락산은 화강암과 모래로 이루어져 기암괴석이 많고 과거 채석장으로도 쓰였다 높이는 638m, 수락산은 옥류동, 금류동, 은선동 3폭포가 아름다 운 경관을 이루고 있어 물이 떨어진다는 뜻에서 유래됐다<span>&nbsp;</span></p><p>길을 따라 배바위, 고래바위, 거인발자국바 위, 채석장터, 사색의 바위, 거인손자국바위, 연인바위, 작은채석장, 남근석, 공룡바위, 여근석, 인사바위가 나타난다</p><p><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522406142165-20180226_103748_originRe.jpg\">[배바위]</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522406173289-20180226_105921_originRe.jpg\"></p><p style=\"text-align: center;\">[거인 발자국 바위]</p><p style=\"text-align: center;\"><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 204px; height: 363.051px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522406280614-20180226_111254_originRe.jpg\"></p><p style=\"text-align: center;\">[채석장터]</p><p><br></p><p>채석장 전망대를 지나 수락산 기슭을 따라 내려오면 덕암폭포를 볼수 있다</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522406493371-%EC%BA%A1%EC%B2%98_originRe.JPG\"></p><p style=\"text-align: center;\">[덕암폭포]</p><p><br></p><p>수락산을 내려와 당고개역을 통과해 불암산 쪽으로 이동했다</p><p>여기부터가 후반부라고 생각하면 될것이다&nbsp;</p><p>힘이 든다면 당고개역으로 돌아갔다 다음에 다시 후반부를 이어가는 것도 좋은 선택이다</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522406657446-%EC%BA%A1%EC%B2%98_originRe.JPG\"></p><p><br></p><p>불암산 은 테마별로 길이 나누어져 있는데 희망길과 설화길이 대표적이다 테마가 있기 때문에 원하는 길을 선택해 걷는 재미가 있다</p><p><br></p><p>마을과 둘레길이 교차하는 모퉁이에 우리나라 어느 지역에서나 흔하게 보는 남근석이 있었다 좀 더 길을 따라 걸 으면 흔하지 않은 여근석도 나온다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522406884080-%EC%BA%A1%EC%B2%98_originRe.JPG\"></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522406923145-%EC%BA%A1%EC%B2%98_originRe.JPG\"></p><p style=\"text-align: center;\">[남근석과 여근석]</p><p><br></p><p>1코스의 마지막은 화랑대 역이다 서울 둘레길의 장점 중 하나가 대중교통 이용이 쉬운점이다 가다 지치면 지하철이나 버스를 타고 집으로 돌아오고 다음을 기약할 수 있다</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522407084600-%EC%BA%A1%EC%B2%98_originRe.JPG\"></p><p style=\"text-align: center;\">[스탬프 찍는것을 잊지말자]</p><p><br></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>2코스 출발!</span></strong></p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 395px; height: 690.52px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522407792031-2%EC%BD%94%EC%8A%A4_originRe.jpg\"></p><p>묵동천-망우산-용마산-아차산으로 이어지는 제 2코스는 산 능선을 따라 트레킹하는 코스로서 서울 둘레길 중에 주변 조망이 가장 수려한  코스로 알려져 있다</p><p><br></p><p>지난 1코스의 끝이었던 화랑대역에서 다시 출발한다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522408200883-CYMERA_20151213_094945_originRe.jpg\"></p><p><br></p><p>묵동천을 따라 편한 길을 걷는다</p><p>묵동은 먹 을것을 만들던 곳이라는 먹골의 한자이다&nbsp;</p><p>뭘 먹을걸 만들던 동네 였는지는 모르겠지만....</p><p><br></p><p>묵동천 길은 꽃이 피고 나면 다시 오면 좋을 정도로 이쁜 길이다</p><p>이 동네 사람들은 좋은 산책로를 가지고 있겠구나 하는 생각에 부러웠다</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522408269251-CYMERA_20151213_095222_originRe.jpg\"></p><p><br></p><p>길을 따라 계속 걷다 양원역을 지나면 중랑캠핑숲이 나온다</p><p>중랑캠핑숲은 피크닉을 주제로한 체험형 공원으로, 청소년 중심의 문화 중심 공원으로 조성되었다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522408593071-CYMERA_20151213_112023_originRe.jpg\"></p><p><br></p><p>중랑캠핑숲을 빠져 나오면 망우묘지공원으로 이어진다</p><p>예전에 이 근처에 살았는데 망우리 공동묘지라고 어릴때 무서운 얘기들이 많았는데 지금은 산책로가 잘 꾸며져 많은 사람들이 찾는다</p><p>묘지 공원이니 만큼 산 책로 옆에 무덤이 있기도 하다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522408735067-CYMERA_20151213_114224_originRe.jpg\"></p><p><br></p><p>길을 따라 용마산으로 넘어가면 깔딱고개 초입에 스탬프 우체통이 있다 찍고 가자</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522408834092-CYMERA_20151213_124005_originRe.jpg\"></p><p><br></p><p>깔딱고개 계단이 많아 중간 중간 휴식을 취하며 천천히 올랐다</p><p>깔딱고개를 오르는 동안 조망이 좋아 천천히 올라도 좋았다</p><p><br></p><p>조망은 충분히 감상한것 같아 용마산 정상으로 올라가지 않고 아차산으로 바로 이동했다</p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522409219687-%EC%BA%A1%EC%B2%98_originRe.JPG\"></p><p><br></p><p>아차산에 만들어진 보루는 삼국시대 고구려의 남진정책을 위한 전초기지였다고 한다<img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522409354846-%EC%BA%A1%EC%B2%98_originRe.JPG\"></p><p><br></p><p>아차산 보루에서  내려오는 길에 아차산성이 있다 둘레가 약 1000미터 이상의 성벽이 구축되어 있고 성문지가 남아 있다</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522409562783-%EC%BA%A1%EC%B2%98_originRe.JPG\"></p><p>관리사무소 입구에 있는 스탬프 잊지말자!</p><p><br></p><p>일주일에 한코스 씩 두코스를 다녀왔는데 점점 봄의 기운이 느껴진다</p><p><br></p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "p7JbXSYJT3u9JfWyC",
    "title" : "이연복쉐프 식당 '목란'에서 동파육 먹어보기!!",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "folder" : "bucketlist_images/",
            "bucketUrl" : s3bucketPath,
            "fileName" : "1522386793927-%EB%AA%A9%EB%9E%80_%EB%8F%99%ED%8C%8C%EC%9C%A103",
            "extension" : "jpg",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [
        "이연복",
        "동파육",
        "목란",
        "예약",
        "중화요리"
    ],
    "category" : "BL0002",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><span style=\"font-size: 14px;\"><strong>먹방</strong></span>이 많아지는 가운데&nbsp;</p><p style=\"text-align: center;\"><span style=\"font-size: 14px;\"><strong>냉.부.</strong></span>를 보다가 문득 <span style=\"font-size: 14px;\"><strong>이연복 쉐프</strong></span>의<strong>&nbsp;<span style=\"color: rgb(226, 80, 65);\"><span style=\"font-size: 14px;\">동파육</span></span></strong>을&nbsp;</p><p style=\"text-align: center;\">한번 먹어보고 싶다는 생각이 들었다.</p><p style=\"text-align: center;\">예약을 거의 <span style=\"font-size: 14px;\"><strong>한 달&nbsp;</strong></span>전에 해야된다고 하던데..</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">뭐 있어~ 바로 예약해보자!!</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 451px; height: 525.36px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522386793927-%EB%AA%A9%EB%9E%80_%EB%8F%99%ED%8C%8C%EC%9C%A103_originRe.jpg\"></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 398px; height: 414.48px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522382919771-%EB%8F%99%ED%8C%8C%EC%9C%A1_originRe.jpg\"></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>'목란' 식당 정보 확인!!!!!</span></strong></p><p><br></p><p><strong>위치 :</strong></p><p>서울 서대문구 연희로15길 21</p><ul><li><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 392px; height: 214px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522383783414-%EB%AA%A9%EB%9E%80%EC%A7%80%EB%8F%84_originRe.jpg\"></li></ul><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 430px; height: 239px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522383978936-%EB%AA%A9%EB%9E%80_originRe.jpg\"></p><p><br></p><p><strong>영업시간 :</strong></p><p>매일 11:30 - 15:00오전오픈 , &nbsp;점심마감 14:30</p><p>매일 17:00 - 22:00저녁오픈 , &nbsp;저녁마감 21:30</p><p>매일 15:00 - 17:00 Break time</p><p><strong><br></strong></p><p><strong>매뉴 :</strong></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 668px; height: 319.64px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522383887929-%EB%AA%A9%EB%9E%80_%EB%A7%A4%EB%89%B4_originRe.jpg\"></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 519px; height: 89.06px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522384063756-%EB%AA%A9%EB%9E%80_%EB%A7%A4%EB%89%B42_originRe.jpg\"></p><p><br></p><p><strong><span style='font-size: 18px;'>예약 완료!!!!</span></strong></p><p><br></p><p><br></p><p><span style=\"font-size: 18px;\"><span style=\"color: rgb(226, 80, 65);\"><strong>D-Day</strong></span></span>는 바로 약 한달 뒤인 <span style=\"color: rgb(226, 80, 65);\"><span style=\"font-size: 18px;\">2월 23일</span></span>!!!!</p><p><br></p><p>예약매뉴로 <span style=\"font-size: 14px;\"><strong> 동파육</strong></span>을 주문했다 후훗</p><p><br></p><p>한달이나 기다려야 한다니.....T^T</p><p>그래도 금방가겠지</p><p> 기대가 되는구만 ㅎㅎㅎㅎㅎ</p><p><br></p><p><strong><span style='font-size: 18px;'>동파육 정복 성공!!</span></strong></p><p><br></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><span style=\"font-size: 14px;\"><strong>드디어 대망의 23일!!!</strong></span></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">늦지않게 가려구 허둥대다가 휴대폰 떨궜다ㅜㅜ</p><p style=\"text-align: center;\">뭐 동파육이 달래주겠지 후훗!!</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">부릉부릉 버스타고 연희동으로 출발~</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">정류장에 내려서 쪼금 걸어들어가니 식당이 보인다!!!&nbsp;</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">식당안으로 들어가 예약확인후&nbsp;</p><p style=\"text-align: center;\">직원이 친절하게 우리자리로 안내해 줬다.</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">몰랐는데 생활의 달인에도 나오셨나부다 ㅎㅎㅎ</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 512px; height: 246.44px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522384927398-%EB%AA%A9%EB%9E%80_%EB%8B%AC%EC%9D%B8_originRe.jpg\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">사전 예약했던 동파육과&nbsp;</p><p style=\"text-align: center;\">B코스 요리를 시켰다</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 447px; height: 244px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522385236932-%EB%AA%A9%EB%9E%80_%EB%8F%99%ED%8C%8C%EC%9C%A102_originRe.jpg\"></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 408px; height: 244px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522385252573-%EB%AA%A9%EB%9E%80_%EB%8F%99%ED%8C%8C%EC%9C%A1_originRe.jpg\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">두툼한 동파육이 먼저 나 왔다 ㅎㅎ</p><p style=\"text-align: center;\">아주 먹음직 스럽구만 ㅎㅎ</p><p style=\"text-align: center;\">살짝 보쌈같은 느낌도 있는것이 매우 만족 스러운 비쥬얼~</p><p style=\"text-align: center;\">맛은 음..... 수육을 어떤 양념에 절인듯한~!!!</p><p style=\"text-align: center;\">따뜻할때 먹으니 입에서 살살 녹는다 ㅎ</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">이어서 코스요리들이 하나씩 나왔다</p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 443px; height: 244px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522385213887-%EB%AA%A9%EB%9E%80_%EA%B2%8C%EC%82%B4%EC%9C%A0%EC%82%B0%EC%8A%AC_originRe.jpg\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">게살 유산슬~ ㅎㅎ</p><p style=\"text-align: center;\">살이 부드럽고 향긋하며 매우 맛있었다</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 402px; height: 229.36px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522385656606-%EB%AA%A9%EB%9E%80_%ED%8C%94%EB%B3%B4%EC%B1%84_originRe.jpg\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">팔보채는 그렇게 좋아하는 요리는 아니지만</p><p style=\"text-align: center;\">약간 매콤하면서 해산물향이 물씬 풍기는게</p><p style=\"text-align: center;\">생각보다 괜찮다는 느낌까지 받았다.</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 457px; height: 242.78px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522385646009-%EB%AA%A9%EB%9E%80_%EA%B9%90%ED%92%8D%EA%B8%B0_originRe.jpg\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">뭐 말이 필요없는 깐풍기 ㅎㅎㅎ</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 401px; height: 244px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522385674581-%EB%AA%A9%EB%9E%80_%ED%81%AC%EB%A6%BC%EC%83%88%EC%9A%B0_originRe.jpg\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">크림새우는 처음 먹어보는데</p><p style=\"text-align: center;\">크림맛보다 요거트 맛이 강하게났다</p><p style=\"text-align: center;\">무튼 맛은 무지 좋다는 ㅎㅎㅎ</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 419px; height: 241.56px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522385689853-%EB%AA%A9%EB%9E%80_%EC%9E%90%EC%9E%A5%EB%A9%B4_originRe.jpg\"></p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">그리고 식사로 자장면이 나왔다</p><p style=\"text-align: center;\">양이 좀 작아 보이긴 하지만 코스를 먹고난 뒤라</p><p style=\"text-align: center;\">깔끔하게 딱 떨어졌다</p><p style=\"text-align: center;\">맛도 물론 !!!!! 쵝오</p><p style=\"text-align: center;\">자장면은 반죽은 손으로 하고&nbsp;</p><p style=\"text-align: center;\">면은 기계로 뽑는다고 한다.</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\">이날 이연복쉐프님도 못보고</p><p style=\"text-align: center;\">동파육이 캐존맛, 베뤼그뤠잇한 맛의 요리는 아니였지만</p><p style=\"text-align: center;\">꼭 먹어보고 싶었던 음식을 맛봐서 그런지</p><p style=\"text-align: center;\">나름 만족스런 하루였다.</p><p style=\"text-align: center;\"><br></p><p style=\"text-align: center;\"><span style=\"font-size: 14px;\"><strong>미션 컴플릿!!</strong></span></p><p style=\"text-align: center;\"><br></p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "pDhuiPmGRM3xDM6D8",
    "title" : "2018년 뮤직페스티발 가기",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "folder" : "bucketlist_images/",
            "bucketUrl" : s3bucketPath,
            "fileName" : "1522326638231-20180125040350_8-18-1024x526",
            "extension" : "jpg",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [
        "음악페스티벌",
        "뮤직페스티벌",
        "라이브",
        "공연",
        "버킷리스트"
    ],
    "category" : "BL0003",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p>음 악듣는것을 평소에 좋아하는데 라이브 공연은 많이 못가본것 같다</p><p><br></p><p>올해는 야외에서 열리는 뮤직페스티벌에 참가해서 좋아하는 뮤지션들의 라이브 공연을 실컷보고 힐링할 생각이다</p><p><br></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522326638231-20180125040350_8-18-1024x526_originRe.jpg\"></p><p><br></p><p><strong><span style='font-size: 18px;'>2018년에 열리는 뮤직페스티벌</span></strong></p><p><br></p><p>일정 이 확정되지 않은 페스티벌이 많이 있지만</p><p>매년 열리는 페스티벌들이 있으니 일단 좀 찾아보고 적당한 것을 골라봐야 겠다</p><p><br></p><p>1) 펜타포트 락페스티벌</p><p>국내 최초의 아웃도어 락페스티벌 아직 라인업이 정해진 것이 없다</p><p><a href=\"http://pentaportrock.com/\">http://pentaportrock.com/</a></p><p><br></p><p>2) 서울재즈페스티벌 (2018-05-19 ~20)</p><p>페스티벌의 꽃이라고 불리는 재즈페스티벌 , 외국 유명 뮤지션이 많이 참가한다 올해는 제시제이, 미스로린 힐 , 크리스 보티, 아이언&amp;와인 ,클린밴디트,라이 등이 참가한다</p><p><a href=\"http://www.seouljazz.co.kr/\">http://www.seouljazz.co.kr/</a></p><p><br></p><p>3) 월드 디제이 페스티벌 (2018-05-26~27)</p><p>국내 최초 EDM페스티벌&nbsp;</p><p><a href=\"http://www.wdjfest.com/\">http://www.wdjfest.com/</a></p><p><br></p><p>4) 울트라코리아 (2018-09.14~16)</p><p>울트라코리아도 EDM 페 스티벌이다. 한국 클럽 문화의 발전으로 EDM 페스티벌이 많이 생겼다고 한다</p><p><a href=\"https://umfkorea.com/\">https://umfkorea.com/</a></p><p><br></p><p>5) 그랜드 민트 페스티벌 /뷰민라</p><p>개인적으로 가장 좋아하고 취향이 맞는다. 국내 유명 뮤지션 부터 핫한 인디 뮤지션들이 참가한다&nbsp;</p><p>5월은 뷰민라 10월은 그랜드민트페스티벌이다</p><p>뷰민라 라인업은 2차까지 정해졌는데 역시 기대할 만한 뮤지션이 총출동한다</p><p><a href=\"https://www.mintpaper.co.kr/2018/03/b_m_l_2018-2nd-lineup-release/\">https://www.mintpaper.co.kr/2018/03/b_m_l_2018-2nd-lineup-release/</a></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522329440782-b_m_l_2018_2_n_d_lineup_p_o_s_t_e_r_web_originRe.jpg\"><br></p><p>6) 레인보우 아일랜드</p><p>캠핑 지에서 친구와 가족과 함께 추억을 쌓을수 있는 페스티벌이다</p><p><a href=\"http://www.rainbowfestival.co.kr/category/artist-2018/\">http://www.rainbowfestival.co.kr/category/artist-2018/</a></p><p><br></p><p>7) 그린플러그드 (05.19~20)</p><p>난지한강공원에서 즐기는 페스티벌이다 2차라인업까지 정해 졌는데 올해도 기대할 만한 뮤지션들이 많이 참가한다</p><p><a href=\"https://www.gpsfestival.com/last-lineup\">https://www.gpsfestival.com/last-lineup</a></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>어떤 공연을 볼까..</span></strong></p><p><br></p><p>모든 공연이 매력이 있어 여력이 된다 면 여러 공연을 보러가고 싶다</p><p><br></p><p>스트레스 풀고 싶으면 락페스티벌을 가고&nbsp;</p><p>신나게 춤을 추고 싶으면 EDM 페스티벌을 가면 된다</p><p>그와 상관없이 자신이 좋아하는 뮤지션이 참가하는 공연을 보러 가도 된다</p><p><br></p><p> 나는 올해 첫 공연으로 뷰민라(뷰티풀민트라이프)를 보기로 결정했다</p><p><br></p><p>이유는 집에서 가까운 올림픽공원에서 열리고 좋아하는 뮤지션이 많이 참가하기 때문이다</p><p><br></p><p>안녕하신가여영, 빌리어코스티, 선우정아, 이진아, 페퍼톤스, 문문,노리플라이, 정승환</p><p><br></p><p>뷰민라 공연이 열리고 바로 다음주에는 서울 재즈 페스티벌이 역시 올림픽공원에서 열린다</p><p>참가가 결정된 해외 뮤지션들의 음악을 들어 봤는데 신선하고 뭔가 힙한 느낌에 이공연도 여력이 된다면 보러 가고 싶다</p><p><br></p><p>티켓값이 생각보다 좀 비싸다 양일권을 끊으면 일인당 이십만원이 넘는다</p><p><br></p><p><span style=\"color: rgb(184, 49, 47);\">그동안 몰랐는데 라인업이 확정되지 않은채 얼리버드 티켓을 선판매하는데 기본가 보다 저렴하게  티켓을 구매할 수 있다(거의 반값)</span></p><p><img class=\"fr-dib mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522375834199-%EC%BA%A1%EC%B2%98_originRe.JPG\"></p><p><br></p><p>하반기 부터 열리는 공연은 얼리버드를 이용해 저렴하게 구입해야겠다</p><p><br></p><p>뮤직페스티벌 은 여러 뮤지션이 하루나 이틀내 동시에 공연하기 때문에 스테이지가 나눠져 동시에 좋아하는 뮤지션이 공연을 하기도 한다 이  정보는 타임테이블에 나오는데 아직 두 공연 모두 타임테이블이 정해지진 않았다</p><p><br></p><p>타임테이블이 정해지면 꼭 봐야할 뮤지션 위주로 일정을 계획할 것이다</p><p><br></p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "qAzvu54Wgp4c3MzQM",
    "title" : "이색 데이트 클레이 사격해보기",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "folder" : "bucketlist_images/",
            "bucketUrl" : s3bucketPath,
            "fileName" : "1522301044389-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.23.49",
            "extension" : "png",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [

    ],
    "category" : "BL0004",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p>와이프가 동네 BB 사격장에서 나보다 잘쏘고 신이 났는지 실탄 사격도 해보고 싶단다.&nbsp;</p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 321px; height: 211.811px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522301044389-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.23.49_originRe.png\"></p><p>&nbsp;</p><p>클레이 사격장에서 실탄 사격으로 현역출신의 위엄을 보여줘야 겠다.</p><p><br><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 400px; height: 254.76px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522301270474-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+2.27.34_originRe.png\"></p><p><br></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>화성시 양감면??</span></strong></p><p><br></p><p>서울에서 1시간에서 시간반 거리에 있는 화성시 양감면 경기도 종합 사격장 클레이 외에도 권총 실탄사격도 있는것 같은데, 따로 준비할건 없는듯  하다.<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 416px; height: 174.46px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522304972039-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+3.27.36_originRe.png\"></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>드디어 출발 그리고 아내의 첫 실탄 사격</span></strong></p><p><br></p><p>일산에서 출발 2시간 반정도 걸려서 도착한 경기도 종합 사격장&nbsp;<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 406px; height: 134.2px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522305495313-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+3.38.03_originRe.png\"></p><p>허름한 휴게소 같은 사격장</p><p><br></p><p>실탄 25발에 2만3천원 10발에 1만1천원 정도 하더군요.</p><p>청소년 가격도 있는거 보니 청소년도 사격을 할수 있는것 같 아요.</p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 386px; height: 273.28px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522306529010-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+3.55.20_originRe.png\"></p><p><br></p><p>카운터에서 번호표를 받고 귀마게와 조끼를 준비하고 있으면 번호표 순서로 사격장에서 사격을 합니다.</p><p>아내가 먼저 해보겠다고 의기양양하게 먼저 들어가서 사격을 했습니다.<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522306974787-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.02.36_originRe.png\">아내는 19개 전 21개로 아슬아슬하게 군필자의 자존심을 지켰네요...</p><p><br></p><p>다음엔 권총 실탄사격도 해봐야 겠습니다. 클레이 사격 재밌네요~</p><p><br></p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "y4hAxGkMP5zQwRS5h",
    "title" : "삿포로를 삿포로 맥주와 함께 즐겨보자",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "bucketUrl" : s3bucketPath,
            "folder" : "bucketlist_images/",
            "fileName" : "1522223625356-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.53.33",
            "extension" : "png",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [

    ],
    "category" : "BL0003",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p>세계4대 맥주축제중에 하나 삿포로 맥주축제에서 눈치보지 않고 한낮부터 맥주 마셔보자. 1km의 약 13000석이나 되는 비어가든에서 근교의 공장에서 배송되는 생맥주&nbsp;<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522223625356-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.53.33_originRe.png\"></p><p>그리고 훗카이도 제철음식을 함께 마눌님과 함께 즐겨보기!</p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522223808622-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.56.37_originRe.png\"></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>삿포로 여행 1일차</span></strong></p><p><br></p><p>평일 회사 반차를 쓰고 급하게 떠난 일본 삿포로 빨리온다고 왔지만 8시가 다되어 간다 술축제 임에도 저녁 9시면 끝난다고 하니 맘이 급하다.<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522224082863-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+5.01.15_originRe.png\"></p><p><br></p><p>시간이 없 어서 급한데로 아무데나 갔는데 산토리 부스 였다.</p><p><br><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522224274043-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+5.04.19_originRe.png\"></p><p><br><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522224344958-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+5.05.33_originRe.png\"></p><p><br></p><p>안주는 닭꼬치에 산토리 두잔 내일도 있지만 오늘이 아까워 급하게 한잔 ㅎㅎㅎ</p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522224440913-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+5.07.14_originRe.png\"></p><p><br></p><p><strong><span style='font-size: 18px;'>삿포로 맥주여행 2일차</span></strong></p><p><br></p><p>오늘은 삿포로 맥주박물관에 갑니다.</p><p>처음엔 선탕공장으로 지어져서 1987년에 박물관으로 개관 했다고 하네요<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522226563490-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+5.42.36_originRe.png\"></p><p><br></p><p>카운터에선 프리미엄 투어, 자유견학 중 선택할수 있는데 일본어가 안되는 저희는 자유 견학을 신청합니다.<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522226697323-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+5.44.49_originRe.png\"></p><p><br></p><p>거대한 발효탱크를 지나 2층으로 가면 삿포로 맥주<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522226790597-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+5.45.46_originRe.png\">관련 안내와 역사자료를 관람할수 있었어요</p><p>그리고 그 끝에는 드디어&nbsp;</p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522227260626-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+5.54.08_originRe.png\"></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522227332140-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-28+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+5.55.13_originRe.png\"></p><p> 삿포로 맥주 3종을 먹을수 있는데요 이중 삿포로 클래식은 훟카이도에서만 먹을수 있는 한정 판이라고 하네요</p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "zphsSW6nYMB6Ma2TG",
    "title" : "조용한 호수에서 바베큐 캠핑하기",
    "type" : "BL",
    "images" : [
        {
            "lat" : null,
            "lng" : null,
            "type" : "_originRe",
            "folder" : "bucketlist_images/",
            "bucketUrl" : s3bucketPath,
            "fileName" : "1522316796268-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+6.43.42",
            "extension" : "png",
            "imageClass" : "height-100"
        }
    ],
    "updateDate" : "2018-04-26 12:12",
    "tagList" : [
        "캠핑",
        "호수",
        "야영",
        "힐링캠프"
    ],
    "category" : "BL0004",
    "regDate" : "2018-04-26 12:12",
    "context" : "<p>우리나라 호수가에서 바베큐도 하고 야영도 하면서 도시탈출 해볼까?<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522316796268-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+6.43.42_originRe.png\"></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucketlist_images%2F1522316805238-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+6.46.24_originRe.png\"></p><p><br></p><p><br></p><p><strong><span style='font-size: 18px;'>캠핑장소 어디가 좋을까?</span></strong></p><p><br></p><p>음... 알아보니까 사유지에서 허가 받지 않는 이상 &nbsp;함부로 야외에서 취사가 금지 되어있다고 한다.</p><p><br></p><p>캠핑 야영 관련 법령 정보 사이트 &gt;</p><p><a href=\"http://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&amp;csmSeq=697&amp;ccfNo=3&amp;cciNo=1&amp;cnpClsNo=1\">http://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&amp;csmSeq=697&amp;ccfNo=3&amp;cciNo=1&amp;cnpClsNo=1</a></p><p><br></p><p>그래서 하는수 없이 찾은곳이 한탄강 유원지<img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522319663562-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+7.34.12_originRe.png\"><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522320046796-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+7.40.28_originRe.png\"></p><p>오토캠핑장은 성수기 3만원 이라고 하니 부담없이 가볼만 할것 같다.</p><p><br></p><p><strong><span style='font-size: 18px;'>기대보다 괜찮았던 한탄강 유원지</span></strong></p><p><br></p><p>원래 가고 하고 싶었던건 그림같은 호수 근처에서 캠프파이어를 하는 모습이었는데... 현실은 캠핑장 모퉁이 ㅋㅋㅋ</p><p><br></p><p><br><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522322729940-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+8.08.15_originRe.png\"></p><p><br>그래도 생각보다 괜찮았다 준성 수기라서 인지 사람이 그렇게 많지도 않고 오는길도 한산해서 좋았다</p><p><br></p><p><br><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522322748458-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+8.25.02_originRe.png\"></p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522322757598-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+8.25.09_originRe.png\"></p><p><br></p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522322764320-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+8.25.13_originRe.png\"></p><p><br></p><p>좀 아쉬운 점이라면 물이 별로 맑지 않았던거? 어짜피 들어갈건 아니라 상관은 없지만 물은좀 맑았으면 도 좋았을걸....</p><p><br></p><p>그리고 캠핑엔 역시....</p><p><img class=\"fr-dib fr-fil mCS_img_loaded fr-draggable\" style=\"width: 300px;\" src=\""+ s3bucketPath + "bucket_story_images%2F1522322872024-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2018-03-29+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+8.27.43_originRe.png\"></p><p><br></p><p>역시 바베큐에 술한잔이 면 청정호수 캠핑이 뭐가 부러우랴~</p><p><br></p>",
    "followCnt" : 0,
    "tempSave" : false,
},
{
    "_id" : "5g9jHef7GR3JCftWM",
    "title" : "행복지수 1위, 덴마크인들의 휘게!(Hygge)",
    "context" : "<p>‘휘게(hygge)’는 '안락함', '아늑함'을 뜻하는 덴마크어로 편안하고 느린 삶을 추구하는 덴마크 사람들의 라이프스타일 입니다</p><p><br></p><p>새 것보다는 오래된 것, 화려한 것보다 단순한 것 , 자극적인 것보다 은은한 분위기에서 휘게를 더 가깝게 느낄수 있다고 합니다</p><p><br></p><p>휘게를 위한 10계명도 있으니 쉽게 실천해 볼 수 있을 것입니다</p><p><br></p><p><img style=\"width: 300px;\" class=\"fr-fil fr-dib\" src=\""+ s3bucketPath + "bucketlist_images/GTBbbHiXNehCpcMHA_origin.jpg\"></p><p><br></p><p><strong>분위기&nbsp;</strong>: 조명을 조금 어둡게 한다.</p><p><br></p><p><strong>지금 이 순간</strong>: 현재에 충실한다. 휴대전화를 끈다.</p><p><br></p><p><strong>달콤한 음식</strong>: 커피, 초콜릿, 케이크, 사탕 등은 마음을 즐겁게 한다.</p><div data-id=\"87\" data-m='{\"i\":87,\"p\":79,\"n\":\"article-inlineOutstreamAd\",\"t\":\"inlineOutstreamAd\",\"o\":8}'><br></div><p><strong>평등</strong>: 나보다는 우리. 뭔가를 함께하거나 TV를 같이 시청한다.</p><p><br></p><p><strong>감사</strong>: 만끽하라. 오늘이 인생 최고의 날일지도 모른다.</p><p><br></p><p><strong>조화</strong>: 우리는 경쟁을 하고 있는 것이 아니다. 우리는 이미 당신을 좋아한다. 당신이 무엇을 성취했든 뽐낼 필요가 없다.</p><p><br></p><p><strong>편안함</strong>: 편안함을 느끼면서 휴식을 취한다. 긴장을 풀고 쉬는 것이 가장 중요하다.</p><p><br></p><p><strong>휴전</strong>: 감정 소모는 그만. 정치에 관해서라면 나중에 이야기한다.</p><p><br></p><p><strong>화목</strong>: 추억에 대해 이야기를 나누면서 관계를 다져보자.</p><p><br></p><p><strong>보금자리</strong>: 이곳은 당신의 세계다. 평화롭고 안전한 장소다.</p><p><br></p>",
    "images" : [
        {
            "type" : "_origin",
            "bucketUrl" : s3bucketPath,
            "folder" : "bucketlist_images/",
            "fileName" : "hEos3ZDngrbJsWXkp",
            "extension" : "jpg",
            "lat" : null,
            "lng" : null,
            "imageClass" : "height-100"
        }
    ],
    "contextImage" : [
        {
            "type" : "_origin",
            "bucketUrl" : s3bucketPath,
            "folder" : "bucketlist_images/",
            "fileName" : "GTBbbHiXNehCpcMHA",
            "extension" : "jpg",
            "lat" : null,
            "lng" : null,
            "imageClass" : "height-100"
        }
    ],
    "tagList" : [
        "휘게",
        "웰빙",
        "라이프스타일",
        "소확행"
    ],
    "updateDate" : "2018-05-28 18:19:56",
    "type" : "BL",
    "category" : "BL0003",
    "followCnt" : 0,
    "regDate" : "2018-05-28 07:51:12",
    "tempSave" : false,
}

//     {	title:"내 손으로 잡은 물고기 회쳐 먹기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0002", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0020", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"일본 새해음식 오세치 먹어보기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0020", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0032", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"힐링여행 일본 하코네 온천", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0002", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0136", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0005", followCnt :	0	},
//     {	title:"동남아의 보석 다낭에 다녀오기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0757", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0553", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0003", followCnt :	0	},
//     {	title:"워커힐 호텔에서 고급 코스요리 먹어보기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0716", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0354", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0006", followCnt :	0	},
//     {	title:"긴자에서 초밥 먹어보기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0553", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0032", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"다낭에서 베트남요리 반쎄오 먹어보기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0582", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0687", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"도쿄 카라멜 넘버슈가에서 디져트 사먹어 보기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0136", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0553", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0582", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"지리산 둘레길 종주하기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0627", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0582", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0354", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0003", followCnt :	0	},
//     {	title:"네팔 히말라야 산맥 트레킹 다녀오기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0627", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0136", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0004", followCnt :	0	},
//     {	title:"삿포로를 삿포로 맥주와 함께 즐겨보자", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0002", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0020", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0003", followCnt :	0	},
//     {	title:"레고 스타워즈 밀레니엄 팔콘 사기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0020", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0032", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0004", followCnt :	0	},
//     {	title:"프랑스 파리 본토에서 3대 진미 먹어보기!!", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0002", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0136", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0005", followCnt :	0	},
//     {	title:"이색 데이트 클레이 사격해보기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0757", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0553", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"가족과 함께 클라이밍 체험!! 클라이밍카페 가보기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0716", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0354", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0003", followCnt :	0	},
//     {	title:"집에서 수제 맥주 만들기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0553", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0032", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0004", followCnt :	0	},
//     {	title:"조용한 호수에서 바베큐 캠핑하기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0582", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0687", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0006", followCnt :	0	},
//     {	title:"2018년 뮤직페스티발 가기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0136", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0553", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0582", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"이연복쉐프 식당 '목란'에서 동파육 먹어보기!!", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0627", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0582", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0354", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0003", followCnt :	0	},
//     {	title:"가족과 소중한 시간을 담을 카메라 구매하기!!", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0627", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0136", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0004", followCnt :	0	},
//     {	title:"그림쟁이의 '잇' 아이템  '신티크 프로 13' 겟 하기!!", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0002", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0020", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0004", followCnt :	0	},
//     {	title:"가족과 함께 서울 둘레길 투어하기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0020", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0032", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0005", followCnt :	0	},
//     {	title:"[체코 여행] 스카이 다이빙 체험하기~!", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0002", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0136", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0005", followCnt :	0	},
//     {	title:"겨울 솔로 캠핑", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0757", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0553", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0004", followCnt :	0	},
//     {	title:"연료도 싸고 성능도 좋은 전기차 국가지원받아 싸게 사기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0716", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0354", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"내 손으로 잡은 물고기 회쳐 먹기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0002", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0020", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"일본 새해음식 오세치 먹어보기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0020", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0032", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"힐링여행 일본 하코네 온천", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0002", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0136", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0005", followCnt :	0	},
//     {	title:"동남아의 보석 다낭에 다녀오기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0757", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0553", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0003", followCnt :	0	},
//     {	title:"워커힐 호텔에서 고급 코스요리 먹어보기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0716", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0354", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0006", followCnt :	0	},
//     {	title:"긴자에서 초밥 먹어보기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0553", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0032", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"다낭에서 베트남요리 반쎄오 먹어보기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0582", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0687", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"도쿄 카라멜 넘버슈가에서 디져트 사먹어 보기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0136", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0553", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0582", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"지리산 둘레길 종주하기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0627", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0582", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0354", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0003", followCnt :	0	},
//     {	title:"네팔 히말라야 산맥 트레킹 다녀오기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0627", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0136", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0004", followCnt :	0	},
//     {	title:"삿포로를 삿포로 맥주와 함께 즐겨보자", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0002", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0020", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0003", followCnt :	0	},
//     {	title:"레고 스타워즈 밀레니엄 팔콘 사기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0020", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0032", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0004", followCnt :	0	},
//     {	title:"프랑스 파리 본토에서 3대 진미 먹어보기!!", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0002", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0136", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0005", followCnt :	0	},
//     {	title:"이색 데이트 클레이 사격해보기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0757", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0553", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"가족과 함께 클라이밍 체험!! 클라이밍카페 가보기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0716", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0354", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0003", followCnt :	0	},
//     {	title:"집에서 수제 맥주 만들기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0553", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0032", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0004", followCnt :	0	},
//     {	title:"조용한 호수에서 바베큐 캠핑하기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0582", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0687", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0006", followCnt :	0	},
//     {	title:"2018년 뮤직페스티발 가기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0136", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0553", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0582", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
//     {	title:"이연복쉐프 식당 '목란'에서 동파육 먹어보기!!", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0627", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0582", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0354", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0003", followCnt :	0	},
//     {	title:"가족과 소중한 시간을 담을 카메라 구매하기!!", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0627", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0136", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0004", followCnt :	0	},
//     {	title:"그림쟁이의 '잇' 아이템  '신티크 프로 13' 겟 하기!!", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0002", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0020", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0004", followCnt :	0	},
//     {	title:"가족과 함께 서울 둘레길 투어하기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0020", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0032", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0005", followCnt :	0	},
//     {	title:"[체코 여행] 스카이 다이빙 체험하기~!", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0002", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0136", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0005", followCnt :	0	},
//     {	title:"겨울 솔로 캠핑", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0757", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0278", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0553", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0004", followCnt :	0	},
//     {	title:"연료도 싸고 성능도 좋은 전기차 국가지원받아 싸게 사기", context:"스카이다이빙에 오신것을 환영합니다.<br/>스카이다이빙<br/>", images :	[{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0716", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", fileName : "i0354", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"},{"type" : "_thumb", "bucketUrl" : "http://images.hwlife.hscdn.com/", "folder" : "library/", "fileName" : "i0014", "extension" : "jpg", "lat" : null,"lng" : null, "imageClass" : "height-100"}]	, tagList :	['태그1','태그2','태그3','태그4']	, regDate :"2018-04-26 12:12", updateDate :"2018-04-26 12:12", type : "BL", category: "BL0002", followCnt :	0	},
  ];
  _.each(items, function(item){
    CLT.EnBucketList.insert(item);
  });

}

if (CLT.ImsCodeOption.find().count() === 0) {
  var s3bucket = "";
  var s3bucketPath = "";
  var s3region = "";
  var siteUrl = "";
  var editorKey = "";

  if(Meteor.settings.public.serverType === "prod"){
    s3bucket = "s3-ims-prod";
    s3bucketPath = "https://s3.ap-northeast-2.amazonaws.com/s3-ims-prod/";
    s3region = "s3-ap-northeast-2";
    siteUrl = "http://m.itsmystory.com";
    editorKey = "yE6G4B4E4jC10D7C4F6B2A3H4E2A2A4B-16oE4mqujqzC-16dE-11tH5lC-7G-7==";
  } else {
    s3bucket = "iml-images";
    s3bucketPath = "https://s3.ap-northeast-2.amazonaws.com/iml-images/";
    s3region = "s3-ap-northeast-2";
    siteUrl = "http://dev.itsmystory.com";
    editorKey = "OC1E2F4I4nA16B10C8B4F2D4D3I2G3A8azzvD3kwwhD-16tB-13fxrF4nab==";
  }

  CLT.ImsCodeOption.insert({
    "lifeMapMinCnt" : 1,
    "timeCapsuleDefaultTermDay" : 1,
    "timeCapsuleMinDay" : 1,
    "writeLog" : true,
    "serverType": Meteor.settings.public.serverType,
    "siteUrl": siteUrl,
    "limit":{
      endingNote : 10,
      bucket : 10,
      bucketStory : 5,
      comment : 10,
    },
    // "itemsIncrement" : 10,  // 타임라인 리스트
    // "timeLineItemsIncrement" : 30, // 타임라인
    // "commentIncrement" : 5, // 댓글리스트
    "s3" : {
      "bucketName": s3bucket,
      "region" : s3region,
      "bucketPath" : s3bucketPath,
      "folder" : {
        // "im" : "im_story_images",
        "bucketList" : "bucketlist_images",
        // "bucketStory" : "bucket_story_images",
        // "timeCapsule" : "time_capsule_images",
        // "withMe" : "im_with_me",
        // "inheritance" : "inheritance_images",
        "story" : "story_images",
        "profile" : "profile_images",
        "common" : "ims_common",
        // "future" : "future_images",
        // "customer" : "customer_desk"
      }
    },
    "pageInterval" : {
      "timeCapsuleMessage" : {
        "limit" : 3,
        "skip" : 0
      },
      "inheritanceContentsList" : {
        "limit" : 4,
        "skip" : 0
      }
    },
    // "defaultProfileImg" : ["/images/bg/icon_avata1_blank.png","/images/bg/icon_avata2_blank.png","/images/bg/icon_avata3_blank.png","/images/bg/icon_avata4_blank.png","/images/bg/icon_avata5_blank.png","/images/bg/icon_avata6_blank.png"],
    "defaultProfileImg" : ["/images/bg/icon_avata1_blank.png"],
    "mapDefault" : {
      "zoom" : 8,
      "lat" : 37.537798,
      "lng" : 127.001216
    },
    "faqCategory" : {
      'FAQ001':'로그인',
      'FAQ002':'나는',
      'FAQ003':'버킷리스트',
      'FAQ004':'타임캡슐',
      'FAQ005':'라이프 뷰',
      'FAQ006':'상속',
      'FAQ007':'기타'
    },
    "smtpServerInfo" : 'smtps://support:ehdrnghl1!@smtp.itsmystory.com:465',
    "lifeMapLine" : ['/images/bg/map/line_1.png','/images/bg/map/line_2.png','/images/bg/map/line_3.png','/images/bg/map/line_4.png','/images/bg/map/line_5.png'],
    "code" : {
      // IMS 서비스 코드
      main : [
        {group:'g0001', code : 'IM',  name : '엔딩노트', order : 1, regDate : global.fn_dateFormat().HMS},
        {group:'g0001', code : 'BL',  name : '버킷리스트', order : 2, regDate : global.fn_dateFormat().HMS},
        {group:'g0001', code : 'BS',  name : '버키스토리', order : 3, regDate : global.fn_dateFormat().HMS},
        {group:'g0001', code : 'IH',  name : '상속', order : 4, regDate : global.fn_dateFormat().HMS},
        {group:'g0001', code : 'GD',  name : '가디언', order : 5, regDate : global.fn_dateFormat().HMS},
        {group:'g0001', code : 'MY',  name : '마이페이지', order : 6, regDate : global.fn_dateFormat().HMS},
        // {group:'g0001', code : 'TQ',  name : '오늘의질문', order : 7, regDate : global.fn_dateFormat().HMS},
      ],
        // 글쓰기 주제, 영역 코드
      subject : [
        { group:'g0002', code : 'IM',  name : '스토리', icon: 'im.svg', order : 1, regDate : global.fn_dateFormat().HMS},
        { group:'g0002', code : 'SC',  name : '학교', icon: 'school.svg',order : 2, regDate : global.fn_dateFormat().HMS},
        { group:'g0002', code : 'CR',  name : '커리어', icon: 'career.svg',order : 3, regDate : global.fn_dateFormat().HMS},
        { group:'g0002', code : 'DR',  name : '꿈', icon: 'dream.svg',order : 4, regDate : global.fn_dateFormat().HMS},
        { group:'g0002', code : 'BD',  name : '육아일기', icon: 'child.svg',order : 5, regDate : global.fn_dateFormat().HMS},
        { group:'g0002', code : 'TC',  name : '타임캡슐', icon: 'timecapsule1.svg',order : 7, regDate : global.fn_dateFormat().HMS},
        { group:'g0002', code : 'EN',  name : '유서', icon: 'graveston.svg',order : 8, regDate : global.fn_dateFormat().HMS},

        // { group:'g0002', code : 'EN',  name : '미리써보는유서', order : 4, regDate : global.fn_dateFormat().HMS},
        { group:'g0003', code : 'BS',  name : '버키스토리', order : 1, regDate : global.fn_dateFormat().HMS},
        { group:'g0004', code : 'TQ',  name : '오늘의질문', order : 1, regDate : global.fn_dateFormat().HMS},
        { group:'g0005', code : 'BL',  name : '버킷리스트', order : 6, regDate : global.fn_dateFormat().HMS},
        { group:'g0006', code : 'LL',  name : '마지막편지', order : 1, regDate : global.fn_dateFormat().HMS},

        { group:'g0100', code : 'IM0001', pCode:'IM', name : '일상', icon: 'im.svg', images:[s3bucketPath + 'ims_common/일상_1.png', s3bucketPath + 'ims_common/일상_2.png', s3bucketPath + 'ims_common/일상_3.png'], keyword:['스토리', '일상'], order : 1, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'IM0002', pCode:'IM', name : '여행', icon: 'travel.svg', images:[s3bucketPath + 'ims_common/여행_1.png', s3bucketPath + 'ims_common/여행_2.png', s3bucketPath + 'ims_common/여행_3.png'], keyword:['추억','여행'], order : 2, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'IM0003', pCode:'IM', name : '가족', icon: 'family.svg', images:[s3bucketPath + 'ims_common/가족_1.png', s3bucketPath + 'ims_common/가족_2.png', s3bucketPath + 'ims_common/가족_3.png'], keyword:['가족과 함께'], order : 3, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'IM0004', pCode:'IM', name : '친구', icon: 'friends.svg', images:[s3bucketPath + 'ims_common/친구_1.png', s3bucketPath + 'ims_common/친구_2.png', s3bucketPath + 'ims_common/친구_3.png', ], keyword:['친구와 함께'], order : 4, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'IM0005', pCode:'IM', name : '모임', icon: 'group.svg', images:[s3bucketPath + 'ims_common/모임_1.png', s3bucketPath + 'ims_common/모임_2.png', s3bucketPath + 'ims_common/모임_3.png'], keyword:['추억','모임'], order : 5, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'IM0006', pCode:'IM', name : '연애', icon: 'love.svg', images:[s3bucketPath + 'ims_common/연애사_1.png'], keyword:['연애사','연인'], order : 6, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'IM0007', pCode:'IM', name : '추억', icon: 'im.svg', images:[s3bucketPath + 'ims_common/일상_1.png', s3bucketPath + 'ims_common/일상_2.png', s3bucketPath + 'ims_common/일상_3.png'], keyword:['추억'], order : 7, regDate : global.fn_dateFormat().HMS},

        { group:'g0100', code : 'SC0001', pCode:'SC', name : '일상', icon: 'school.svg', images:[s3bucketPath + 'ims_common/학교_1.png', s3bucketPath + 'ims_common/학교_2.png', s3bucketPath + 'ims_common/학교_3.png'], keyword:['나의 학창 시절'], order : 1, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'SC0002', pCode:'SC', name : '선생님', icon: 'school.svg', images:[s3bucketPath + 'ims_common/학교_1.png', s3bucketPath + 'ims_common/학교_2.png', s3bucketPath + 'ims_common/학교_3.png'], keyword:['선생님'], order : 2, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'SC0003', pCode:'SC', name : '여행', icon: 'school.svg', images:[s3bucketPath + 'ims_common/학교_1.png', s3bucketPath + 'ims_common/학교_2.png', s3bucketPath + 'ims_common/학교_3.png'], keyword:['수학여행'], order : 3, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'SC0004', pCode:'SC', name : '친구', icon: 'school.svg', images:[s3bucketPath + 'ims_common/학교_1.png', s3bucketPath + 'ims_common/학교_2.png', s3bucketPath + 'ims_common/학교_3.png'], keyword:['친구들'], order : 4, regDate : global.fn_dateFormat().HMS},

        { group:'g0100', code : 'CR0001', pCode:'CR', name : '일상', icon: 'career.svg', images:[s3bucketPath + 'ims_common/커리어_1.png', s3bucketPath + 'ims_common/커리어_2.png', s3bucketPath + 'ims_common/커리어_3.png', s3bucketPath + 'ims_common/커리어_4.png', s3bucketPath + 'ims_common/커리어_5.png', s3bucketPath + 'ims_common/커리어_6.png', s3bucketPath + 'ims_common/커리어_7.png', s3bucketPath + 'ims_common/커리어_8.png', s3bucketPath + 'ims_common/커리어_9.png', ], keyword:['회사, 일상'], order : 1, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'CR0002', pCode:'CR', name : '직장', icon: 'career.svg', images:[s3bucketPath + 'ims_common/커리어_1.png', s3bucketPath + 'ims_common/커리어_2.png', s3bucketPath + 'ims_common/커리어_3.png', s3bucketPath + 'ims_common/커리어_4.png', s3bucketPath + 'ims_common/커리어_5.png', s3bucketPath + 'ims_common/커리어_6.png', s3bucketPath + 'ims_common/커리어_7.png', s3bucketPath + 'ims_common/커리어_8.png', s3bucketPath + 'ims_common/커리어_9.png', ], keyword:['직장'], order : 2, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'CR0003', pCode:'CR', name : '출장', icon: 'career.svg', images:[s3bucketPath + 'ims_common/커리어_1.png', s3bucketPath + 'ims_common/커리어_2.png', s3bucketPath + 'ims_common/커리어_3.png', s3bucketPath + 'ims_common/커리어_4.png', s3bucketPath + 'ims_common/커리어_5.png', s3bucketPath + 'ims_common/커리어_6.png', s3bucketPath + 'ims_common/커리어_7.png', s3bucketPath + 'ims_common/커리어_8.png', s3bucketPath + 'ims_common/커리어_9.png', ], keyword:['출장'], order : 3, regDate : global.fn_dateFormat().HMS},


        { group:'g0100', code : 'BD0001', pCode:'BD', name : '자녀', icon: 'child.svg', images:[s3bucketPath + 'ims_common/자녀_1.png', s3bucketPath + 'ims_common/자녀_2.png', s3bucketPath + 'ims_common/자녀_3.png'], keyword:['우리 아이!!'], order : 1, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'BD0002', pCode:'BD', name : '반려동물', icon: 'pat.svg', images:[s3bucketPath + 'ims_common/반려동물_1.png', s3bucketPath + 'ims_common/반려동물_2.png', s3bucketPath + 'ims_common/반려동물_3.png', s3bucketPath + 'ims_common/반려동물_4.png', s3bucketPath + 'ims_common/반려동물_5.png', s3bucketPath + 'ims_common/반려동물_6.png', s3bucketPath + 'ims_common/반려동물_7.png', s3bucketPath + 'ims_common/반려동물_8.png', s3bucketPath + 'ims_common/반려동물_9.png'], keyword:['내 새끼!!'], order : 2, regDate : global.fn_dateFormat().HMS},

        { group:'g0100', code : 'TC0001', pCode:'TC', name : '나에게', icon: 'timecapsule1.svg', images:[s3bucketPath + 'ims_common/타임캡슐_1.png', ], keyword:['타임캡슐'], order : 2, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TC0002', pCode:'TC', name : '친구에게', icon: 'timecapsule2.svg', images:[s3bucketPath + 'ims_common/타임캡슐_1.png', ], keyword:['타임캡슐'], order : 1, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'EN0001', pCode:'EN', name : '유언', images:['/images/icon/map/1.png','/images/icon/map/2.png','/images/icon/map/3.png'], keyword:['나의 유언'], order : 12, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'EN0002', pCode:'EN', name : '마지막편지', images:['/images/icon/map/1.png','/images/icon/map/2.png','/images/icon/map/3.png'], keyword:['마지막 편지'], order : 13, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'EN0003', pCode:'EN', name : '장례희망', images:['/images/icon/map/1.png','/images/icon/map/2.png','/images/icon/map/3.png'], keyword:['장례희망'], order : 14, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'EN0004', pCode:'EN', name : '연명의료희망', images:['/images/icon/map/1.png','/images/icon/map/2.png','/images/icon/map/3.png'], keyword:['연명의료희망'], order : 15, regDate : global.fn_dateFormat().HMS},


        // { group:'g0100', code : 'DEFAULT', pCode:'BS', name : '선택안함', icon: 'bucket.svg', images:[s3bucketPath + 'ims_common/일상_1.png', s3bucketPath + 'ims_common/일상_2.png', s3bucketPath + 'ims_common/일상_3.png'], keyword:['스토리'], order : 1, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'BS0001', pCode:'BS', name : '버키스토리', icon: 'bucket.svg', images:[s3bucketPath + 'ims_common/진행중_1.png', s3bucketPath + 'ims_common/일상_2.png', s3bucketPath + 'ims_common/일상_3.png'], keyword:['진행'], order : 1, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'BS0002', pCode:'BS', name : '계획', icon: 'bucket.svg', images:[s3bucketPath + 'ims_common/계획_1.png'], keyword:['계획'], order : 2, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'BS0003', pCode:'BS', name : '후기', icon: 'bucket.svg', images:[s3bucketPath + 'ims_common/후기_1.png', s3bucketPath + 'ims_common/일상_2.png', s3bucketPath + 'ims_common/일상_3.png'], keyword:['후기'], order : 2, regDate : global.fn_dateFormat().HMS},


        { group:'g0100', code : 'DR0001', pCode:'DR', name : '꿈', icon: 'dream.svg', images:[s3bucketPath + 'ims_common/꿈_1.png', s3bucketPath + 'ims_common/일상_2.png', s3bucketPath + 'ims_common/일상_3.png'], keyword:['꿈'], order : 1, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'EN0001', pCode:'EN', name : '유서', icon: 'graveston.svg', images:[s3bucketPath + 'ims_common/유서_1.png'], keyword:['유언, 유서'], order : 1, regDate : global.fn_dateFormat().HMS},


        { group:'g0100', code : 'TQ0001', pCode:'TQ', name : '일상', icon: 'im.svg', images:[s3bucketPath + 'ims_common/일상_1.png', s3bucketPath + 'ims_common/일상_2.png', s3bucketPath + 'ims_common/일상_3.png'], keyword:['추억','일상'], order : 1, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TQ0002', pCode:'TQ', name : '여행', icon: 'travel.svg', images:[s3bucketPath + 'ims_common/여행_1.png', s3bucketPath + 'ims_common/여행_2.png', s3bucketPath + 'ims_common/여행_3.png'], keyword:['추억','여행'], order : 2, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TQ0003', pCode:'TQ', name : '가족', icon: 'family.svg', images:[s3bucketPath + 'ims_common/가족_1.png', s3bucketPath + 'ims_common/가족_2.png', s3bucketPath + 'ims_common/가족_3.png'], keyword:['가족과 함께'], order : 3, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TQ0004', pCode:'TQ', name : '친구', icon: 'group.svg', images:[s3bucketPath + 'ims_common/친구_1.png', s3bucketPath + 'ims_common/친구_2.png', s3bucketPath + 'ims_common/친구_3.png', ], keyword:['친구와 함께'], order : 4, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TQ0005', pCode:'TQ', name : '모임', icon: 'group.svg', images:[s3bucketPath + 'ims_common/모임_1.png', s3bucketPath + 'ims_common/모임_2.png',s3bucketPath + 'ims_common/모임_3.png'], keyword:['추억','모임'], order : 5, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TQ0006', pCode:'TQ', name : '학교', icon: 'school.svg', images:[s3bucketPath + 'ims_common/학교_1.png', s3bucketPath + 'ims_common/학교_2.png', s3bucketPath + 'ims_common/학교_3.png'], keyword:['나의 학창 시절'], order : 6, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TQ0007', pCode:'TQ', name : '커리어', icon: 'career.svg', images:[s3bucketPath + 'ims_common/커리어_1.png', s3bucketPath + 'ims_common/커리어_2.png', s3bucketPath + 'ims_common/커리어_3.png', s3bucketPath + 'ims_common/커리어_4.png', s3bucketPath + 'ims_common/커리어_5.png', s3bucketPath + 'ims_common/커리어_6.png', s3bucketPath + 'ims_common/커리어_7.png', s3bucketPath + 'ims_common/커리어_8.png', s3bucketPath + 'ims_common/커리어_9.png', ], keyword:['나의 직장 생활'], order : 26, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TQ0008', pCode:'TQ', name : '자녀', icon: 'child.svg', images:[s3bucketPath + 'ims_common/자녀_1.png', s3bucketPath + 'ims_common/자녀_2.png', s3bucketPath + 'ims_common/자녀_3.png'], keyword:['우리 아이!!'], order : 7, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TQ0009', pCode:'TQ', name : '반려동물', icon: 'pat.svg', images:[s3bucketPath + 'ims_common/반려동물_1.png', s3bucketPath + 'ims_common/반려동물_2.png', s3bucketPath + 'ims_common/반려동물_3.png', s3bucketPath + 'ims_common/반려동물_4.png', s3bucketPath + 'ims_common/반려동물_5.png', s3bucketPath + 'ims_common/반려동물_6.png', s3bucketPath + 'ims_common/반려동물_7.png', s3bucketPath + 'ims_common/반려동물_8.png', s3bucketPath + 'ims_common/반려동물_9.png'], keyword:['내 새끼!!'], order : 8, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TQ0010', pCode:'TQ', name : '나에게', icon: 'timecapsule1.svg', images:[s3bucketPath + 'ims_common/타임캡슐_1.png', ], keyword:['타임캡슐'], order : 9, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TQ0011', pCode:'TQ', name : '친구에게', icon: 'timecapsule2.svg', images:[s3bucketPath + 'ims_common/타임캡슐_1.png', ], keyword:['타임캡슐'], order : 10, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TQ0012', pCode:'TQ', name : '유언', icon: 'graveston.svg', images:[s3bucketPath + 'ims_common/유서_1.png'], keyword:['나의 유언'], order : 11, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TQ0013', pCode:'TQ', name : '프로파일', icon: 'im.svg', images:[s3bucketPath + 'ims_common/프로파일_1.png'], keyword:['프로파일'], order : 12, regDate : global.fn_dateFormat().HMS},

        { group:'g0100', code : 'BL0001', pCode:'BL', name : '따라하기', icon: 'bucket.svg', images:[s3bucketPath + 'ims_common/따라하기_1.png'], keyword:['따라하기'], order : 13, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'BL0002', pCode:'BL', name : '나이거했어', icon: 'bucket.svg', images:[s3bucketPath + 'ims_common/나이거했어_1.png'], keyword:['나이거했어'], order : 14, regDate : global.fn_dateFormat().HMS},

        { group:'g0100', code : 'LL0001', pCode:'LL', name : '선택안함', icon: 'bucket.svg', images:[s3bucketPath + 'ims_common/유서_1.png'], keyword:['마지막편지'], order : 15, regDate : global.fn_dateFormat().HMS},
      ],
      //버킷리스트 분류
      bucket : [
        { group:'g0006', code : 'BL0001',  name : '전체', order : 1, regDate : global.fn_dateFormat().HMS},
        { group:'g0006', code : 'BL0002',  name : '먹고싶은', order : 2, regDate : global.fn_dateFormat().HMS},
        { group:'g0006', code : 'BL0003',  name : '가고싶은', order : 3, regDate : global.fn_dateFormat().HMS},
        { group:'g0006', code : 'BL0004',  name : '하고싶은', order : 4, regDate : global.fn_dateFormat().HMS},
        { group:'g0006', code : 'BL0005',  name : '갖고싶은', order : 5, regDate : global.fn_dateFormat().HMS},
        { group:'g0006', code : 'BL0006',  name : '되고싶은', order : 6, regDate : global.fn_dateFormat().HMS},
      ],
      // Meteor.call('setPoint', 'PO0001', 'get', storyData.type, storyData.subType, res.insertedId);
      point : [
        {code : 'PO0001', name : '잇츠마이스토리 회원가입', get : 2500, use : 0, regDate : global.fn_dateFormat().HMS},
        {code : 'PO0002', name : '글작성', get : 50, use : -50, regDate : global.fn_dateFormat().HMS},
        {code : 'PO0003', name : '댓글', get : 10, use : -10, regDate : global.fn_dateFormat().HMS},
        {code : 'PO0004', name : '좋아요', get : 5, use : -5, regDate : global.fn_dateFormat().HMS},
        {code : 'PO0005', name : '가디언 추가', get : 50, use : -50, regDate : global.fn_dateFormat().HMS},
        {code : 'PO0006', name : '상속', get : 1000, use : -1000, regDate : global.fn_dateFormat().HMS},
        {code : 'PO0007', name : '따라하기', get : 50, use : -50, regDate : global.fn_dateFormat().HMS},
        {code : 'PO0008', name : '나이거했어', get : 50, use : -50, regDate : global.fn_dateFormat().HMS},
        {code : 'PO0009', name : '친구등록', get : 50, use : -50, regDate : global.fn_dateFormat().HMS},
      ],
      log : [
        {code: "LG0001", name: "로그인", order: 1, regDate: "global.fn_dateFormat().HMS", type: "CM"},
        {code: "LG0002", name: "로그아웃", order: 2, regDate: "global.fn_dateFormat().HMS", type: "CM"},
        {code: "LG0003", name: "글 저장", order: 3, regDate: "global.fn_dateFormat().HMS", type: "CM"},
        {code: "LG0004", name: "글 수정", order: 4, regDate: "global.fn_dateFormat().HMS", type: "CM"},
        {code: "LG0005", name: "글 삭제", order: 5, regDate: "global.fn_dateFormat().HMS", type: "CM"},
        {code: "LG0006", name: "프로필사진 변경 클릭", order: 6, regDate: "global.fn_dateFormat().HMS", type: "CM"},
        {code: "LG0007", name: "프로필 사진 수정", order: 7, regDate: "global.fn_dateFormat().HMS", type: "CM"},
        {code: "LG0008", name: "내 정보 수정", order: 8, regDate: "global.fn_dateFormat().HMS", type: "CM"},
        {code: "LG0009", name: "댓글 작성", order: 9, regDate: "global.fn_dateFormat().HMS", type: "CM"},
        {code: "LG0010", name: "댓글 삭제", order: 10, regDate: "global.fn_dateFormat().HMS", type: "CM"},
        {code: "LG0011", name: "컨텐츠 좋아요 클릭", order: 11, regDate: "global.fn_dateFormat().HMS", type: "CM"},
        {code: "LG0012", name: "컨텐츠 좋아요 취소", order: 12, regDate: "global.fn_dateFormat().HMS", type: "CM"},
        {code: "LG0013", name: "엔딩/버킷/상속/설정 메뉴 클릭", order: 1, regDate: "global.fn_dateFormat().HMS", type: "EN"},
        {code: "LG0014", name: "타임라인 컨텐츠 클릭", order: 2, regDate: "global.fn_dateFormat().HMS", type: "EN"},
        {code: "LG0015", name: "기대수명 변경", order: 3, regDate: "global.fn_dateFormat().HMS", type: "EN"},
        {code: "LG0016", name: "버킷리스트 카테고리 클릭", order: 1, regDate: "global.fn_dateFormat().HMS", type: "BL"},
        {code: "LG0017", name: "버킷리스트 컨텐츠 클릭", order: 2, regDate: "global.fn_dateFormat().HMS", type: "BL"},
        // {code: "LG0018", name: "모두의 버킷리스트 버튼(float)클릭", order: 3, regDate: "global.fn_dateFormat().HMS", type: "BL"},
        // {code: "LG0019", name: "MY버킷리스트 버튼(float) 클릭", order: 4, regDate: "global.fn_dateFormat().HMS", type: "BL"},
        {code: "LG0020", name: "내 버킷에 담기 클릭", order: 5, regDate: "global.fn_dateFormat().HMS", type: "BL"},
        {code: "LG0021", name: "나이거 했어 클릭", order: 6, regDate: "", type: "BL"},
        {code: "LG0022", name: "버킷리스트 글 전체보기 클릭(버킷리스트 상세 화면)", order: 7, regDate: "global.fn_dateFormat().HMS", type: "BL"},
        // {code: "LG0023", name: "버키스토리 클릭 (버키스토리 상세 화면)", order: 8, regDate: "global.fn_dateFormat().HMS", type: "BL"},
        {code: "LG0024", name: "상속 카테고리 메뉴 클릭", order: 1, regDate: "global.fn_dateFormat().HMS", type: "IH"},
        {code: "LG0025", name: "상속하기 버튼 클릭", order: 2, regDate: "global.fn_dateFormat().HMS", type: "IH"},
        {code: "LG0026", name: "상속하기 친구/직접입력 메뉴 클릭", order: 3, regDate: "global.fn_dateFormat().HMS", type: "IH"},
        {code: "LG0027", name: "상속인 등록", order: 4, regDate: "global.fn_dateFormat().HMS", type: "IH"},
        {code: "LG0028", name: "상속인 삭제", order: 5, regDate: "global.fn_dateFormat().HMS", type: "IH"},
        {code: "LG0029", name: "가디언  등록", order: 6, regDate: "global.fn_dateFormat().HMS", type: "IH"},
        {code: "LG0030", name: "가디언 삭제", order: 7, regDate: "global.fn_dateFormat().HMS", type: "IH"},
        {code: "LG0031", name: "마지막편지 등록버튼클릭", order: 8, regDate: "global.fn_dateFormat().HMS", type: "IH"},
        {code: "LG0032", name: "마지막편지 수정버튼 클릭", order: 9, regDate: "global.fn_dateFormat().HMS", type: "IH"},
        {code: "LG0033", name: "마이페이지 카테고리 클릭", order: 1, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        {code: "LG0034", name: "친구 검색 수행", order: 2, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        {code: "LG0035", name: "친구요청", order: 3, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        {code: "LG0036", name: "친구요청 수락", order: 4, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        {code: "LG0037", name: "친구요청 취소", order: 5, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        {code: "LG0038", name: "친구 삭제", order: 6, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        // {code: "LG0039", name: "마이페이지 클릭", order: 7, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        {code: "LG0040", name: "타임라인 글쓰기 클릭", order: 8, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        {code: "LG0041", name: "버키스토리 글쓰기 클릭", order: 9, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        {code: "LG0042", name: "글쓰기 스토리 선택", order: 10, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        // {code: "LG0043", name: "글쓰기 학교 선택", order: 11, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        // {code: "LG0044", name: "글쓰기 커리어 선택", order: 12, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        // {code: "LG0045", name: "글쓰기 꿈 선택", order: 13, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        {code: "LG0046", name: "글쓰기 육아일기 선택", order: 14, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        {code: "LG0047", name: "글쓰기 타임캡슐 선택", order: 15, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        {code: "LG0048", name: "글쓰기 유서 선택", order: 16, regDate: "global.fn_dateFormat().HMS", type: "MY"},
        {code: "LG0049", name: "공유 작성", order: 17, regDate: "global.fn_dateFormat().HMS", type: "EN"},
        {code: "LG0050", name: "가이드 확인", order: 18, regDate: "global.fn_dateFormat().HMS", type: "GD"},
        {code: "LG0051", name: "가이드 완료", order: 19, regDate: "global.fn_dateFormat().HMS", type: "GD"},
        {code: "LG0052", name: "나이거 했어 완료", order: 19, regDate: "global.fn_dateFormat().HMS", type: "GD"},
        {code: "LG0053", name: "상속코드 입력버튼 클릭", order: 19, regDate: "global.fn_dateFormat().HMS", type: "GD"},
        {code: "LG0054", name: "가디언 추가버튼 클릭", order: 19, regDate: "global.fn_dateFormat().HMS", type: "GD"},
        {code: "LG0055", name: "라이프맵 버튼 클릭", order: 19, regDate: "global.fn_dateFormat().HMS", type: "GD"},
        {code: "LG0056", name: "라이프맵 다운로드 클릭", order: 19, regDate: "global.fn_dateFormat().HMS", type: "GD"},
        {code: "LG0057", name: "검색버튼 클릭", order: 19, regDate: "global.fn_dateFormat().HMS", type: "GD"},
        {code: "LG0058", name: "버킷리스트 분류 선택", order: 19, regDate: "global.fn_dateFormat().HMS", type: "GD"},
        {code: "LG0059", name: "오늘의 질문 작성 클릭", order: 19, regDate: "global.fn_dateFormat().HMS", type: "GD"},
        {code: "LG0060", name: "자기소개글 수정", order: 19, regDate: "global.fn_dateFormat().HMS", type: "GD"},

        {pCode:'LG0001',name:'일반로그인',type:'IMS',subType:'',order:1},
        {pCode:'LG0001',name:'SNS로그인',type:'SNS',subType:'',order:2},
        {pCode:'LG0002',name:'',type:'',subType:'',order:3},
        {pCode:'LG0003',name:'스토리',type:'IM',subType:'IM0001',order:4},
        {pCode:'LG0003',name:'타임캡슐 나',type:'TC',subType:'TC0001',order:5},
        {pCode:'LG0003',name:'타임캡슐 친구',type:'TC',subType:'TC0002',order:6},
        {pCode:'LG0003',name:'육아일기',type:'BD',subType:'BD0001',order:7},
        {pCode:'LG0003',name:'반려동물일기',type:'BD',subType:'BD0002',order:8},
        {pCode:'LG0003',name:'유서',type:'EN',subType:'EN0001',order:9},
        {pCode:'LG0003',name:'버킷리스트',type:'BL',subType:'BL0001',order:10},
        {pCode:'LG0003',name:'버키스토리',type:'BS',subType:'BS0001',order:11},
        {pCode:'LG0003',name:'마지막편지',type:'LL',subType:'LL0001',order:12},
        {pCode:'LG0004',name:'스토리',type:'IM',subType:'IM0001',order:13},
        {pCode:'LG0004',name:'타임캡슐 나',type:'TC',subType:'TC0001',order:14},
        {pCode:'LG0004',name:'타임캡슐 친구',type:'TC',subType:'TC0002',order:15},
        {pCode:'LG0004',name:'육아일기',type:'BD',subType:'BD0001',order:16},
        {pCode:'LG0004',name:'반려동물일기',type:'BD',subType:'BD0002',order:17},
        {pCode:'LG0004',name:'유서',type:'EN',subType:'EN0001',order:18},
        {pCode:'LG0004',name:'버킷리스트',type:'BL',subType:'BL0001',order:19},
        {pCode:'LG0004',name:'버키스토리',type:'BS',subType:'BS0001',order:20},
        {pCode:'LG0004',name:'마지막편지',type:'LL',subType:'LL0001',order:21},
        {pCode:'LG0005',name:'스토리',type:'IM',subType:'IM0001',order:22},
        {pCode:'LG0005',name:'타임캡슐 나',type:'TC',subType:'TC0001',order:23},
        {pCode:'LG0005',name:'타임캡슐 친구',type:'TC',subType:'TC0002',order:24},
        {pCode:'LG0005',name:'육아일기',type:'BD',subType:'BD0001',order:25},
        {pCode:'LG0005',name:'반려동물일기',type:'BD',subType:'BD0002',order:26},
        {pCode:'LG0005',name:'유서',type:'EN',subType:'EN0001',order:27},
        {pCode:'LG0005',name:'버킷리스트',type:'BL',subType:'BL0001',order:28},
        {pCode:'LG0005',name:'버키스토리',type:'BS',subType:'BS0001',order:29},
        {pCode:'LG0006',name:'엔딩노트화면',type:'ED',subType:'',order:30},
        {pCode:'LG0006',name:'마이페이지',type:'MY',subType:'',order:31},
        {pCode:'LG0007',name:'',type:'',subType:'',order:32},
        {pCode:'LG0008',name:'이메일',type:'MY',subType:'EMAIL',order:33},
        {pCode:'LG0008',name:'소개글',type:'MY',subType:'INTRODUCE',order:34},
        {pCode:'LG0008',name:'별명',type:'MY',subType:'NICKNAME',order:35},
        {pCode:'LG0008',name:'이름',type:'MY',subType:'NAME',order:36},
        {pCode:'LG0008',name:'비밀번호',type:'MY',subType:'PASSWORD',order:37},
        {pCode:'LG0008',name:'생일',type:'MY',subType:'BIRTH',order:38},
        {pCode:'LG0008',name:'휴대전화',type:'MY',subType:'PHONE',order:39},
        {pCode:'LG0009',name:'스토리(공유글)',type:'IM',subType:'IM0001',order:40},
        {pCode:'LG0009',name:'타임캡슐 친구',type:'TC',subType:'TC0002',order:41},
        {pCode:'LG0009',name:'육아일기(공유글)',type:'BD',subType:'BD0001',order:42},
        {pCode:'LG0009',name:'반려동물일기(공유글)',type:'BD',subType:'BD0002',order:43},
        {pCode:'LG0009',name:'유서(공유글)',type:'EN',subType:'EN0001',order:44},
        {pCode:'LG0009',name:'버키스토리',type:'BS',subType:'BS0001',order:45},
        {pCode:'LG0010',name:'',type:'',subType:'',order:46},
        {pCode:'LG0011',name:'스토리(공유글)',type:'IM',subType:'IM0001',order:47},
        {pCode:'LG0011',name:'타임캡슐 친구',type:'TC',subType:'TC0002',order:48},
        {pCode:'LG0011',name:'육아일기(공유글)',type:'BD',subType:'BD0001',order:49},
        {pCode:'LG0011',name:'반려동물일기(공유글)',type:'BD',subType:'BD0002',order:50},
        {pCode:'LG0011',name:'유서(공유글)',type:'EN',subType:'EN0001',order:51},
        {pCode:'LG0011',name:'버키스토리',type:'BS',subType:'BS0001',order:52},
        {pCode:'LG0011',name:'버킷리스트',type:'BL',subType:'BL0001',order:53},
        {pCode:'LG0012',name:'스토리(공유글)',type:'IM',subType:'IM0001',order:54},
        {pCode:'LG0012',name:'타임캡슐 친구',type:'TC',subType:'TC0002',order:55},
        {pCode:'LG0012',name:'육아일기(공유글)',type:'BD',subType:'BD0001',order:56},
        {pCode:'LG0012',name:'반려동물일기(공유글)',type:'BD',subType:'BD0002',order:57},
        {pCode:'LG0012',name:'유서(공유글)',type:'EN',subType:'EN0001',order:58},
        {pCode:'LG0012',name:'버키스토리',type:'BS',subType:'BS0001',order:59},
        {pCode:'LG0012',name:'버킷리스트',type:'BL',subType:'BL0001',order:60},
        {pCode:'LG0013',name:'엔딩노트',type:'ED',subType:'',order:61},
        {pCode:'LG0013',name:'버킷리스트',type:'BL',subType:'',order:62},
        {pCode:'LG0013',name:'상속',type:'IH',subType:'',order:63},
        {pCode:'LG0013',name:'설정',type:'ST',subType:'',order:64},
        {pCode:'LG0014',name:'스토리',type:'ED',subType:'IM0001',order:65},
        {pCode:'LG0014',name:'타임캡슐 나',type:'ED',subType:'TC0001',order:66},
        {pCode:'LG0014',name:'타임캡슐 친구',type:'ED',subType:'TC0002',order:67},
        {pCode:'LG0014',name:'육아일기',type:'ED',subType:'BD0001',order:68},
        {pCode:'LG0014',name:'반려동물일기',type:'ED',subType:'BD0002',order:69},
        {pCode:'LG0014',name:'유서',type:'ED',subType:'EN0001',order:70},
        {pCode:'LG0014',name:'버킷리스트',type:'ED',subType:'BL0001',order:71},
        {pCode:'LG0014',name:'버키스토리',type:'ED',subType:'BS0001',order:72},
        {pCode:'LG0014',name:'마지막편지',type:'ED',subType:'LL0001',order:73},
        {pCode:'LG0015',name:'',type:'ED',subType:'',order:74},
        {pCode:'LG0016',name:'너도해볼래',type:'BL',subType:'ALL',order:75},
        {pCode:'LG0016',name:'내가할꺼야',type:'BL',subType:'MY',order:76},
        {pCode:'LG0016',name:'버키스토리 모아보기',type:'BL',subType:'BS',order:77},
        {pCode:'LG0017',name:'버킷리스트',type:'BL',subType:'BL0001',order:78},
        {pCode:'LG0017',name:'버키스토리',type:'BL',subType:'BS0001',order:79},
        // {pCode:'LG0018',name:'사용안함',type:'사용안함',subType:'사용안함',order:80},
        // {pCode:'LG0019',name:'사용안함',type:'사용안함',subType:'사용안함',order:81},
        {pCode:'LG0020',name:'내 버킷에 담기 클릭',type:'BL',subType:'BL0001',order:82},
        {pCode:'LG0021',name:'나 이거 했어 클릭',type:'BL',subType:'BL0002',order:83},
        {pCode:'LG0022',name:'',type:'BL',subType:'',order:84},
        // {pCode:'LG0023',name:'사용안함',type:'사용안함',subType:'사용안함',order:85},
        {pCode:'LG0024',name:'나를기억해',type:'IH',subType:'TO',order:86},
        {pCode:'LG0024',name:'니가그리워',type:'IH',subType:'FROM',order:87},
        {pCode:'LG0024',name:'가디언',type:'IH',subType:'GUARDIAN',order:88},
        {pCode:'LG0024',name:'장례희망',type:'IH',subType:'FUNARAL',order:89},
        {pCode:'LG0025',name:'',type:'',subType:'',order:90},
        {pCode:'LG0026',name:'친구선택',type:'IH',subType:'IMSUSER',order:91},
        {pCode:'LG0026',name:'직접입력선택',type:'IH',subType:'NONIMSUSER',order:92},
        {pCode:'LG0027',name:'',type:'',subType:'',order:93},
        {pCode:'LG0028',name:'',type:'',subType:'',order:94},
        {pCode:'LG0029',name:'',type:'',subType:'',order:95},
        {pCode:'LG0030',name:'',type:'',subType:'',order:96},
        {pCode:'LG0031',name:'',type:'',subType:'',order:97},
        {pCode:'LG0032',name:'',type:'',subType:'',order:98},
        {pCode:'LG0033',name:'관리자',type:'MY',subType:'ADMIN',order:99},
        {pCode:'LG0033',name:'친구',type:'MY',subType:'FRIENDS',order:100},
        {pCode:'LG0033',name:'내정보',type:'MY',subType:'INFO',order:101},
        {pCode:'LG0033',name:'포인트',type:'MY',subType:'POINT',order:102},
        {pCode:'LG0034',name:'',type:'',subType:'',order:103},
        {pCode:'LG0035',name:'',type:'',subType:'',order:104},
        {pCode:'LG0036',name:'',type:'',subType:'',order:105},
        {pCode:'LG0037',name:'',type:'',subType:'',order:106},
        {pCode:'LG0038',name:'',type:'',subType:'',order:107},
        // {pCode:'LG0039',name:'사용안함',type:'사용안함',subType:'사용안함',order:108},
        {pCode:'LG0040',name:'',type:'',subType:'',order:109},
        {pCode:'LG0041',name:'',type:'',subType:'',order:110},
        {pCode:'LG0042',name:'',type:'',subType:'IM0001',order:111},
        // {pCode:'LG0043',name:'사용안함',type:'사용안함',subType:'사용안함',order:112},
        // {pCode:'LG0044',name:'사용안함',type:'사용안함',subType:'사용안함',order:113},
        // {pCode:'LG0045',name:'사용안함',type:'사용안함',subType:'사용안함',order:114},
        {pCode:'LG0046',name:'육아일기',type:'',subType:'BD0001',order:115},
        {pCode:'LG0046',name:'반려동물',type:'',subType:'BD0002',order:116},
        {pCode:'LG0047',name:'타임캡슐 나',type:'',subType:'TC0001',order:117},
        {pCode:'LG0047',name:'타임캡슐 친구',type:'',subType:'TC0002',order:118},
        {pCode:'LG0048',name:'',type:'',subType:'EN0001',order:119},
        {pCode:'LG0049',name:'스토리',type:'',subType:'IM0001',order:120},
        {pCode:'LG0049',name:'육아일기',type:'',subType:'BD0001',order:121},
        {pCode:'LG0049',name:'반려동물일기',type:'',subType:'BD0002',order:122},
        {pCode:'LG0049',name:'유서',type:'',subType:'EN0001',order:123},
        {pCode:'LG0049',name:'버키스토리',type:'',subType:'BS0001',order:124},
        {pCode:'LG0050',name:'최초 서비스 안내 슬라이드 (최초)',type:'GD',subType:'GD0001',order:125},
        {pCode:'LG0050',name:'서비스 안내 슬라이드 (타임라인)',type:'GD',subType:'GD0002',order:126},
        {pCode:'LG0050',name:'버킷리스트 가이드',type:'GD',subType:'BL0001',order:127},
        {pCode:'LG0050',name:'상속가이드',type:'GD',subType:'IH0001',order:128},
        {pCode:'LG0050',name:'스토리작성',type:'GD',subType:'IM0001',order:129},
        {pCode:'LG0050',name:'타임캡슐 나',type:'GD',subType:'TC0001',order:130},
        {pCode:'LG0050',name:'타임캡슐 친구',type:'GD',subType:'TC0002',order:131},
        {pCode:'LG0050',name:'육아일기',type:'GD',subType:'BD0001',order:132},
        {pCode:'LG0050',name:'반려동물',type:'GD',subType:'BD0002',order:133},
        {pCode:'LG0050',name:'유서',type:'GD',subType:'EN0001',order:134},
        {pCode:'LG0051',name:'서비스 안내 슬라이드 종료',type:'GD',subType:'GD0002',order:135},
        {pCode:'LG0052',name:'',type:'BL',subType:'BL0002',order:136},
        {pCode:'LG0053',name:'',type:'',subType:'',order:137},
        {pCode:'LG0054',name:'',type:'',subType:'',order:138},
        {pCode:'LG0055',name:'',type:'',subType:'',order:139},
        {pCode:'LG0056',name:'',type:'',subType:'',order:140},
        {pCode:'LG0057',name:'엔딩노트 검색',type:'ED',subType:'',order:141},
        {pCode:'LG0057',name:'버킷리스트 검색',type:'BL',subType:'',order:142},
        {pCode:'LG0058',name:'전체',type:'BL',subType:'BL0001',order:143},
        {pCode:'LG0058',name:'먹고싶은',type:'BL',subType:'BL0002',order:144},
        {pCode:'LG0058',name:'가고싶은',type:'BL',subType:'BL0003',order:145},
        {pCode:'LG0058',name:'하고싶은',type:'BL',subType:'BL0004',order:146},
        {pCode:'LG0058',name:'갖고싶은',type:'BL',subType:'BL0005',order:147},
        {pCode:'LG0058',name:'되고싶은',type:'BL',subType:'BL0006',order:148},
        {pCode:'LG0059',name:'',type:'',subType:'',order:149},
        {pCode:'LG0060',name:'엔딩노트화면',type:'ED',subType:'',order:150},

      ],
      dateTitle : [
        {code: "DT0001", name : '날짜', order:1, regDate: "global.fn_dateFormat().HMS"},
        {code: "DT0002", name : '아버지생신', order:2, regDate: "global.fn_dateFormat().HMS"},
        {code: "DT0003", name : '어머니생신', order:3, regDate: "global.fn_dateFormat().HMS"},
        {code: "DT0004", name : '제대일', order:4, regDate: "global.fn_dateFormat().HMS"},
        {code: "DT0005", name : '입대일', order:5, regDate: "global.fn_dateFormat().HMS"},
        {code: "DT0006", name : '입사일', order:6, regDate: "global.fn_dateFormat().HMS"},
        {code: "DT0007", name : '퇴사일', order:7, regDate: "global.fn_dateFormat().HMS"},
        {code: "DT0008", name : '결혼기념일', order:8, regDate: "global.fn_dateFormat().HMS"},
        {code: "DT0009", name : 'D-Day', order:9, regDate: "global.fn_dateFormat().HMS"},
        {code: "DT0010", name : '당첨일', order:9, regDate: "global.fn_dateFormat().HMS"},
        {code: "DT0011", name : '개봉일', order:9, regDate: "global.fn_dateFormat().HMS"},
      ],
      profileEtc : [
        {code: "PF0001", name : '결혼기념일', type: 1, order:1, regDate: "global.fn_dateFormat().HMS"},
        {code: "PF0002", name : '어머니생신', type: 1, order:2, regDate: "global.fn_dateFormat().HMS"},
        {code: "PF0003", name : '아버지생신', type: 1, order:3, regDate: "global.fn_dateFormat().HMS"},
        {code: "PF0004", name : '입대일', type: 1, order:3, regDate: "global.fn_dateFormat().HMS"},
        {code: "PF0005", name : '제대일', type: 1, order:5, regDate: "global.fn_dateFormat().HMS"},
        {code: "PF0006", name : '입사일', type: 2, order:5, regDate: "global.fn_dateFormat().HMS"},
      ],
      searchCode : [
        { group:'g0001', code : 'IM',  name : '스토리', order : 2, regDate : global.fn_dateFormat().HMS},
        // { group:'g0001', code : 'SC',  name : '학교', order : 3, regDate : global.fn_dateFormat().HMS},
        // { group:'g0001', code : 'CR',  name : '커리어', order : 4, regDate : global.fn_dateFormat().HMS},
        // { group:'g0001', code : 'DR',  name : '꿈', order : 5, regDate : global.fn_dateFormat().HMS},
        { group:'g0001', code : 'BD',  name : '육아일기', order : 6, regDate : global.fn_dateFormat().HMS},
        { group:'g0001', code : 'TC',  name : '타임캡슐', order : 7, regDate : global.fn_dateFormat().HMS},
        { group:'g0001', code : 'BS',  name : '버키스토리', order : 8, regDate : global.fn_dateFormat().HMS},
        { group:'g0001', code : 'BL',  name : '버킷리스트', order : 9, regDate : global.fn_dateFormat().HMS},
        { group:'g0001', code : 'EN',  name : '유서', order : 10, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'IM0001', pCode:'IM', name : '일상', order : 1, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'IM0002', pCode:'IM', name : '여행', order : 2, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'IM0003', pCode:'IM', name : '가족', order : 3, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'IM0004', pCode:'IM', name : '친구', order : 4, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'IM0005', pCode:'IM', name : '모임', order : 5, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'IM0006', pCode:'IM', name : '연애', order : 6, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'IM0007', pCode:'IM', name : '추억', order : 7, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'SC0001', pCode:'SC', name : '일상(학교)', order : 8, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'SC0002', pCode:'SC', name : '선생님', order : 9, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'SC0003', pCode:'SC', name : '여행(학교)', order : 10, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'SC0004', pCode:'SC', name : '친구(학교)', order : 11, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'CR0001', pCode:'CR', name : '일상(커리어)', order : 12, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'CR0002', pCode:'CR', name : '직장', order : 13, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'CR0003', pCode:'CR', name : '출장', order : 14, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'BD0001', pCode:'BD', name : '자녀', order : 15, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'BD0002', pCode:'BD', name : '반려동물', order : 16, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TC0001', pCode:'TC', name : '나에게', order : 17, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'TC0002', pCode:'TC', name : '친구에게', order : 18, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'BL0001', pCode:'BL', name : '따라하기', order : 19, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'BL0002', pCode:'BL', name : '나이거했어', order : 20, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'BS0001', pCode:'BS', name : '버키스토리', order : 21, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'BS0002', pCode:'BS', name : '계획', order : 22, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'BS0003', pCode:'BS', name : '후기', order : 23, regDate : global.fn_dateFormat().HMS},
        // { group:'g0100', code : 'DR0001', pCode:'DR', name : '꿈', order : 24, regDate : global.fn_dateFormat().HMS},
        { group:'g0100', code : 'EN0001', pCode:'EN', name : '유서', order : 25, regDate : global.fn_dateFormat().HMS},
      ],
    },
    "editorSettings" : {
      "imageMaxSize": 1024 * 1024 * 20,
      "heightMin" : 150,
      "key" : editorKey,
      "toolbarButtons" : [
        "bold",
        "italic",
        "underline",
        'strikeThrough',
        "color",
        "|",
        "fontSize",
        "align",
        "|",
        "insertLink",
        "insertImage",
        "insertVideo",
        "html"
      ],
      "imageEditButtons" : [
        "imageAlign",
        "imageRemove",
        "imageDisplay",
        "imageSize"
      ]
    },
    message: [
      { code:'msg0001', type:'TC', description:'타임캡슐 받음 알림', title:"It's my story", message:'친구에게 타임캡슐을 받았습니다.', regDate : global.fn_dateFormat().HMS},
      { code:'msg0002', type:'TC', description:'타임캡슐 개봉 알림', title:"It's my story", message:'님이 타임캡슐을 개봉했습니다.', regDate : global.fn_dateFormat().HMS},
    ]
  });
}
if(CLT.ImsSysConf.find().count() === 0 ){
  CLT.ImsSysConf.insert({os:'ios', version : '1.2.15', message:'새로운 버전이 있어 스토어로 이동합니다.', regDate:global.fn_dateFormat().HMS, updateDate:global.fn_dateFormat().HMS});
  CLT.ImsSysConf.insert({os:'android', version : '1.0.4', message:'새로운 버전이 있어 스토어로 이동합니다.', regDate:global.fn_dateFormat().HMS, updateDate:global.fn_dateFormat().HMS});
}
if(CLT.ImsLifeMap.find().count() === 0 ){
  CLT.ImsLifeMap.insert({contentId:'',userId:'',keyword:[],images:[],mDate:'',regDate:global.fn_dateFormat().HMS, updateDate:global.fn_dateFormat().HMS});
}

if(CLT.ImsExplifeAvg.find().count() === 0 ){
  CLT.ImsExplifeAvg.insert({expLife: 82.40, currentAge: 0});
  CLT.ImsExplifeAvg.insert({expLife: 81.64, currentAge: 1});
  CLT.ImsExplifeAvg.insert({expLife: 80.66, currentAge: 2});
  CLT.ImsExplifeAvg.insert({expLife: 79.68, currentAge: 3});
  CLT.ImsExplifeAvg.insert({expLife: 78.69, currentAge: 4});
  CLT.ImsExplifeAvg.insert({expLife: 77.70, currentAge: 5});
  CLT.ImsExplifeAvg.insert({expLife: 76.70, currentAge: 6});
  CLT.ImsExplifeAvg.insert({expLife: 75.71, currentAge: 7});
  CLT.ImsExplifeAvg.insert({expLife: 74.72, currentAge: 8});
  CLT.ImsExplifeAvg.insert({expLife: 73.72, currentAge: 9});
  CLT.ImsExplifeAvg.insert({expLife: 72.73, currentAge: 10});
  CLT.ImsExplifeAvg.insert({expLife: 71.73, currentAge: 11});
  CLT.ImsExplifeAvg.insert({expLife: 70.74, currentAge: 12});
  CLT.ImsExplifeAvg.insert({expLife: 69.74, currentAge: 13});
  CLT.ImsExplifeAvg.insert({expLife: 68.75, currentAge: 14});
  CLT.ImsExplifeAvg.insert({expLife: 67.76, currentAge: 15});
  CLT.ImsExplifeAvg.insert({expLife: 66.77, currentAge: 16});
  CLT.ImsExplifeAvg.insert({expLife: 65.79, currentAge: 17});
  CLT.ImsExplifeAvg.insert({expLife: 64.80, currentAge: 18});
  CLT.ImsExplifeAvg.insert({expLife: 63.82, currentAge: 19});
  CLT.ImsExplifeAvg.insert({expLife: 62.84, currentAge: 20});
  CLT.ImsExplifeAvg.insert({expLife: 61.86, currentAge: 21});
  CLT.ImsExplifeAvg.insert({expLife: 60.88, currentAge: 22});
  CLT.ImsExplifeAvg.insert({expLife: 59.90, currentAge: 23});
  CLT.ImsExplifeAvg.insert({expLife: 58.92, currentAge: 24});
  CLT.ImsExplifeAvg.insert({expLife: 57.94, currentAge: 25});
  CLT.ImsExplifeAvg.insert({expLife: 56.97, currentAge: 26});
  CLT.ImsExplifeAvg.insert({expLife: 55.99, currentAge: 27});
  CLT.ImsExplifeAvg.insert({expLife: 55.01, currentAge: 28});
  CLT.ImsExplifeAvg.insert({expLife: 54.04, currentAge: 29});
  CLT.ImsExplifeAvg.insert({expLife: 53.07, currentAge: 30});
  CLT.ImsExplifeAvg.insert({expLife: 52.10, currentAge: 31});
  CLT.ImsExplifeAvg.insert({expLife: 51.13, currentAge: 32});
  CLT.ImsExplifeAvg.insert({expLife: 50.16, currentAge: 33});
  CLT.ImsExplifeAvg.insert({expLife: 49.20, currentAge: 34});
  CLT.ImsExplifeAvg.insert({expLife: 48.23, currentAge: 35});
  CLT.ImsExplifeAvg.insert({expLife: 47.27, currentAge: 36});
  CLT.ImsExplifeAvg.insert({expLife: 46.31, currentAge: 37});
  CLT.ImsExplifeAvg.insert({expLife: 45.35, currentAge: 38});
  CLT.ImsExplifeAvg.insert({expLife: 44.39, currentAge: 39});
  CLT.ImsExplifeAvg.insert({expLife: 43.43, currentAge: 40});
  CLT.ImsExplifeAvg.insert({expLife: 42.48, currentAge: 41});
  CLT.ImsExplifeAvg.insert({expLife: 41.53, currentAge: 42});
  CLT.ImsExplifeAvg.insert({expLife: 40.58, currentAge: 43});
  CLT.ImsExplifeAvg.insert({expLife: 39.64, currentAge: 44});
  CLT.ImsExplifeAvg.insert({expLife: 38.70, currentAge: 45});
  CLT.ImsExplifeAvg.insert({expLife: 37.76, currentAge: 46});
  CLT.ImsExplifeAvg.insert({expLife: 36.83, currentAge: 47});
  CLT.ImsExplifeAvg.insert({expLife: 35.90, currentAge: 48});
  CLT.ImsExplifeAvg.insert({expLife: 34.98, currentAge: 49});
  CLT.ImsExplifeAvg.insert({expLife: 34.06, currentAge: 50});
  CLT.ImsExplifeAvg.insert({expLife: 33.15, currentAge: 51});
  CLT.ImsExplifeAvg.insert({expLife: 32.24, currentAge: 52});
  CLT.ImsExplifeAvg.insert({expLife: 31.34, currentAge: 53});
  CLT.ImsExplifeAvg.insert({expLife: 30.44, currentAge: 54});
  CLT.ImsExplifeAvg.insert({expLife: 29.55, currentAge: 55});
  CLT.ImsExplifeAvg.insert({expLife: 28.66, currentAge: 56});
  CLT.ImsExplifeAvg.insert({expLife: 27.77, currentAge: 57});
  CLT.ImsExplifeAvg.insert({expLife: 26.89, currentAge: 58});
  CLT.ImsExplifeAvg.insert({expLife: 26.01, currentAge: 59});
  CLT.ImsExplifeAvg.insert({expLife: 25.14, currentAge: 60});
  CLT.ImsExplifeAvg.insert({expLife: 24.27, currentAge: 61});
  CLT.ImsExplifeAvg.insert({expLife: 23.41, currentAge: 62});
  CLT.ImsExplifeAvg.insert({expLife: 22.55, currentAge: 63});
  CLT.ImsExplifeAvg.insert({expLife: 21.70, currentAge: 64});
  CLT.ImsExplifeAvg.insert({expLife: 20.85, currentAge: 65});
  CLT.ImsExplifeAvg.insert({expLife: 20.02, currentAge: 66});
  CLT.ImsExplifeAvg.insert({expLife: 19.19, currentAge: 67});
  CLT.ImsExplifeAvg.insert({expLife: 18.36, currentAge: 68});
  CLT.ImsExplifeAvg.insert({expLife: 17.55, currentAge: 69});
  CLT.ImsExplifeAvg.insert({expLife: 16.75, currentAge: 70});
  CLT.ImsExplifeAvg.insert({expLife: 15.96, currentAge: 71});
  CLT.ImsExplifeAvg.insert({expLife: 15.20, currentAge: 72});
  CLT.ImsExplifeAvg.insert({expLife: 14.45, currentAge: 73});
  CLT.ImsExplifeAvg.insert({expLife: 13.72, currentAge: 74});
  CLT.ImsExplifeAvg.insert({expLife: 13.00, currentAge: 75});
  CLT.ImsExplifeAvg.insert({expLife: 12.30, currentAge: 76});
  CLT.ImsExplifeAvg.insert({expLife: 11.63, currentAge: 77});
  CLT.ImsExplifeAvg.insert({expLife: 10.97, currentAge: 78});
  CLT.ImsExplifeAvg.insert({expLife: 10.34, currentAge: 79});
  CLT.ImsExplifeAvg.insert({expLife: 9.74, currentAge: 80});
  CLT.ImsExplifeAvg.insert({expLife: 9.16, currentAge: 81});
  CLT.ImsExplifeAvg.insert({expLife: 8.60, currentAge: 82});
  CLT.ImsExplifeAvg.insert({expLife: 8.08, currentAge: 83});
  CLT.ImsExplifeAvg.insert({expLife: 7.58, currentAge: 84});
  CLT.ImsExplifeAvg.insert({expLife: 7.10, currentAge: 85});
  CLT.ImsExplifeAvg.insert({expLife: 6.65, currentAge: 86});
  CLT.ImsExplifeAvg.insert({expLife: 6.23, currentAge: 87});
  CLT.ImsExplifeAvg.insert({expLife: 5.84, currentAge: 88});
  CLT.ImsExplifeAvg.insert({expLife: 5.46, currentAge: 89});
  CLT.ImsExplifeAvg.insert({expLife: 5.12, currentAge: 90});
  CLT.ImsExplifeAvg.insert({expLife: 4.79, currentAge: 91});
  CLT.ImsExplifeAvg.insert({expLife: 4.49, currentAge: 92});
  CLT.ImsExplifeAvg.insert({expLife: 4.21, currentAge: 93});
  CLT.ImsExplifeAvg.insert({expLife: 3.95, currentAge: 94});
  CLT.ImsExplifeAvg.insert({expLife: 3.71, currentAge: 95});
  CLT.ImsExplifeAvg.insert({expLife: 3.49, currentAge: 96});
  CLT.ImsExplifeAvg.insert({expLife: 3.28, currentAge: 97});
  CLT.ImsExplifeAvg.insert({expLife: 3.09, currentAge: 98});
  CLT.ImsExplifeAvg.insert({expLife: 2.92, currentAge: 99});
  CLT.ImsExplifeAvg.insert({expLife: 2.76, currentAge: 100});
}

if(CLT.ImsOffNoti.find().count() === 0 ){
  CLT.ImsOffNoti.insert({title: '버킷리스트 이벤트', context: '<p style="text-align: center;">다가 올 유럽여행 중에 꼭 한번&nbsp;</p><p style="text-align: center;">해보고 싶었던&nbsp;</p><p style="text-align: center;"><br></p><p style="text-align: center;"><span style="color: rgb(84, 172, 210);"><span style="font-size: 14px;"><strong><u>!!!! 스카이다이빙 !!!!</u></strong></span></span></p><p><br></p><p><img class="fr-dib fr-fil mCS_img_loaded" src="https://s3.ap-northeast-2.amazonaws.com/s3-ims-prod/bucketlist_images%2F1522406125354-%EC%8A%A4%EC%B9%B4%EC%9D%B4%EB%8B%A4%EC%9D%B4%EB%B9%99_originRe.jpg" style="width: 562px; height: 204.6px;"></p><p style="text-align: center;"><br></p><p style="text-align: center;">일상에서 벗어나 짜릿함을 만끽하고&nbsp;</p><p style="text-align: center;">모든 스트레스를 날려버렸으면 좋겠다!!!</p>', sDate:'2018-06-06 00:00:00', eDate:'2018-06-07 23:59:59', activation:false, order:1, regDate:global.fn_dateFormat().HMS, updateDate:global.fn_dateFormat().HMS});
}
