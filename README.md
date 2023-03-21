- 전체 레이아웃 `display: grid;`로 잡아주었다

- 웹접근성을 위해 '품절'도 가상 요소가 아니라 마크업에 적어준다

- 버튼 누를 때 생기는 테두리 색상, 페이지 나중에 자바스크립트로 `class="active"`로 제어할 예정이다

- 사용자의 편의를 위해 금액 입력 `<input>` type을 number로 설정하고
  min으로 허용되는 최솟값을, step으로 입력할 수 있는 숫자들 사이의 간격을 설정해준다

```html
<input
  id="input-money"
  type="number"
  placeholder="입금액 입력"
  min="1000"
  step="1000"
/>
```
