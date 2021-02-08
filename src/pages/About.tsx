import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonImg,
  IonCol,
  IonRow,
  IonCardContent,
  IonGrid,
} from "@ionic/react";
import "./About.css";
import "./World.css";

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="appTitle">TEAM</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonRow>
            <IonCol className="pagetTite">About This Application</IonCol>
          </IonRow>
          <IonCardContent class="card">
            <p>
              แอปพลิเคชันนี้สร้างขึ้นโดยนักศึกษาชั้นปีที่ 3 กำลังศึกษาอยู่ที่
              มหาวิทยาลัยรังสิต คณะวัตกรรมดิจิทัลเทคโนโลยีน
              สาขาเทคโนโลยีสารสนเทศ
              เป็นแอปพลิเคชันที่สามารดเช็คดูยอดจำนวนกรณีของ COVID19 ได้ตลอดเวลา
              และ มีแนวทางการป้องกันตัวอีกด้วยพวกผมได้ใช้ ionic UI และ React ใน
              การพัฒนาแอปพลิเคชันนี้ พวกผมขอขอบพระคุณ ผศ.ดร Wutthipong Chainasri
              ที่ได้สอนพวกผมเกี่ยวกับการพัฒนา Application โดยใช้ ionic & React​
            </p>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonGrid>
            <IonRow>
              <IonCol className="pageTitle">Developer Team</IonCol>
            </IonRow>
          </IonGrid>
          <IonImg class="teamImages" src="assets/images/Team.png"></IonImg>
          <br />
          <IonRow>
            <IonCol className="pageTitle">Members Name</IonCol>
          </IonRow>
          <IonCardContent class="nameCard">
            <li> SOPHANITH MEY ID:6103160</li>
            <li> GUNTAPON LAMTANTONG ID:6102742</li>
            <li> THEERAPHAT SONGWONG ID:6102659</li>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <IonRow>
        <IonCol class="appTitle">
          Information Technology | DIT | Rangsit University
        </IonCol>
      </IonRow>
    </IonPage>
  );
};

export default About;
