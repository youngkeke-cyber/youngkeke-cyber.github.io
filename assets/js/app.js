/* ================= 용어 사전 ================= */
const TERMS = {
  "기준중위소득": "우리나라 모든 가구를 소득 순서로 줄 세웠을 때 정확히 가운데 있는 가구의 소득이에요. '중위소득 100% 이하'는 대략 절반보다 소득이 낮다는 뜻이에요.",
  "기초생활수급": "소득과 재산이 일정 기준보다 적어서, 나라에서 생계·의료·주거·교육을 지원받는 가구예요.",
  "차상위계층": "기초생활수급은 아니지만 형편이 어려워서 여러 감면·지원을 받을 수 있는 가구예요.",
  "소득인정액": "월급 같은 실제 소득에, 집·차 같은 재산을 소득으로 바꿔 계산한 금액을 더한 값이에요. 복지 자격을 볼 때 쓰는 '기준 점수' 같은 거예요.",
  "바우처": "현금 대신 쓰는 이용권이에요. 상담·돌봄 같은 서비스를 받을 때 이 이용권으로 비용을 대신 결제해요.",
  "위기상황": "갑작스러운 실직, 주 소득자의 입원 등 생계가 급하게 어려워진 상태를 말해요. 이걸 인정받으면 긴급 지원을 받을 수 있어요.",
  "본인부담금": "전체 비용 중에서 내가 직접 내야 하는 몫이에요. 소득이 낮을수록 이 몫이 줄어들어요.",
  "사례관리": "담당 선생님 한 명이 내 상황을 계속 지켜보면서, 필요한 지원을 그때그때 연결해 주는 방식이에요. 한 번 지원하고 끝나지 않아요."
};

/* ================= 지역 ================= */
const REGIONS = ["서울","부산","대구","인천","광주","대전","울산","세종","경기","강원","충북","충남","전북","전남","경북","경남","제주"];
const CENTER_ACTIVE = ["인천","울산","충북","전북"];   // 청년미래센터 운영 중 (시범 → 본사업)
const CENTER_SOON = ["대구"];                          // 2026년 개소 예정 발표

/* 지역별 자체 혜택 (전국 확대 중인 청년미래센터 + 지자체 자체 사업 예시) */
const REGION_EXTRA = {
  "서울":[
    { name:"서울시 가족돌봄청년 지원사업", cat:"care", catLabel:"전담 지원", badge:["on","운영 중"], modes:["teen","youth"],
      one:"9~34세 가족돌봄청(소)년이 온라인으로 등록하면 전담팀이 생활·돌봄·의료 지원을 맞춤 연계",
      amount:"전담팀 사례관리 + 기존 제도 맞춤 연계", how:"서울복지포털 온라인 등록 · 서울시복지재단 02-6353-0336",
      link:["서울복지포털 · 온라인 등록 ↗","https://wis.seoul.go.kr"] },
    { name:"서울형 긴급복지", cat:"money", catLabel:"긴급 생계", badge:["on","운영 중"], modes:["teen","youth"],
      one:"국가 긴급복지보다 문턱을 낮춘 서울시 자체 위기가구 지원", amount:"생계·의료·주거비 등", how:"동주민센터", link:null },
    { name:"희망두배 청년통장", cat:"money", catLabel:"자산 형성", badge:["on","운영 중"], modes:["youth"],
      one:"일하는 청년이 저축하면 서울시가 같은 금액을 더해주는 자산형성 통장", amount:"본인 저축액 100% 추가 적립 (2~3년)", how:"동주민센터 · 서울복지포털", link:null }
  ],
  "경기":[
    { name:"경기도형 긴급복지 (무한돌봄)", cat:"money", catLabel:"긴급 생계", badge:["on","운영 중"], modes:["teen","youth"],
      one:"국가 기준에서 탈락해도 경기도 자체 기준으로 한 번 더 지원하는 위기가구 제도", amount:"생계·의료·주거비 등", how:"읍·면·동 주민센터 · 경기도 콜센터 031-120", link:null }
  ],
  "전북":[
    { name:"전북형 긴급복지", cat:"money", catLabel:"긴급 생계", badge:["on","운영 중"], modes:["teen","youth"],
      one:"국가 기준보다 완화된 전북 자체 기준으로 위기가구를 지원", amount:"생계·의료비 등", how:"읍·면·동 주민센터", link:null }
  ]
};

function centerCard(region){
  let badge = ["check","전국 확대 중 · 확인 필요"];
  let extra = "2026년부터 전국 확대가 진행 중이에요. 우리 지역 개소 여부는 청년ON에서 확인하세요.";
  if(CENTER_ACTIVE.includes(region)){ badge = ["on","운영 중"]; extra = "이 지역은 센터가 운영 중이라 지금 바로 신청할 수 있어요."; }
  else if(CENTER_SOON.includes(region)){ badge = ["soon","2026년 개소 예정"]; extra = "이 지역은 올해 개소가 예정되어 있어요. 그 전에는 청년ON 온라인 창구를 이용하세요."; }
  return {
    name:"청년미래센터 — 가족돌봄청년 전담지원", cat:"care", catLabel:"전담 지원", badge, modes:["teen","youth"],
    one:"13~34세 가족돌봄청(소)년을 전담 인력이 발굴해 자립까지 밀착 사례관리하는 전담기관. " + extra,
    amount:"자기돌봄비 연 최대 200만 원 + 아픈 가족 돌봄서비스 연계 + 장학금 등 민·관 자원 연계",
    how:"청년ON 온라인 신청 · 지역 청년미래센터",
    link:["청년ON · 온라인 신청 ↗","https://www.mohw2030.co.kr"]
  };
}
function regionBenefits(region, mode){
  const list = [centerCard(region), ...(REGION_EXTRA[region] || [])];
  if(!REGION_EXTRA[region]){
    list.push({ name:"지자체형 긴급복지·위기가구 지원", cat:"money", catLabel:"긴급 생계", badge:["check","주민센터 확인"], modes:["teen","youth"],
      one:"많은 지자체가 국가 기준에서 벗어난 가구를 자체 기준으로 지원해요. 우리 지역 명칭과 기준을 주민센터에서 확인하세요.",
      amount:"생계·의료비 등 (지자체별 상이)", how:"읍·면·동 주민센터", link:null });
  }
  return list.filter(b => b.modes.includes(mode));
}

/* ================= 전국 공통 지원제도 ================= */
const BENEFITS = [
  {
    id:"selfcare", name:"가족돌봄청년 자기돌봄비", cat:"money", catLabel:"생활·자기돌봄", mode:"both",
    one:"가족 돌봄을 전담하는 청소년·청년에게 연 최대 200만 원의 자기돌봄비를 지원",
    who:"아픈 가족을 돌보는 13~34세 청(소)년 (기준중위소득 100% 이하 가구)",
    amount:"연 최대 200만 원 (자기돌봄 목적 사용)",
    when:"청년미래센터 운영 지역 중심 — 전국 확대 중",
    docs:"신분증, 가족관계증명서, 돌봄대상 진단서류 — 센터가 준비를 도와줘요",
    how:"청년ON 온라인 신청 또는 지역 청년미래센터",
    details:["자기돌봄비: 자기계발·심리지원·의료비 등 (연 최대 200만 원)", "전담 인력의 밀착 사례관리 (자립 시까지)", "아픈 가족: 장기요양·일상돌봄 등 돌봄서비스 연계", "장학금·주거·일자리 등 민·관 자원 연계"],
    tags:{ income:["basic","next","unknown"], need:["money","mind","care"], situ:["elder","disab","ill","mindf"] },
    apply:{label:"청년ON에서 신청하기 ↗", url:"https://www.mohw2030.co.kr"},
    stepLinks:{ 0:["청년ON · 자가진단·신청 ↗","https://www.mohw2030.co.kr"], 1:["정부24 · 가족관계증명서 발급 ↗","https://www.gov.kr"] },
    steps:[
      ["청년ON에서 신청하기","청년ON 홈페이지에서 비대면으로 신청할 수 있어요. 주민센터에 가지 않아도 돼요."],
      ["서류 준비하기","가족관계증명서(정부24 무료 발급)와 돌봄대상 진단서류를 준비해요. 막히면 센터가 함께 챙겨줘요."],
      ["센터 상담 받기","전담 선생님이 상황을 확인하고 대상자로 선정되면 밀착 사례관리가 시작돼요."],
      ["심사 기다리기","자기돌봄비는 가구 소득(기준중위소득 100% 이하)을 확인한 뒤 결정돼요."],
      ["지급·연계 확인","자기돌봄비가 지급되고, 아픈 가족을 위한 돌봄서비스도 함께 연결돼요."]
    ]
  },
  {
    id:"edu", name:"교육급여 · 교육비 지원", cat:"edu", catLabel:"학업", mode:"teen",
    one:"초·중·고 학생에게 교육활동지원비와 입학금·수업료 등을 지원 — 학업만큼은 걱정 없이",
    who:"기초생활수급 가구의 초·중·고 학생 (교육비 지원은 차상위계층 등까지 폭넓게)",
    amount:"연 1회 교육활동지원비 + 교과서비·고교 입학금·수업료 등",
    when:"매년 3월 집중신청 기간 (연중 신청도 가능)",
    docs:"신청서, 가구 소득 확인 서류 (주민센터에서 함께 확인해줘요)",
    how:"복지로 온라인 또는 주소지 주민센터",
    details:["교육활동지원비: 학용품·참고서 등 (연 1회 지급)", "교과서비·부교재비", "고등학교 입학금·수업료", "학교 급식비 (교육비 지원)"],
    tags:{ income:["basic","next","unknown"], need:["money"], situ:["elder","disab","ill","mindf"] },
    apply:{label:"복지로에서 신청하기 ↗", url:"https://www.bokjiro.go.kr"},
    stepLinks:{ 1:["복지로 · 온라인 신청 ↗","https://www.bokjiro.go.kr"] },
    steps:[
      ["자격 확인하기","우리 집이 기초생활수급·차상위계층에 해당하는지 확인해요. 모르면 주민센터에 물어봐도 돼요."],
      ["3월 집중신청 기간에 신청","복지로 온라인 또는 주민센터에서 신청해요. 놓쳤어도 연중 신청이 가능해요."],
      ["심사 기다리기","가구 소득을 확인하는 절차가 진행돼요."],
      ["지급 확인","교육활동지원비가 지급되고, 수업료 등은 학교로 직접 지원돼요."]
    ]
  },
  {
    id:"yspecial", name:"청소년 특별지원", cat:"money", catLabel:"위기 청소년", mode:"teen",
    one:"보호자의 돌봄을 기대하기 어려운 위기 청소년에게 생활·건강·학업비를 직접 지원",
    who:"만 9~24세 위기 청소년 (가족돌봄 상황 포함, 소득 기준 있음)",
    amount:"생활지원비(월 단위)·건강지원·학업지원 등 최대 1년 (연장 가능)",
    when:"연중 상시 신청",
    docs:"신청서, 상황을 설명할 수 있는 자료 — 부족해도 1388 상담부터 시작할 수 있어요",
    how:"주소지 주민센터 또는 청소년상담복지센터 (전화 1388)",
    details:["생활지원: 의식주 비용 월 단위 지급", "건강지원: 진료·치료비", "학업지원: 수업료·검정고시 준비 비용", "상담지원: 전문 심리상담 비용"],
    tags:{ income:["basic","next","unknown"], need:["money","urgent"], situ:["elder","disab","ill","mindf"] },
    apply:{label:"1388에 전화로 물어보기", url:"tel:1388"},
    stepLinks:{ 0:["청소년전화 1388 전화하기","tel:1388"] },
    steps:[
      ["1388에 먼저 전화하기","24시간 열려 있는 청소년전화 1388에 상황을 그대로 이야기하면, 신청 가능 여부를 함께 봐줘요."],
      ["신청서 작성 돕기 요청","청소년상담복지센터 선생님이 신청서 작성을 도와줄 수 있어요. 혼자 쓰지 않아도 돼요."],
      ["주민센터 접수","작성한 서류를 주민센터에 접수해요 (센터가 동행해줄 수 있어요)."],
      ["심의 결과 확인","시·군·구 심의를 거쳐 지원이 결정돼요."],
      ["매월 지원 확인","생활지원비 등이 지급돼요. 상황이 바뀌면 센터에 알려주세요."]
    ]
  },
  {
    id:"ymind", name:"청소년 마음건강 상담 (1388)", cat:"mind", catLabel:"마음 건강", mode:"teen",
    one:"전화·채팅·대면 상담 모두 무료 — 돌봄으로 지친 마음을 털어놓을 수 있는 곳",
    who:"만 9~24세 청소년 누구나 (소득·자격 조건 없음)",
    amount:"전화·사이버·대면 상담 무료 (횟수 제한 없이 지속 상담 가능)",
    when:"24시간 365일",
    docs:"필요 없음 — 전화 한 통이면 시작돼요",
    how:"청소년전화 1388, 청소년사이버상담센터, 지역 청소년상담복지센터",
    details:["전화 상담: 국번 없이 1388 (24시간)", "채팅·문자 상담: 사이버상담센터", "대면 상담: 우리 지역 청소년상담복지센터 연계", "필요 시 청소년 특별지원 등 다른 제도로 연결"],
    tags:{ income:["basic","next","none","unknown"], need:["mind"], situ:["elder","disab","ill","mindf"] },
    apply:{label:"지금 1388 전화하기", url:"tel:1388"},
    stepLinks:{ 0:["청소년전화 1388 전화하기","tel:1388"], 1:["청소년사이버상담센터 ↗","https://www.1388.go.kr"] },
    steps:[
      ["전화 또는 채팅으로 시작","말하기 어려우면 채팅 상담부터 시작해도 괜찮아요."],
      ["온라인 상담 이용해보기","밤에도, 익명으로도 상담할 수 있어요."],
      ["대면 상담 연결받기","계속 이야기하고 싶으면 우리 지역 상담복지센터의 정기 상담으로 연결돼요."],
      ["다른 지원과 연결","상담 선생님이 청소년 특별지원 등 받을 수 있는 다른 제도까지 함께 찾아줘요."]
    ]
  },
  {
    id:"ymindv", name:"청년 마음건강 지원 (심리상담 바우처)", cat:"mind", catLabel:"마음 건강", mode:"youth",
    one:"전문 심리상담 10회를 바우처로 지원 — 돌봄으로 지친 마음을 먼저 돌봐요",
    who:"19~34세 청년 (가족돌봄청년 등은 우선 선발)",
    amount:"1:1 전문 심리상담 10회 (회당 50분, 본인부담금 일부)",
    when:"지자체별 공고 시 신청 (연중 수시)",
    docs:"신분증 (가족돌봄청년은 증빙 시 우선순위)",
    how:"복지로 온라인 신청 또는 주민센터",
    details:["1:1 전문 심리상담 10회 (회당 50분)", "가족돌봄청년·자립준비청년은 우선 선발", "집·학교 근처 등록 상담기관 선택 가능", "필요 시 정신건강복지센터 연계"],
    tags:{ income:["basic","next","none","unknown"], need:["mind"], situ:["elder","disab","ill","mindf"] },
    apply:{label:"복지로에서 신청하기 ↗", url:"https://www.bokjiro.go.kr"},
    stepLinks:{ 0:["복지로 · 온라인 신청 ↗","https://www.bokjiro.go.kr"] },
    steps:[
      ["복지로에서 신청하기","복지로 앱/웹 로그인 후 '청년마음건강'을 검색해 신청해요."],
      ["대상 선정 기다리기","가족돌봄청년임을 증빙하면 우선 선발될 수 있어요."],
      ["상담기관 고르기","집이나 직장·학교에서 다니기 편한 등록 상담기관을 골라요."],
      ["첫 상담 예약하기","바우처 카드를 받으면 기관에 전화해 첫 회기를 예약해요."],
      ["10회 이용하기","한 달에 몇 회씩 나눠 써도 괜찮아요. 나에게 맞는 속도로!"]
    ]
  },
  {
    id:"rent", name:"청년월세 지원", cat:"house", catLabel:"주거", mode:"youth",
    one:"부모와 떨어져 사는 청년에게 월세 일부를 일정 기간 지원",
    who:"19~34세, 부모와 별도 거주하는 무주택 청년 (소득인정액 기준 충족)",
    amount:"월 최대 20만 원 수준 × 최대 12개월 (공고별 상이)",
    when:"공고 기간 내 신청 (복지로에서 확인)",
    docs:"임대차계약서, 월세 이체 내역, 신분증, 소득 증빙",
    how:"복지로 온라인 또는 주소지 주민센터",
    details:["월세 현금 지원 (매월 지급)", "복지로 모의계산으로 사전 자격 확인 가능", "지자체 자체 월세 지원과 중복 여부 확인 필요", "이사 등 변동사항은 신고 필수"],
    tags:{ income:["basic","next","unknown"], need:["house"], situ:["elder","disab","ill","mindf"] },
    apply:{label:"복지로에서 신청하기 ↗", url:"https://www.bokjiro.go.kr"},
    stepLinks:{ 0:["복지로 · 모의계산 해보기 ↗","https://www.bokjiro.go.kr"], 2:["복지로 · 온라인 신청 ↗","https://www.bokjiro.go.kr"] },
    steps:[
      ["자격 자가진단","복지로의 모의계산으로 소득인정액 기준을 먼저 확인해요."],
      ["계약서·이체내역 준비","임대차계약서 사본과 최근 월세 이체 내역을 캡처/발급해요."],
      ["온라인 신청","복지로에서 신청서를 작성하고 서류를 첨부해요."],
      ["심사 기다리기","시·군·구에서 소득·거주 요건을 확인해요 (약 1~2개월)."],
      ["매월 지급 확인","선정되면 매월 통장으로 들어와요. 변동사항(이사 등)은 꼭 신고해요."]
    ]
  },
  {
    id:"kua", name:"국민취업지원제도", cat:"work", catLabel:"일자리·수당", mode:"youth",
    one:"구직촉진수당을 받으면서 취업 준비까지 — 돌봄과 구직을 병행하는 청년에게",
    who:"구직 중인 청년 (청년 특례 요건 있음, 유형별 소득 기준)",
    amount:"구직촉진수당 월 50만 원 × 6개월 + 취업지원 서비스 (Ⅰ유형 기준)",
    when:"연중 상시 신청",
    docs:"신분증, 소득·재산 관련 서류 (고용센터에서 안내)",
    how:"국민취업지원제도 홈페이지 또는 관할 고용센터 (상담 1350)",
    details:["구직촉진수당: 월 50만 원 × 6개월 (Ⅰ유형)", "취업활동계획 수립·직업훈련 연계", "이력서·면접 컨설팅 등 취업지원 서비스", "취업 성공 시 성공수당 지급"],
    tags:{ income:["basic","next","none","unknown"], need:["money"], situ:["elder","disab","ill","mindf"] },
    apply:{label:"국민취업지원제도 ↗", url:"https://www.kua.go.kr"},
    stepLinks:{ 0:["국민취업지원제도 · 온라인 신청 ↗","https://www.kua.go.kr"], 1:["고용노동부 상담 1350 전화","tel:1350"] },
    steps:[
      ["온라인으로 신청하기","국민취업지원제도 홈페이지에서 회원가입 후 신청해요."],
      ["고용센터 상담 받기","담당자와 상담하며 유형(Ⅰ/Ⅱ)을 확인해요. 돌봄 상황을 이야기하면 일정 조정을 도와줘요."],
      ["취업활동계획 세우기","나의 상황에 맞는 구직 활동 계획을 함께 만들어요."],
      ["수당 받으며 구직하기","계획을 이행하면 구직촉진수당이 매월 지급돼요."],
      ["취업·성공수당 확인","취업에 성공하면 근속에 따라 성공수당도 받을 수 있어요."]
    ]
  },
  {
    id:"ltc", name:"노인장기요양보험", cat:"care", catLabel:"돌봄 대체", mode:"both",
    one:"요양보호사 방문 등 공적 돌봄으로 내가 짊어진 돌봄 부담을 덜어주는 제도",
    who:"돌봄 대상이 65세 이상이거나 노인성 질환(치매·뇌혈관질환 등)이 있는 경우 (돌보는 가족이 대신 신청 가능)",
    amount:"방문요양·주야간보호·단기보호 등 (등급별, 본인부담금 일부)",
    when:"연중 상시 신청 (등급 판정 약 30일)",
    docs:"의사소견서, 신분증 — 신청은 돌보는 가족이 대신 할 수 있어요",
    how:"국민건강보험공단 (전화 1577-1000) 또는 공단 지사",
    details:["방문요양: 요양보호사가 집으로 방문", "주야간보호: 낮 동안 시설에서 돌봄 (나의 학업·일 시간 확보)", "단기보호: 며칠간 시설 입소", "복지용구: 지팡이·안전손잡이 등 구입·대여 지원"],
    tags:{ income:["basic","next","none","unknown"], need:["care"], situ:["elder"], situRequired:{teen:["elder"], youth:["elder"]} },
    apply:{label:"장기요양보험 사이트 ↗", url:"https://www.longtermcare.or.kr"},
    stepLinks:{ 0:["건강보험공단 1577-1000 전화하기","tel:15771000"], 4:["장기요양 · 요양기관 찾기 ↗","https://www.longtermcare.or.kr"] },
    steps:[
      ["공단에 등급 신청","1577-1000에 전화해 장기요양등급 신청 방법을 안내받아요. 돌보는 가족의 대리 신청이 가능해요."],
      ["의사소견서 발급","다니던 병원에서 의사소견서를 발급받아 제출해요."],
      ["방문조사 받기","공단 직원이 집으로 와서 상태를 확인해요."],
      ["등급 판정 확인 (약 30일)","등급이 나오면 이용 가능한 서비스와 본인부담금이 정해져요."],
      ["요양기관 계약·이용","방문요양 등 기관과 계약하고 서비스를 시작해요. 나에게 자기 시간이 생겨요."]
    ]
  },
  {
    id:"dailycare", name:"일상돌봄 서비스", cat:"care", catLabel:"돌봄 대체", mode:"both",
    one:"돌봄·가사·식사 지원 인력이 방문해 가족의 돌봄 부담을 덜어주는 서비스",
    who:"돌봄이 필요한 가족과 사는 가구 (가족돌봄청년 가구 포함)",
    amount:"재가 돌봄·가사 지원 월 12~72시간, 식사 배달 등 (소득에 따라 본인부담금 차등)",
    when:"연중 상시 (시행 지역 확인 필요)",
    docs:"신분증, 건강보험료 납부확인서, 돌봄대상 진단서류",
    how:"주소지 읍·면·동 주민센터",
    details:["재가 돌봄: 신체 활동·일상 지원", "가사 지원: 청소·세탁·장보기", "식사 지원: 반찬·도시락 배달", "심리 지원 등 지역별 특화 서비스"],
    tags:{ income:["basic","next","none","unknown"], need:["care"], situ:["elder","disab","ill","mindf"] },
    apply:{label:"복지로에서 확인하기 ↗", url:"https://www.bokjiro.go.kr"},
    stepLinks:{ 0:["보건복지상담센터 129 전화하기","tel:129"], 1:["건강보험공단 1577-1000 전화하기","tel:15771000"] },
    steps:[
      ["주민센터에 문의하기","우리 지역이 시행 지역인지 전화로 먼저 확인해요."],
      ["서류 준비하기","건강보험료 납부확인서는 건강보험공단(1577-1000)에서 발급받아요."],
      ["신청·조사 받기","담당자가 가구 상황을 확인하는 조사가 있어요. 돌봄 상황을 솔직하게 말해요."],
      ["서비스 계약하기","제공기관과 이용 시간·요일을 정해요."],
      ["이용 시작","서비스가 시작돼요. 불편한 점은 제공기관에 바로 이야기해요."]
    ]
  },
  {
    id:"emergency", name:"긴급복지 지원", cat:"money", catLabel:"긴급 생계", mode:"both",
    one:"위기상황으로 생계가 막막할 때, 심사 전에 먼저 지원하는 긴급 제도",
    who:"주 소득자의 입원·실직 등 위기상황에 놓인 가구 (연령 무관)",
    amount:"생계비·의료비·주거비 등 최대 6개월",
    when:"위기 발생 즉시 — 24시간 전화 가능",
    docs:"위기상황 증빙(진단서·해고통지서 등) — 부족해도 먼저 상담 가능",
    how:"보건복지상담센터 129 또는 주민센터 (선지원 후조사)",
    details:["생계지원: 가구원 수 기준 월 생계비", "의료지원: 입원·수술비", "주거지원: 임시 거처 비용", "연료비·교육비 등 부가 지원"],
    tags:{ income:["basic","next","none","unknown"], need:["urgent","money"], situ:["elder","disab","ill","mindf"] },
    apply:{label:"지금 129 전화하기", url:"tel:129"},
    stepLinks:{ 0:["국번 없이 129 전화하기","tel:129"], 4:["복지로 · 다른 제도 둘러보기 ↗","https://www.bokjiro.go.kr"] },
    steps:[
      ["129에 전화하기","보건복지상담센터 129는 24시간 열려 있어요. 상황을 그대로 말하면 돼요."],
      ["위기상황 설명하기","'선지원 후조사'라서 서류가 완벽하지 않아도 우선 지원될 수 있어요."],
      ["현장 확인 협조","담당 공무원이 상황을 확인하러 올 수 있어요."],
      ["지원 결정·지급","빠르면 며칠 안에 생계비가 지급돼요."],
      ["연계 상담 받기","긴급지원 이후 이용할 수 있는 다른 제도까지 함께 안내받아요."]
    ]
  }
];

/* ================= 진단 질문 ================= */
const Q_MODE = { key:"mode", title:"누구를 위한 안내인가요?", help:"대상에 맞춰 연결되는 제도와 질문이 달라져요.",
  opts:[["teen","청소년이에요 — 13~18세, 가족을 돌보고 있어요"],["youth","청년이에요 — 19~34세, 가족을 돌보고 있어요"]] };
const Q_REGION = { key:"region", title:"어느 지역에 살고 계세요?", help:"지역마다 복지 정책이 달라요. 우리 지역에서만 받을 수 있는 혜택까지 함께 보여드려요.", grid:true,
  opts: REGIONS.map(r=>[r,r]) };
const Q_SITU = { key:"situ", title:"주로 돌보는 가족은 어떤 상황인가요?", help:"돌봄 대상에 따라 연결되는 제도가 달라요.",
  opts:[["elder","고령이거나 치매 등 노인성 질환이 있어요"],["disab","장애가 있어요"],["ill","큰 병으로 투병 중이에요"],["mindf","마음 건강의 어려움이 있어요"]] };

const Q_SETS = {
  teen:[
    Q_SITU,
    { key:"income", title:"우리 집 형편과 가장 가까운 것은?", help:"어려우면 「잘 모르겠어요」를 골라도 돼요. 결과에서 확인 방법을 함께 알려드려요.",
      opts:[["basic","기초생활수급 가구예요"],["next","차상위계층이에요"],["none","해당하지 않아요"],["unknown","잘 모르겠어요"]] },
    { key:"need", title:"지금 가장 필요한 도움은?", help:"가장 급한 것 하나만 골라주세요. 나머지도 결과에서 함께 보여드려요.",
      opts:[["money","생활비·학업 지원"],["care","돌봄을 대신할 손길"],["mind","지친 마음을 돌볼 곳"],["urgent","갑자기 생긴 위기 (실직·입원 등)"]] }
  ],
  youth:[
    Q_SITU,
    { key:"income", title:"우리 집 형편과 가장 가까운 것은?", help:"어려우면 「잘 모르겠어요」를 골라도 돼요. 주민센터·센터에서 함께 확인할 수 있어요.",
      opts:[["basic","기초생활수급 가구예요"],["next","차상위계층이에요"],["none","해당하지 않아요"],["unknown","잘 모르겠어요"]] },
    { key:"need", title:"지금 가장 필요한 도움은?", help:"가장 급한 것 하나만 골라주세요.",
      opts:[["money","생활비·일자리 지원"],["care","돌봄을 대신할 손길"],["mind","지친 마음을 돌볼 곳"],["house","주거 지원 (월세 등)"]] }
  ]
};

let QUESTIONS = [Q_MODE, Q_REGION, ...Q_SETS.teen];
let qi = 0;
const answers = {};

const qbar = document.getElementById('qbar');
const qcount = document.getElementById('qcount');
const qtitle = document.getElementById('qtitle');
const qhelp = document.getElementById('qhelp');
const qopts = document.getElementById('qopts');
const qprev = document.getElementById('qprev');
const qnext = document.getElementById('qnext');

function selectOpt(q, val){
  if(q.key === 'mode' && answers.mode !== val){
    ['situ','income','need'].forEach(k=>delete answers[k]);
    QUESTIONS = [Q_MODE, Q_REGION, ...Q_SETS[val]];
  }
  answers[q.key] = val;
  renderQ();
}

function renderQ(){
  const q = QUESTIONS[qi];
  qcount.textContent = `질문 ${qi+1} / ${QUESTIONS.length}`;
  qtitle.textContent = q.title;
  qhelp.textContent = q.help;
  qbar.style.width = (qi / QUESTIONS.length * 100) + '%';
  qopts.className = 'opts' + (q.grid ? ' grid' : '');
  qopts.innerHTML = '';
  q.opts.forEach(([val, label])=>{
    const b = document.createElement('button');
    b.className = 'opt' + (answers[q.key]===val ? ' sel' : '');
    b.textContent = label;
    b.onclick = ()=> selectOpt(q, val);
    qopts.appendChild(b);
  });
  qprev.style.visibility = qi===0 ? 'hidden' : 'visible';
  qnext.disabled = !answers[q.key];
  qnext.textContent = qi === QUESTIONS.length-1 ? '결과 보기 →' : '다음 →';
}
qprev.onclick = ()=>{ if(qi>0){ qi--; renderQ(); } };
qnext.onclick = ()=>{
  if(qi < QUESTIONS.length-1){ qi++; renderQ(); }
  else finishQuiz();
};

/* ================= 매칭 로직 ================= */
function matchScore(b){
  const m = answers.mode;
  if(b.mode !== 'both' && b.mode !== m) return -1;
  if(!b.tags.income.includes(answers.income)) return -1;
  const req = b.tags.situRequired && b.tags.situRequired[m];
  if(req && !req.includes(answers.situ)) return -1;
  let s = 1;
  if(b.tags.need.includes(answers.need)) s += 3;
  if(b.tags.situ && b.tags.situ.includes(answers.situ)) s += 2;
  return s;
}

function finishQuiz(){
  qbar.style.width = '100%';
  const scored = BENEFITS.map(b=>({b, s:matchScore(b)}))
    .filter(x=>x.s>=0).sort((a,c)=>c.s-a.s).slice(0,5);
  renderResults(scored.map(x=>x.b));
  setTrail(2);
  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({behavior:'smooth'});
}

/* ================= 용어 치환 ================= */
function withTerms(text){
  let out = text;
  Object.keys(TERMS).forEach(t=>{
    if(out.includes(t)){
      out = out.replace(t, `<span class="term" tabindex="0">${t}<span class="tip"><b>${t}</b><br>${TERMS[t]}</span></span>`);
    }
  });
  return out;
}

/* ================= 결과 렌더 ================= */
function renderResults(list){
  const who = answers.mode === 'youth' ? '청년' : '청소년';
  document.getElementById('resultNote').innerHTML =
    `<b>${answers.region}</b> 지역 ${who} 기준으로, 지금 상황에 해당할 가능성이 높은 전국 공통 지원 <b>${list.length}개</b>와 아래의 <b>우리 지역 혜택</b>을 찾았어요.`;

  const wrap = document.getElementById('cardList');
  wrap.innerHTML = '';
  list.forEach((b, idx)=> wrap.appendChild(buildCard(b, idx===0)));

  /* 지역 혜택 */
  const rlist = regionBenefits(answers.region, answers.mode);
  document.getElementById('regionHead').innerHTML = `
    <div>
      <div class="rh-title">📍 ${answers.region}에서 받을 수 있는 혜택 ${rlist.length}개</div>
      <div class="rh-sub">전국 공통 제도와 별개로, ${answers.region} 지역이라서 받을 수 있는 지원이에요. 지역 사업은 명칭과 기준이 바뀔 수 있으니 신청 전에 창구에서 한 번 더 확인하세요.</div>
    </div>`;
  const rwrap = document.getElementById('regionList');
  rwrap.innerHTML = '';
  rlist.forEach(b=> rwrap.appendChild(buildRegionCard(b)));
}

function buildCard(b, star){
  const el = document.createElement('div');
  el.className = 'bcard';
  el.innerHTML = `
    <div class="top">
      <span class="cat ${b.cat}">${b.catLabel}</span>
      <h3 class="serif">${star ? '⭐ ' : ''}${b.name}</h3>
      <div class="one-line">${b.one}</div>
    </div>
    <dl class="grid">
      <dt>누가</dt><dd>${withTerms(b.who)}</dd>
      <dt>얼마나</dt><dd>${withTerms(b.amount)}</dd>
      <dt>서류</dt><dd>${withTerms(b.docs)}</dd>
      <dt>어디서</dt><dd>${withTerms(b.how)}</dd>
      <dt>언제</dt><dd>${withTerms(b.when)}</dd>
    </dl>
    <button class="detail-toggle">+ 세부 지원 항목 보기</button>
    <div class="details"><ul>${b.details.map(d=>`<li>${withTerms(d)}</li>`).join('')}</ul></div>
    <div class="foot">
      <button class="btn-main" onclick="openRoadmap('${b.id}')">신청 동행 시작 →</button>
      <a class="btn-site" href="${b.apply.url}" ${b.apply.url.startsWith('tel:') ? '' : 'target="_blank" rel="noopener"'}>${b.apply.label}</a>
    </div>`;
  const tg = el.querySelector('.detail-toggle');
  const dt = el.querySelector('.details');
  tg.onclick = ()=>{
    dt.classList.toggle('open');
    tg.textContent = dt.classList.contains('open') ? '− 세부 지원 항목 접기' : '+ 세부 지원 항목 보기';
  };
  return el;
}

function buildRegionCard(b){
  const el = document.createElement('div');
  el.className = 'bcard rcard';
  el.innerHTML = `
    <div class="top">
      <span class="cat ${b.cat}">${b.catLabel}</span><span class="rbadge ${b.badge[0]}">${b.badge[1]}</span>
      <h3 class="serif">${b.name}</h3>
      <div class="one-line">${withTerms(b.one)}</div>
    </div>
    <dl class="grid">
      <dt>얼마나</dt><dd>${withTerms(b.amount)}</dd>
      <dt>어디서</dt><dd>${withTerms(b.how)}</dd>
    </dl>
    <div class="foot">
      ${b.link ? `<a class="btn-site" href="${b.link[1]}" target="_blank" rel="noopener">${b.link[0]}</a>` : `<a class="btn-site" href="tel:129">📞 129에 물어보기</a>`}
    </div>`;
  return el;
}

/* ================= 신청 동행 로드맵 ================= */
const RM_STORE = 'dolbomongil.rmChecks.v1';
function loadRmChecks(){
  try{ return JSON.parse(localStorage.getItem(RM_STORE)) || {}; }
  catch(e){ return {}; }
}
function saveRmChecks(){
  try{ localStorage.setItem(RM_STORE, JSON.stringify(rmChecks)); }
  catch(e){ /* 저장 불가(사생활 보호 모드 등)해도 진행에는 문제 없음 */ }
}
const rmChecks = loadRmChecks(); // localStorage로 진행 상태 유지
let curB = null;

function openRoadmap(id){
  const b = BENEFITS.find(x=>x.id===id);
  curB = b;
  if(!rmChecks[id] || rmChecks[id].length !== b.steps.length){
    rmChecks[id] = new Array(b.steps.length).fill(false);
  }
  document.getElementById('rmTitle').textContent = b.name;
  document.getElementById('rmSub').textContent = `신청 창구: ${b.how}`;
  const wrap = document.getElementById('rmSteps');
  wrap.innerHTML = '';
  b.steps.forEach(([t,d], i)=>{
    const sl = b.stepLinks ? b.stepLinks[i] : null;
    const isTel = sl && sl[1].startsWith('tel:');
    const row = document.createElement('label');
    row.className = 'rstep' + (rmChecks[id][i] ? ' done' : '');
    row.innerHTML = `
      <input type="checkbox" ${rmChecks[id][i]?'checked':''}>
      <div>
        <div class="t">STEP ${i+1}. ${t}</div>
        <div class="d">${d}</div>
        ${sl ? `<a class="step-act${isTel?' tel':''}" href="${sl[1]}" ${isTel?'':'target="_blank" rel="noopener"'} onclick="event.stopPropagation()">${isTel?'📞 ':''}${sl[0]}</a>` : ''}
      </div>`;
    row.querySelector('input').onchange = (e)=>{
      rmChecks[id][i] = e.target.checked;
      row.classList.toggle('done', e.target.checked);
      saveRmChecks();
      updateRmProgress(id);
    };
    wrap.appendChild(row);
  });
  updateRmProgress(id);
  renderCoord();
  setTrail(3);
  document.getElementById('roadmap').style.display = 'block';
  document.getElementById('roadmap').scrollIntoView({behavior:'smooth'});
}

function updateRmProgress(id){
  const arr = rmChecks[id];
  const pct = Math.round(arr.filter(Boolean).length / arr.length * 100);
  document.getElementById('rmFill').style.width = pct + '%';
  document.getElementById('rmPct').textContent = pct + '%';
  const ta = document.getElementById('coordMsg');
  if(ta && ta.dataset.edited !== '1') ta.value = coordMsgText();
}

/* ================= 동행 코디네이터 ================= */
function coordInfo(){
  const region = answers.region || '우리';
  if(answers.mode === 'youth'){
    const active = CENTER_ACTIVE.includes(region);
    const soon = CENTER_SOON.includes(region);
    return {
      org:`청년미래센터${active ? '' : soon ? ' (개소 예정)' : ' (전국 확대 중)'} · ${region} 지역`,
      why: active
        ? `${region}은 가족돌봄청년 전담기관인 청년미래센터가 운영 중이에요. 전담 선생님이 신청부터 자립까지 밀착 사례관리로 함께해요. 시간이 없어도, 절차를 몰라도 괜찮아요.`
        : `청년미래센터가 전국으로 확대되고 있어요. ${region} 지역 개소 전에는 청년ON 온라인 창구로 비대면 신청·상담이 가능하고, 주민센터가 가까운 창구가 되어줘요.`,
      site:["청년ON · 온라인 신청·상담 ↗","https://www.mohw2030.co.kr"],
      tel:["129","보건복지상담센터 129 (24시간)"]
    };
  }
  return {
    org:`학교 사회복지사 · Wee센터 (${region} 지역)`,
    why:`청소년 대상 결과이므로 학교 안 상담 창구를 연결해 드려요. 신청서 작성이나 주민센터 방문이 부담스러우면, 코디네이터가 함께 확인하고 동행해요. 혼자 하지 않아도 됩니다.`,
    site:["Wee센터·Wee클래스 찾기 ↗","https://www.wee.go.kr"],
    tel:["1388","청소년전화 1388 (24시간)"]
  };
}

function firstOpenStep(){
  const arr = rmChecks[curB.id];
  const i = arr.indexOf(false);
  return i === -1 ? null : i;
}

function coordMsgText(){
  if(!curB) return '';
  const me = answers.mode === 'youth' ? '가족을 돌보고 있는 청년입니다' : '가족을 돌보고 있는 청소년입니다';
  const i = firstOpenStep();
  const stepTxt = i === null
    ? '모든 단계를 마치고 결과를 기다리고 있습니다'
    : `STEP ${i+1} '${curB.steps[i][0]}' 단계에서 막혔습니다`;
  return `안녕하세요, ${me}.\n「${curB.name}」 신청을 진행 중인데, ${stepTxt}.\n필요한 서류와 다음 절차를 안내해 주실 수 있을까요? 감사합니다.`;
}

function renderCoord(){
  const c = coordInfo();
  const box = document.getElementById('coordBox');
  box.className = 'coord';
  box.innerHTML = `
    <div class="head">
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.4 3-5 6.5-5s6.5 1.6 6.5 5"/><path d="M16 8.5l2 2 3.5-4" stroke="#EFC98A"/></svg>
      <div>
        <div class="role">나의 동행 코디네이터 · 진단 결과 자동 매칭</div>
        <div class="org">${c.org}</div>
      </div>
    </div>
    <div class="bd">
      <p class="why">${c.why} 아래 버튼으로 바로 연결하거나, 요청 메시지를 복사해 문의할 때 사용하세요.</p>
      <div class="coord-actions">
        <a class="step-act" href="${c.site[1]}" target="_blank" rel="noopener">${c.site[0]}</a>
        <a class="step-act tel" href="tel:${c.tel[0]}">📞 ${c.tel[1]}</a>
      </div>
      <div class="msg-label">도움 요청 메시지 — 지금 막힌 단계가 자동으로 담겨요 (수정 가능)</div>
      <textarea id="coordMsg" rows="4" oninput="this.dataset.edited='1'">${coordMsgText()}</textarea>
      <div class="coord-foot">
        <button class="btn-ghost" id="copyBtn" onclick="copyMsg()">메시지 복사</button>
        <button class="btn-main" onclick="requestCoord(this)">코디네이터 연결 요청 (시연)</button>
      </div>
    </div>`;
}

function copyMsg(){
  const ta = document.getElementById('coordMsg');
  ta.select(); ta.setSelectionRange(0, 99999);
  try{ document.execCommand('copy'); }catch(e){}
  if(navigator.clipboard){ navigator.clipboard.writeText(ta.value).catch(()=>{}); }
  const btn = document.getElementById('copyBtn');
  btn.textContent = '복사됨 ✓';
  setTimeout(()=>{ btn.textContent = '메시지 복사'; }, 1500);
}

function requestCoord(btn){
  btn.textContent = '✓ 연결 요청 접수 — 24시간 내 회신 목표 (프로토타입 시연)';
  btn.disabled = true;
}

/* ================= 트레일 ================= */
function setTrail(step){
  document.querySelectorAll('#trail .node').forEach(n=>{
    n.classList.toggle('on', +n.dataset.step <= step);
  });
  document.getElementById('link1').classList.toggle('on', step>=2);
  document.getElementById('link2').classList.toggle('on', step>=3);
}

/* ================= 사전 ================= */
const dictGrid = document.getElementById('dictGrid');
Object.entries(TERMS).forEach(([hard, easy])=>{
  const d = document.createElement('div');
  d.className = 'dict-item';
  d.innerHTML = `<span class="hard">${hard}</span><span class="arrow">→</span><div class="easy">${easy}</div>`;
  dictGrid.appendChild(d);
});

/* 전역 노출 (인라인 onclick 핸들러용) */
window.openRoadmap = openRoadmap;
window.copyMsg = copyMsg;
window.requestCoord = requestCoord;

renderQ();
