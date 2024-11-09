# 리:아트 (Re:Art) - 예술품 기부 플랫폼 API

## 프로젝트 소개

리:아트는 재활용품을 활용한 예술 프로젝트를 지원하는 플랫폼입니다. 주민들이 기부한 재활용품이 예술 작품으로 다시 태어나는 과정을 경험할 수 있으며, 예술가와 기부자를 연결하여 환경 보호와 예술 창작을 동시에 실현합니다.

## 주요 기능

- 작품별 기부 캠페인 관리
- 기부자 크레딧 시스템
- 전시회 정보 제공
- 위치 기반 전시 추천

## 기술 스택

- NestJS
- PostgreSQL
- AWS EC2
- AWS S3
- Docker
- Github Actions
- Nginx

## API 문서

https://inthon.steadfastree.xyz/api

## 디렉토리 구조

src
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── common
│ ├── enums
│ │ ├── campaign-status.enum.ts
│ │ ├── donation-status.enum.ts
│ │ ├── exhibition-status.enum.ts
│ │ └── user-role.enum.ts
│ └── utils
│ └── date.util.ts
├── entities
│ ├── badge.entity.ts
│ ├── campaign-feed.entity.ts
│ ├── campaign.entity.ts
│ ├── donation.entity.ts
│ ├── exhibition.entity.ts
│ ├── material-campaign.entity.ts
│ ├── material-donation.entity.ts
│ ├── material.entity.ts
│ ├── pickup-location.entity.ts
│ ├── time-stamp.entity.ts
│ ├── user-badge.entity.ts
│ └── user.entity.ts
├── main.ts
└── modules
├── auth
│ ├── auth.controller.ts
│ ├── auth.module.ts
│ ├── auth.service.ts
│ └── dtos
├── campaigns
│ ├── campaigns.controller.ts
│ ├── campaigns.module.ts
│ ├── campaigns.service.ts
│ └── dtos
├── donations
│ ├── donations.controller.ts
│ ├── donations.module.ts
│ ├── donations.service.ts
│ └── dtos
├── exhibitions
│ ├── dtos
│ ├── exhibitions.controller.ts
│ ├── exhibitions.module.ts
│ └── exhibitions.service.ts
├── materials
│ ├── dtos
│ ├── materials.controller.ts
│ ├── materials.module.ts
│ └── materials.service.ts
├── pickup-locations
│ └── dtos
└── users
├── dtos
├── users.controller.ts
├── users.module.ts
└── users.service.ts
