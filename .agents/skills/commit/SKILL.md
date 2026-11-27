---
name: commit
description: 사용자가 $commit 으로 호출하면 변경 내용을 읽고 Conventional Commits 형식으로 커밋한다. 호출하지 않았으면 실행하지 않는다.
---

## 작업 순서

1. git status --short, git diff HEAD 와 새 파일의 내용을 읽는다.
2. 변경이 없으면 커밋하지 않고 알린다.
3. .env, .pem, .key 파일은 스테이징하지 않고 알린다.
4. 나머지 변경 파일을 git add 로 스테이징한다.
5. 아래 규칙으로 메시지를 써서 git commit 을 실행한다.
6. git log -1 --oneline 결과를 보여 준다.

## 커밋 메시지 규칙

- 형식: type(scope): 제목 (scope는 생략 가능)
- type: feat, fix, docs, style, refactor, test, chore
- 제목은 50자 이내로 쓰고 마침표를 붙이지 않는다.
- 이유가 필요하면 한 줄을 비우고 본문을 쓴다.
- AI 도구 표기(Co-authored-by 등)를 넣지 않는다.