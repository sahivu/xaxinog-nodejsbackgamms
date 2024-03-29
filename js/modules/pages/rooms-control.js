import * as impHttp from "../http.js";

export async function openRoomManagement() {
  let siteLanguage = window.siteLanguage;
  const main = document.querySelector(".main__container");
  let header = document.querySelector("header");
  if (header.classList.contains("d-none")) {
    header.classList.remove("d-none");
    main.classList.add("header__padding");
  }

  main.innerHTML = `
  <section class = "admin-rooms-controll-page">
    <div class="room-management-room" room = 'loto'>
      <ul class="room-management-bets">
        <li>
          <input class=" loto-page-toggle-input mainRoomCheckbox" type="checkbox" name="loto" room = "loto">
          <span>${siteLanguage.roomManagementPage.mainLotoRoom}</span>
        </li>
        <li>
          <input class="room-checkbox loto-page-toggle-input loto-room-checkbox " type="checkbox" name="loto-1" roomId="1">
          <span>${siteLanguage.roomManagementPage.room} 0.20M</span>
        </li>
        <li>
          <input class="room-checkbox loto-page-toggle-input loto-room-checkbox " type="checkbox" name="loto-2" roomId="2">
          <span>${siteLanguage.roomManagementPage.room} 0.50M</span>
        </li>
        <li>
          <input class="room-checkbox loto-page-toggle-input loto-room-checkbox " type="checkbox" name="loto-3" roomId="3">
          <span>${siteLanguage.roomManagementPage.room} 1M</span>
        </li>
        <li>
          <input class="room-checkbox loto-page-toggle-input loto-room-checkbox room-checkbox" type="checkbox" name="loto-4" roomId="4">
          <span>${siteLanguage.roomManagementPage.room} 5M</span>
        </li>
        <li>
          <input class="room-checkbox loto-page-toggle-input loto-room-checkbox " type="checkbox" name="loto-5" roomId="5">
          <span>${siteLanguage.roomManagementPage.room} 10M</span>
        </li>
      </ul>
      <button class = 'save-button' type="submit">${siteLanguage.roomManagementPage.save}</button>
    </div>
  
    <div class="room-management-room" room = 'domino-classic'>
      <ul class="room-management-bets">
        <li>
          <input class=" domino-classic-page-toggle-input mainDominoClassicRoomCheckbox mainRoomCheckbox" type="checkbox" room = "domino-classic" name="mainDominoClassicRoom">
          <span>${siteLanguage.roomManagementPage.mainDominoClassicRoom}</span>
        </li>
        <li>
          <input class="room-checkbox domino-classic-page-toggle-input" roomId="1" type="checkbox" name="domino-classic-1">
          <span>${siteLanguage.roomManagementPage.room} 0.50M</span>
        </li>
        <li>
          <input class="room-checkbox domino-classic-page-toggle-input" roomId="2" type="checkbox" name="domino-classic-2">
          <span>${siteLanguage.roomManagementPage.room} 1M</span>
        </li>
        <li>
          <input class="room-checkbox domino-classic-page-toggle-input" roomId="3" type="checkbox" name="domino-classic-3">
          <span>${siteLanguage.roomManagementPage.room} 3M</span>
        </li>
        <li>
          <input class="room-checkbox domino-classic-page-toggle-input" roomId="4" type="checkbox" name="domino-classic-4">
          <span>${siteLanguage.roomManagementPage.room} 5M</span>
        </li>
        <li>
          <input class="room-checkbox domino-classic-page-toggle-input" roomId="5" type="checkbox" name="domino-classic-5">
          <span>${siteLanguage.roomManagementPage.room} 10M</span>
        </li>
      </ul>
      <button class = 'save-button' type="submit">${siteLanguage.roomManagementPage.save}</button>
    </div>
  
    <div class="room-management-room" room = 'domino-telephone'>
      <ul class="room-management-bets">
        <li>
          <input class=" mainDominoTelephoneRoomCheckbox mainRoomCheckbox" type="checkbox" name="mainDominoTelephoneRoom" value="mainDominoTelephoneRoom" room = "domino-telephone">
          <span>${siteLanguage.roomManagementPage.mainDominoTelephoneRoom}</span>
        </li>
        <li>
          <input class="room-checkbox domino-telephone-room-checkbox" roomId="1" type="checkbox" name="domino-telephone-1">
          <span>${siteLanguage.roomManagementPage.room} 0.50M</span>
        </li>
        <li>
          <input class="room-checkbox domino-telephone-room-checkbox" roomId="2" type="checkbox" name="domino-telephone-2">
          <span>${siteLanguage.roomManagementPage.room} 1M</span>
        </li>
        <li>
          <input class="room-checkbox domino-telephone-room-checkbox" roomId="3" type="checkbox" name="domino-telephone-3">
          <span>${siteLanguage.roomManagementPage.room} 3M</span>
        </li>
        <li>
          <input class="room-checkbox domino-telephone-room-checkbox" roomId="4" type="checkbox" name="domino-telephone-4">
          <span>${siteLanguage.roomManagementPage.room} 5M</span>
        </li>
        <li>
          <input class="room-checkbox domino-telephone-room-checkbox" roomId="5" type="checkbox" name="domino-telephone-5">
          <span>${siteLanguage.roomManagementPage.room} 10M</span>
        </li>
      </ul>
      <button class = 'save-button' type="submit">${siteLanguage.roomManagementPage.save}</button>
    </div>
  </section>
    `;

  await getRoomManagementData();

  // делаем что когда нажимаем основную комнату то блокируются все
  let roomsControlPage = document.querySelector(".admin-rooms-controll-page");

  if (roomsControlPage) {
    let mainRoomsButtons =
      roomsControlPage.querySelectorAll(".mainRoomCheckbox");
    // console.log(mainRoomsButtons);
    mainRoomsButtons.forEach((button) => {
      button.addEventListener("change", function () {
        if (button.checked) {
          let buttonLi = button.parentNode;
          let buttonParentBlock = buttonLi.parentNode;
          let allCheckboxInParent =
            buttonParentBlock.querySelectorAll(".room-checkbox");
          allCheckboxInParent.forEach((checkbox) => {
            checkbox.checked = true;
          });
        } else {
          let buttonLi = button.parentNode;
          let buttonParentBlock = buttonLi.parentNode;
          let allCheckboxInParent =
            buttonParentBlock.querySelectorAll(".room-checkbox");
          allCheckboxInParent.forEach((checkbox) => {
            checkbox.checked = false;
          });
        }
      });
    });

    // const roomsControl = {
    //   loto: false,
    //   dominoClassic: true,
    //   dominoTelephone: false,
    //   lotoRooms: [{roomId: 1, isAvailable: false}],
    //   dominoClassicRooms: [{roomId: 2, isAvailable: true}],
    //   dominoTelephoneRooms: [{roomId: 3, isAvailable: false}],
    // };

    // const roomsControl = {
    //   loto: false,
    //   lotoRooms: [],
    // };
    // const roomsControl = {
    //   dominoClassic: false,
    //   dominoClassicRooms: [],
    // };
    // const roomsControl = {
    //   dominoTelephone: false,
    //   dominoTelephoneRooms: [],
    // };

    // вытягиваем поля когда нажимаем кнопку сохранить
    let saveButton = roomsControlPage.querySelectorAll(".save-button");
    saveButton.forEach((button) => {
      button.addEventListener("click", async function () {
        let parent = button.parentElement;
        if (!parent) {
          return;
        }
        let pageAttribute = parent.getAttribute("room");
        // console.log(pageAttribute);

        if (pageAttribute == "loto") {
          let lotoPageCheckbox =
            parent.querySelector(".mainRoomCheckbox")?.checked;
          let lotoRooms = [];
          let lotoRoomsCheckbox = parent.querySelectorAll(".room-checkbox");
          lotoRoomsCheckbox.forEach((room) => {
            lotoRooms.push({
              roomId: +room.getAttribute("roomId"),
              isAvailable: !room.checked,
            });
          });

          const roomsControl = {
            loto: !lotoPageCheckbox || false,
            lotoRooms: lotoRooms,
          };
          // console.log(roomsControl);

          let responce = await impHttp.updateRoomsControl(roomsControl, "loto");
          if (responce.status == 200) {
            alert("Комнаты сохранены");
          } else {
            alert("Ошибка сохранения");
          }
        } else if (pageAttribute == "domino-classic") {
          let dominoPageCheckbox =
            parent.querySelector(".mainRoomCheckbox")?.checked;
          let dominoRooms = [];
          let dominoRoomsCheckbox = parent.querySelectorAll(".room-checkbox");
          dominoRoomsCheckbox.forEach((room) => {
            dominoRooms.push({
              roomId: +room.getAttribute("roomId"),
              isAvailable: !room.checked,
            });
          });

          const roomsControl = {
            dominoClassic: !dominoPageCheckbox || false,
            dominoClassicRooms: dominoRooms,
          };

          // console.log(roomsControl);
          let responce = await impHttp.updateRoomsControl(
            roomsControl,
            "domino-classic"
          );
          if (responce.status == 200) {
            alert("Комнаты сохранены");
          } else {
            alert("Ошибка сохранения");
          }
        } else if (pageAttribute == "domino-telephone") {
          let dominoPageCheckbox =
            parent.querySelector(".mainRoomCheckbox")?.checked;
          let dominoRooms = [];
          let dominoRoomsCheckbox = parent.querySelectorAll(".room-checkbox");
          dominoRoomsCheckbox.forEach((room) => {
            dominoRooms.push({
              roomId: +room.getAttribute("roomId"),
              isAvailable: !room.checked,
            });
          });

          const roomsControl = {
            dominoTelephone: !dominoPageCheckbox || false,
            dominoTelephoneRooms: dominoRooms,
          };
          // console.log(roomsControl);
          let responce = await impHttp.updateRoomsControl(
            roomsControl,
            "domino-telephone"
          );
          if (responce.status == 200) {
            alert("Комнаты сохранены");
          } else {
            alert("Ошибка сохранения");
          }
        }
      });
    });
  }
}

const getRoomManagementData = async () => {
  // const roomsControl = {
  //   loto: false,
  //   dominoClassic: true,
  //   dominoTelephone: false,
  //   lotoRooms: [{roomId: 1, isAvailable: false}],
  //   dominoClassicRooms: [{roomId: 2, isAvailable: true}],
  //   dominoTelephoneRooms: [{roomId: 3, isAvailable: false}],
  // };

  const { data } = await impHttp.getRoomsControl();
  const roomsControl = data;

  // console.log(data);

  // insert data to checkboxes
  const mainRoomCheckbox = document.querySelector(".loto-page-toggle-input");
  mainRoomCheckbox.checked = !roomsControl.loto;

  const lotoCheckboxes = document.querySelectorAll(".loto-room-checkbox");
  lotoCheckboxes.forEach((checkbox) => {
    const roomId = checkbox.getAttribute("roomId");
    const room = roomsControl.lotoRooms.find((room) => room.roomId == +roomId);
    checkbox.checked = !room.isAvailable;
  });

  const mainDominoClassicRoomCheckbox = document.querySelector(
    ".mainDominoClassicRoomCheckbox"
  );
  mainDominoClassicRoomCheckbox.checked = !roomsControl.dominoClassic;

  const dominoClassicCheckboxes = document.querySelectorAll(
    ".domino-classic-page-toggle-input"
  );
  dominoClassicCheckboxes.forEach((checkbox) => {
    const roomId = checkbox.getAttribute("roomId");
    const room = roomsControl.dominoClassicRooms.find(
      (room) => room.roomId == +roomId
    );
    if (room && checkbox) {
      checkbox.checked = !room.isAvailable;
    }
  });

  const mainDominoTelephoneRoomCheckbox = document.querySelector(
    ".mainDominoTelephoneRoomCheckbox"
  );
  mainDominoTelephoneRoomCheckbox.checked = !roomsControl.dominoTelephone;

  const dominoTelephoneCheckboxes = document.querySelectorAll(
    ".domino-telephone-room-checkbox"
  );
  dominoTelephoneCheckboxes.forEach((checkbox) => {
    const roomId = checkbox.getAttribute("roomId");
    const room = roomsControl.dominoTelephoneRooms.find(
      (room) => room.roomId == +roomId
    );
    if (room && checkbox) {
      checkbox.checked = !room.isAvailable;
    }
  });
};
