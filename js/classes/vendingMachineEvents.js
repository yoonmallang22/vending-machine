class VendingMachineEvents {
  constructor() {
    const vMachine = document.querySelector(".section1");
    this.balance = vMachine.querySelector(".bg-box p");
    this.itemList = vMachine.querySelector(".cola-list");
    this.inputCostEl = vMachine.querySelector("#input-money");
    this.btnReturn = vMachine.querySelector(".bg-box + .btn");
    this.btnPut = vMachine.querySelector("#input-money + .btn");
    this.btnGet = vMachine.querySelector(".btn-get");
    this.stagedList = vMachine.querySelector(".get-list");

    const myInfo = document.querySelector(".section2");
    this.myMoney = myInfo.querySelector(".bg-box strong");

    const getInfo = document.querySelector(".section3");
    this.getList = getInfo.querySelector(".get-list");
    this.txtTotal = getInfo.querySelector(".total-price");
  }

  // 장바구니 콜라 생성 함수
  stagedItemGenerator(target) {
    const stagedItem = document.createElement("li");

    stagedItem.innerHTML = `
		<img src="./img/${target.dataset.img}" alt="">
		${target.dataset.item}
		<strong>1
			<span class="a11y-hidden">개</span>
		</strong>
		`;

    this.stagedList.append(stagedItem);
  }

  bindEvent() {
    /**
     * 1. 입금 버튼 기능
     * 임금 버튼을 누르면
     * 1) 소지금 === 소지금 - 입금액
     * 2) 잔액 === 기존 잔액 + 입금액
     * 3) 입금액이 소지금보다 많으면 경고창 출력
     * 4) 입금액이 정상적으로 입금되면 입금창은 초기화
     */
    this.btnPut.addEventListener("click", () => {
      // 입력값
      const inputCost = parseInt(this.inputCostEl.value);
      // 소지금
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(",", ""));
      // 잔액
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));

      if (inputCost) {
        // 입금액이 소지금보다 적거나 같을 때
        if (inputCost <= myMoneyVal && inputCost > 0) {
          this.myMoney.textContent = new Intl.NumberFormat().format(myMoneyVal - inputCost) + "원";

          this.balance.textContent = new Intl.NumberFormat().format((balanceVal ? balanceVal : 0) + inputCost) + "원";
        } else {
          // 입금액이 소지금보다 많을 때
          alert("소지금이 부족합니다!");
        }
      }

      // 입금액 초기화
      this.inputCostEl.value = null;
    });

    /**
     * 2. 거스름돈 반환 버튼
     * 반환 버튼을 누르면
     * 1) 소지금 === 잔액 + 소지금
     * 2) 잔액창이 초기화
     */
    this.btnReturn.addEventListener("click", () => {
      // 잔액
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));
      // 소지금
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(",", ""));

      if (balanceVal) {
        this.myMoney.textContent = new Intl.NumberFormat().format(myMoneyVal + balanceVal) + "원";
        this.balance.textContent = null;
      }
    });

    /**
     * 3. 자판기 장바구니 채우기
     * 1) 아이템을 누르면 잔액 === 잔액 - 아이템 가격
     * 2) 아이템 가격이 잔액보다 크다면 경고창 출력
     * 3) 아이템이 장바구니에 들어감
     * 4) 아이템 카운트 -1, 아이템 카운트 0이 되면 품절 표시
     */

    this.btnsCola = document.querySelectorAll(".section1 .btn-cola");

    this.btnsCola.forEach((item) => {
      item.addEventListener("click", (event) => {
        // 잔액
        const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));
        const targetElPrice = parseInt(event.currentTarget.dataset.price);
        console.log(targetElPrice);

        if (balanceVal >= targetElPrice) {
          this.balance.textContent = new Intl.NumberFormat().format(balanceVal - targetElPrice) + "원";

          // 장바구니 콜라 생성
          this.stagedItemGenerator(event.currentTarget);
          // for (const item of this.stagedList) {
          // }
        } else {
          alert("입금액이 부족합니다!");
        }
      });
    });
  }
}

export default VendingMachineEvents;
