class ColaGenerator {
  constructor() {
    this.itemList = document.querySelector(".section1 .cola-list");
  }

  async setup() {
    const response = await this.loadData();
    // console.log(response);
    this.colaFactory(response);
  }

  async loadData() {
    try {
      // response 객체 할당
      const response = await fetch("./items.json");

      if (response.ok) {
        // 서버의 응답 코드가 200~299일 경우
        return response.json();
      } else {
        throw new Error(response.staus);
      }
    } catch (error) {
      console.log(error);
    }
  }

  colaFactory(data) {
    const docFrag = document.createDocumentFragment();
    data.forEach((el) => {
      const item = document.createElement("li");
      // querySelector로 가져오면 성능이 떨어지니까 data 어트리뷰트 사용
      const itemTemplate = `
<button class="btn-cola" type="button" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}">
					<img class="cola-img" src="./img/${el.img}" alt="">
					<span class="cola-name">${el.name}</span>
					<strong class="cola-price">${el.cost}원</strong>
				</button>
				`;
      item.innerHTML = itemTemplate;

      docFrag.append(item);
    });
    this.itemList.append(docFrag);
  }
}

export default ColaGenerator;
