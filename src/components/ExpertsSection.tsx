import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Calendar, MapPin, Award, GraduationCap, Briefcase, BookOpen, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileSection {
  title: string;
  items: string[];
}

interface ExpertItem {
  id: string;
  name: string;
  modalTitle?: string;
  role: string;
  shortDesc: string;
  image: string;
  imageClassName?: string;
  avatarBg?: string;
  navigateTo?: string;
  sections?: ProfileSection[];
}

interface ExpertsSectionProps {
  naverPlaceUrl: string;
}

const LEAD_EXPERTS: ExpertItem[] = [
  {
    id: 'yoon-young-jun',
    name: '윤영준 원장',
    role: '상담학 박사 / 국제 임상최면치료사',
    shortDesc: '성범죄 상담 경력 25년 이상, 법원 촉탁 상담위원 역임.',
    image:
      'https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774346422/ChatGPT_Image_2026%EB%85%84_3%EC%9B%94_1%EC%9D%BC_%EC%98%A4%ED%9B%84_10_34_52_ydee1z.png',
    imageClassName: 'object-[51%_21%] scale-[1.8] origin-[51%_47%]',
    avatarBg: 'bg-[#1E3A8A]',
    navigateTo: '/about/profile',
  },
  {
    id: 'so-yoon-ju',
    name: '소윤주 부원장',
    role: '기능의학 / 최면 / 성상담 전문가',
    shortDesc: '기능의학 기반의 심신 통합 치유 전문가.',
    image:
      'https://mhsjoy.mycafe24.com/wp-content/uploads/2024/05/KakaoTalk_20240521_123825759.jpg',
    avatarBg: 'bg-slate-100',
    navigateTo: '/about/vice-profile',
  },
];

const ADVISORY_EXPERTS: ExpertItem[] = [
  {
    id: 'heo-seon-mu',
    name: '허선무 변호사',
    role: '법무법인 소울 변호사 / 성범죄 전문 변호사',
    shortDesc:
      '현재 법무법인 소울 변호사, 창원지방법원 조정위원, 창원지방검찰청 형사조정위원, 대한법률구조공단 구조위원 역임.',
    image:
      'https://res.cloudinary.com/dxjz9ksjg/image/upload/v1774346463/member_view23_nnxzhn.jpg',
    avatarBg: 'bg-slate-900',
    sections: [
      {
        title: '약력 및 주요 경력',
        items: [
          '사법연수원 44기 수료',
          '창원지방법원 민사조정위원',
          '창원지방검찰청 검사직무대리',
          '창원지방법원 국선변호인',
          '대한법률구조공단 창원지부 구조위원',
          '김해중부경찰서 수사민원상담센터 상담변호사',
          '경남 농아인협회 창원지회 자문위원',
          '창원지방검찰청 형사조정위원',
          '이혼·상속 전문변호사 등록',
          '법무법인 소울 변호사',
        ],
      },
    ],
  },
  {
    id: 'kang-ju-o',
    name: '강주오 변호사',
    modalTitle: '강주오 대표 변호사',
    role: '법무법인 로하스 대표변호사',
    shortDesc: '경북도청 및 구미시 법률상담관, 구미시의회 고문변호사.',
    image:
      'https://res.cloudinary.com/dxjz9ksjg/image/upload/v1776971476/73290c9b-6542-4f47-9ea0-ec8be1861807_plqybw.png',
    avatarBg: 'bg-[#1E3A8A]',
    sections: [
      {
        title: '학력',
        items: [
          '대아고등학교 졸업',
          '성균관대학교 졸업 (행정학사, 경제학사)',
          '동아대학교 법학전문대학원 졸업',
        ],
      },
      {
        title: '경력',
        items: [
          '現 법무법인 로하스 대표변호사',
          '現 법무부 창조경제혁신센터 법률지원단 자문 변호사',
          '現 법무부 남북하나재단 북한이탈주민 지원 변호인',
          '現 경북하나센터, 대구하나센터 고문변호사',
          '現 삼성연합의원 탑/예스정형외과의원 등 다수 병원 자문',
          '現 옥계아동병원 자문',
          '現 칠곡북삼 지역주택 조합 고문 변호사',
          '現 삼성전자 주식회사 자문변호사',
          '現 경북지방노동위원회 권리구제대리인',
          '現 국가권익위원회 비실명대리신고 자문변호사',
          '現 중소벤처기업부 불공정거래 신고센터 법률전문위원',
          '現 경북도청 법률상담관, 보건복지부 산하 행복재단 감사',
          '現 구미시 법률 상담관',
          '現 구미시의회 고문변호사',
          '現 구미교육청 학폭심의위원회 위원장',
          '現 대구지방 가정법원 김천지원 민사/가사 조정위원회 부회장',
          '現 구미경찰서 법률상담변호사, 경미범죄심사위원, 여성청소년 지도위원, 아동학대예방 자문의원',
          '現 법무부 법사랑 위원',
          '現 경북경찰청 청원심의위원회 위원',
          '現 경북경찰청 보통징계위원회 위원',
          '現 금오공과대학교 보통징계위원회 위원',
          '現 구미 인동농협/산동농협 상담 변호사',
          '前 법무법인 정인(正人)',
          '前 삼성전자 주식회사 인사팀',
          '前 강동 종합법률사무소 대표변호사',
        ],
      },
    ],
  },
  {
    id: 'baek-jin-wook',
    name: '백진욱 변호사',
    role: '법무법인 로하스 변호사',
    shortDesc: '성범죄 및 형사 사건 전문 법률 조력자.',
    image:
      'https://res.cloudinary.com/dxjz9ksjg/image/upload/v1777026382/bfb4a67d-9cf5-410b-9338-7f76ed3b73b9-md_qycut4.jpg',
    avatarBg: 'bg-slate-900',
    sections: [
      {
        title: '소속',
        items: ['現 법무법인 로하스 변호사'],
      },
      {
        title: '학력',
        items: [
          '고려대학교 사회/행정학 전공',
          '경북대학교 법학전문대학원 졸업',
        ],
      },
      {
        title: '경력',
        items: ['現 법무법인 로하스 변호사', '前 한국부동산원 변호사'],
      },
    ],
  },
  {
    id: 'moon-young-ae',
    name: '문영애 교수',
    role: '상담심리학 박사 / 한국신체심리치료 연구소 대표',
    shortDesc: 'PhD 상담심리학 박사, 휠든크라이스 전문가.',
    image:
      'https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779201676/%EB%AC%B8%EC%98%81%EC%95%A0_%EA%B5%90%EC%88%981_q9eo9t.png',
    avatarBg: 'bg-[#1E3A8A]',
    sections: [
      {
        title: '학력 및 전문 분야',
        items: [
          '상담심리학 박사 · 자아초월상담학 박사 · 성균관대학교 체육학 박사과정 이수',
          '움직임 치료 · 꿈치료 · 코칭',
        ],
      },
      {
        title: '경력 및 주요 활동',
        items: [
          '휠든크라이스 수퍼바이저',
          '상담코치협회 이사',
          '자기치유 관련 저서 공저',
          '방송 특강, 움직임 치료, 꿈치료, 기업 강의 및 코칭',
        ],
      },
    ],
  },
  {
    id: 'lim-jin-soo',
    name: '임진수 박사',
    role: '정신분석학 박사 / 프로이트 라캉 학회 정신분석가',
    shortDesc:
      '서울대 박사, 파리 VIII대 정신분석학 DEA, 프로이트 라캉 학회 정신분석가.',
    image:
      'https://res.cloudinary.com/dxjz9ksjg/image/upload/v1793856802/1446168883094_ofcded.jpg',
    avatarBg: 'bg-slate-800',
    sections: [
      {
        title: '학력 및 주요 활동',
        items: [
          '서울대학교 불어교육과 졸업, 동 대학원 박사학위',
          '계명대학교 유럽학과 교수 역임',
          '프랑스 파리 VIII 대학 정신분석학과 DEA 취득, 박사과정 수료',
          "1995년부터 2003년까지 파리 고등사회과학원(E.H.E.S.S.) 교수 프랑수아즈 다부안느(Françoise Davoine)에게 교육 분석을 받고, 2002년부터 '프로이트 라캉 학회'를 개설하여 정신분석가로 활동 중",
        ],
      },
      {
        title: '저서',
        items: [
          '『정신분석 세미나 IV: 환상의 정신분석』',
          '『정신분석 세미나 V: 남근의 의미작용』',
          '『정신분석 세미나 IX: 네 가지 담화』',
          '『정신분석 세미나 XI: 위상학적 정신분석』 등 정신분석 세미나 총서 16권',
        ],
      },
      {
        title: '역서',
        items: [
          '『정신분석사전』(라플랑슈, 퐁탈리스)',
          '『정신분석의 탄생』(프로이트)',
          '『끝이 있는 분석과 끝이 없는 분석』(프로이트) 등',
        ],
      },
      {
        title: '발간예정',
        items: [
          '『신경증의 병인』, 『정신분석적 정신치료』, 『세미나 X : 불안』, 『세미나 XX : 앙코르』',
        ],
      },
    ],
  },
  {
    id: 'lee-je-seung',
    name: '이제승 교수',
    role: 'IMC 국제마음치유연구원 원장 / 심리상담학과 교수',
    shortDesc: '국제기독대학교 교수, 한국심리상담전문학회 학회장.',
    image:
      'https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779153823/%EC%9D%B4%EC%A0%9C%EC%8A%B9_%EA%B5%90%EC%88%98_gkluyp.jpg',
    avatarBg: 'bg-slate-800',
    sections: [
      {
        title: '주요 경력',
        items: [
          'IMC 국제마음치유연구원 원장',
          '국제기독대학교 심리상담학과 교수',
          '한국심리상담전문학회 학회장',
        ],
      },
    ],
  },
  {
    id: 'yoo-bo-kyung',
    name: '유보경 선생님',
    role: '상담심리 전문가 / 성인지 교육 강사',
    shortDesc: '성범죄 예방 및 재발 방지를 위한 심리 교육 전문가.',
    image:
      'https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779201666/%EC%9C%A0%EB%B3%B4%EA%B2%BD_%EC%84%A0%EC%83%9D%EB%8B%98_2_lobfoq.png',
    avatarBg: 'bg-[#1E3A8A]',
    sections: [
      {
        title: '학력',
        items: [
          '경북대학교대학원 아동복지과 전공 석사',
          '경북대학교대학원 아동가족학 전공 박사과정',
        ],
      },
      {
        title: '자격 및 전문 과정',
        items: [
          '보육교수 1급, 평생교육사 2급, 사회복지사 2급, 요양보호사 1급',
          '심리상담사 1급, 발달진단평가 2급, 미술치료사 1급',
          'NLP프랙티셔너, 최면심리상담사 2급',
          '이고그램 전문강사 과정',
          '덴버(6개월), 베일리검사(12, 24, 36개월), 코오트 전문검사요원',
        ],
      },
      {
        title: '경력 및 주요 활동',
        items: [
          '장애아보육도우미교육',
          '특별직무교육과정(장애아보육과정, 방과후교육과정)',
          '장애아 보육시설 교사교육(장애유형에 대한 이해 및 지도방법, IEP 함께 작성하기)',
          '2011년 보육시설 평가인증 참여설명회 및 지도교육',
          '자원개발을 위한 프로포절 핵심기법',
          '장애아어린이집 교사교육(장애 영유아 부모의 이해와 지원방법)',
          '장애전담 어린이집 근무',
          '장애인복지관 가족소통프로그램 진행',
          '노인복지관, 요양원 집단상담, 미술치료',
          '순천향대학병원·대구가톨릭대학병원 연구원',
          '어린이문학교육학회 정회원',
          '한국심리학회 정회원, 임상코디네이터',
          '삼성팰리스, MBC생방송 오늘의 아침, 연합뉴스 등 다수 출연',
        ],
      },
      {
        title: '수상',
        items: [
          "발로 뛰는 희망천사 에세이 '최우수상'",
          '우수교사 해외연수(전국 장애아동 보육시설협의회)',
          '사회복지인상(사회복지협의회)',
        ],
      },
    ],
  },
  {
    id: 'ham-jong-soo',
    name: '함종수 교수',
    role: '철학박사 · 신학박사 · 심리학 박사 / 미국상담심리치료학회(AACPT) 회장',
    shortDesc:
      '미국상담심리치료학회(AACPT) 회장, 애리조나 주립대 철학 교수 역임, LA 시장상 수상.',
    image:
      'https://res.cloudinary.com/dxjz9ksjg/image/upload/v1793856790/professor_wut7ut.png',
    avatarBg: 'bg-slate-800',
    sections: [
      {
        title: '주요 약력 및 학위',
        items: [
          '미국장로교총회(GAPC) 목사',
          'LA 시장상 수상',
          '미국상담심리치료학회(AACPT) 회장',
          '애리조나 주립대 철학교수 역임',
          '철학박사, 신학박사, 심리학박사',
        ],
      },
    ],
  },
  {
    id: 'yoon-song-yi',
    name: '윤송이 선생님',
    role: '심리상담 전문가 / 성폭력 예방 교육 강사',
    shortDesc:
      '임상심리사 2급(국가자격증), 인지행동치료 기반의 성인지 감수성 향상 교육.',
    image:
      'https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779201655/%EC%9C%A4%EC%86%A1%EC%9D%B4_%EC%84%A0%EC%83%9D%EB%8B%98_2_q34upo.png',
    avatarBg: 'bg-[#1E3A8A]',
    sections: [
      {
        title: '학력 및 자격',
        items: [
          '경북대학교대학원 심리학 석사',
          '서불대 신심통합치유학과 뇌인지과학 박사수료',
          '위로상담가 수료, 청소년상담사 3급',
          '임상심리사 2급(국가자격증)',
          '심리상담사 1급, 미술치료사 1급, 요가지도자 1급',
          '한국상담학회 준회원, NLP프랙티셔너',
        ],
      },
      {
        title: '경력 및 강의 활동',
        items: [
          '의성군건강가정지원센터 부부 힐링 클리닉',
          '구미시장애인종합복지관 장애부모자녀 관계 조정',
          '구미경찰서 전의경 상담',
          '기업 ㈜성진포머 직원지원프로그램(직원심리상담) 현 진행',
          'MBC 생방송 오늘의 아침 외 다수 출연',
          '대구노인종합복지관 황혼육아 양육코칭 강의',
          '대구 성서경찰서 기동대 폭력의 이해, 수치심/죄책감/열등감 강의',
          '대구장애인가족지원센터 동료상담가 실습진행',
          '대룡초등학교, 운암중학교, 의흥초등학교 집단상담',
        ],
      },
    ],
  },
  {
    id: 'jeon-kyung-sook',
    name: '전경숙 선생님',
    role: '상담심리 전문가 / 중독 상담사 / 성상담사',
    shortDesc: '성인지 왜곡 및 중독 문제 해결을 위한 전문 심리 상담.',
    image:
      'https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779198673/%EC%A0%84%EA%B2%BD%EC%88%99_%EC%84%A0%EC%83%9D%EB%8B%98_hctbka.png',
    avatarBg: 'bg-[#1E3A8A]',
    sections: [
      {
        title: '소속',
        items: ['한국뇌기반심리상담 대표'],
      },
      {
        title: '학력',
        items: [
          '자초월상담심리학 석사',
          '명상학 이수',
          '뇌인지 박사 수료',
          'International Christian College HONORARY DOCTOR EDUCATION (Ed.D) 교육학명예박사',
        ],
      },
      {
        title: '주요 경력',
        items: [
          '한국뇌기반심리상담 대표',
          '교육분야 20년 · 청소년 진로 및 발달상담',
          '조장희박사님과 뇌과학문화운동 대표',
          '한국상담학회 회원',
          '아봐타/마스터',
        ],
      },
      {
        title: '활동 이력',
        items: [
          '2015년: 박문호박사 뇌과학문화운동 8회차 진행',
          '2016년~2021년: 조장희 박사 썸머 진행',
          '2019년~2021년: 서초문화원 명상강의',
          '2022년: 인천지역 학교상담교사 교육',
        ],
      },
      {
        title: '강의 및 프로그램',
        items: [
          '뇌상담사 양성과정 강의',
          '코칭프로그램',
          '기아, 현대자동차 프로그램 진행',
          '코오롱기업연수 프로그램 진행',
          'NAVER 꿈분석 전문상담',
          'NAVER 명상상담',
        ],
      },
      {
        title: '자격',
        items: ['뇌상담사', '진로상담사', '명상상담'],
      },
    ],
  },
  {
    id: 'park-kyung-sil',
    name: '박경실 선생님',
    role: '상담심리 전문가 / 청소년 상담사',
    shortDesc:
      '임상심리사 1급(국가자격증), 청소년 및 성인 내담자의 심리적 안정과 긍정적 변화 지원.',
    image:
      'https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779200461/ChatGPT_Image_2026%EB%85%84_5%EC%9B%94_19%EC%9D%BC_%EC%98%A4%ED%9B%84_11_20_53_jagksr.png',
    avatarBg: 'bg-[#1E3A8A]',
    sections: [
      {
        title: '전문 분야 및 학력',
        items: [
          '상담심리 전문가 / 청소년 상담사',
          '최면상담학 박사 · 심리상담학 석사',
          '최면상담 · 청소년상담',
        ],
      },
      {
        title: '자격',
        items: ['임상심리사 1급', '사회복지사 1급', '청소년상담사 2급'],
      },
      {
        title: '경력',
        items: [
          '병영생활전문상담관',
          '어세스타',
          '서울시동부교육청 청소년상담센터 관련 활동 경력',
        ],
      },
    ],
  },
  {
    id: 'kang-min-kyung',
    name: '강민경 선생님',
    role: '상담심리 전문가 / 가족학 석사 / 부모, 가족 교육 강사',
    shortDesc: '심리 정서적 지지를 통한 자존감 회복 및 재발 방지 상담.',
    image:
      'https://res.cloudinary.com/dxjz9ksjg/image/upload/v1779198673/%EA%B0%95%EB%AF%BC%EA%B2%BD_%EC%84%A0%EC%83%9D%EB%8B%98_2_bganyn.bmp',
    avatarBg: 'bg-[#1E3A8A]',
    sections: [
      {
        title: '소개',
        items: [
          '상담심리 전문가 / 가족학 석사 / 부모, 가족 교육 강사',
          '심리 정서적 지지를 통한 자존감 회복 및 재발 방지 상담',
        ],
      },
      {
        title: '학력 및 경력',
        items: [
          '가족학 석사, 미술치료 석사, 뇌인지 박사',
          '이든아이아동발달센터 부원장',
          '미술치료상담원',
          '한국아동발달지원연구소',
        ],
      },
      {
        title: '자격',
        items: ['뇌교육사', '임상미술상담사', '진로상담사'],
      },
    ],
  },
];

const getSectionIcon = (title: string) => {
  if (title.includes('학력')) return <GraduationCap className="w-4 h-4 text-[#4F46E5] shrink-0" />;
  if (title.includes('자격')) return <Award className="w-4 h-4 text-[#4F46E5] shrink-0" />;
  if (title.includes('저서') || title.includes('역서') || title.includes('발간')) {
    return <BookOpen className="w-4 h-4 text-[#4F46E5] shrink-0" />;
  }
  if (title.includes('수상') || title.includes('소개')) {
    return <Sparkles className="w-4 h-4 text-[#4F46E5] shrink-0" />;
  }
  return <Briefcase className="w-4 h-4 text-[#4F46E5] shrink-0" />;
};

export default function ExpertsSection({ naverPlaceUrl }: ExpertsSectionProps) {
  const navigate = useNavigate();
  const [selectedExpert, setSelectedExpert] = useState<ExpertItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedExpert(null);
      }
    };
    if (selectedExpert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedExpert]);

  const handleProfileClick = (expert: ExpertItem) => {
    if (expert.navigateTo) {
      navigate(expert.navigateTo);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSelectedExpert(expert);
  };

  const renderExpertCard = (expert: ExpertItem) => (
    <div key={expert.id} className="text-center group flex flex-col items-center">
      <div
        onClick={() => handleProfileClick(expert)}
        className={`w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden mx-auto mb-5 shadow-lg border border-slate-100 cursor-pointer transition-transform duration-500 group-hover:scale-105 ${expert.avatarBg || 'bg-[#1E3A8A]'}`}
      >
        <img
          src={expert.image}
          alt={expert.name}
          className={`w-full h-full object-cover ${expert.imageClassName || 'object-top'}`}
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex items-center justify-center gap-2 mb-1.5 flex-wrap">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">{expert.name}</h3>
        <button
          type="button"
          onClick={() => handleProfileClick(expert)}
          className="px-2.5 py-0.5 rounded-md bg-indigo-50 hover:bg-indigo-100 text-[#4F46E5] border border-indigo-200/80 text-[11px] font-bold transition-colors cursor-pointer"
        >
          프로필 보기
        </button>
      </div>

      <p className="text-xs sm:text-[13px] text-[#4F46E5] font-bold mb-2.5 px-2 leading-snug">
        {expert.role}
      </p>
      <p className="text-xs text-slate-500 leading-relaxed max-w-[270px] mx-auto">
        {expert.shortDesc}
      </p>
    </div>
  );

  return (
    <div className="space-y-16">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          성범죄 특화 전문가 및 자문위원
        </h2>
        <p className="text-sm sm:text-base text-slate-500">
          단순 심리상담사가 아닌, 구조적 개입과 행동 교정의 전문가들이 함께합니다.
        </p>
      </div>

      {/* Row 1: 원장 & 부원장 (2 Columns Centered) */}
      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16">
        {LEAD_EXPERTS.map(renderExpertCard)}
      </div>

      {/* Rows 2-5: 변호사 / 교수 / 상담전문가 (3 Columns Grid) */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 pt-2">
        {ADVISORY_EXPERTS.map(renderExpertCard)}
      </div>

      {/* Bottom CTA Buttons */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href={naverPlaceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto min-w-[220px] px-8 py-4 bg-[#1565C0] hover:bg-[#0D47A1] text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/20 transition-all"
        >
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>상담 예약하기</span>
        </a>
        <Link
          to="/about/location"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full sm:w-auto min-w-[220px] px-8 py-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-500/20 transition-all"
        >
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>오시는 길 안내</span>
        </Link>
      </div>

      {/* Expert Detail Profile Modal */}
      <AnimatePresence>
        {selectedExpert && (
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="expert-modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedExpert(null)}
              className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-2xl max-h-[88vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 border border-slate-100"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-7 bg-indigo-50/40 border-b border-indigo-100/80 flex items-center gap-5 shrink-0">
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md ${selectedExpert.avatarBg || 'bg-[#1E3A8A]'}`}
                >
                  <img
                    src={selectedExpert.image}
                    alt={selectedExpert.modalTitle || selectedExpert.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 flex-1 pr-8">
                  <h3
                    id="expert-modal-title"
                    className="text-xl sm:text-2xl font-bold text-slate-900 mb-1"
                  >
                    {selectedExpert.modalTitle || selectedExpert.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#4F46E5] leading-snug">
                    {selectedExpert.role}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedExpert(null)}
                  aria-label="프로필 닫기"
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white hover:bg-indigo-50 border border-indigo-100 text-slate-500 hover:text-[#4F46E5] flex items-center justify-center transition-colors shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-7 text-slate-700">
                {selectedExpert.sections?.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-indigo-100/70">
                      {getSectionIcon(sec.title)}
                      <span>{sec.title}</span>
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600 leading-relaxed">
                      {sec.items.map((item, iIdx) => (
                        <li key={iIdx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-end gap-3 shrink-0">
                <a
                  href={naverPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#1565C0] hover:bg-[#0D47A1] text-white text-sm font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>상담 예약</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedExpert(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-bold transition-colors shadow-sm"
                >
                  닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
