import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonImg,
  IonRow,
  IonCol,
  IonList,
  IonCard,
  IonCardHeader,
  IonTitle,
} from "@ionic/react";
import "./World.css";

const World: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonRow>
            <IonCol>
              <IonImg
                class="appIcon"
                src="assets/icon/coronatracker_favicon.png"
                alt="WorldIcon"
              ></IonImg>
            </IonCol>
            <IonTitle class="appTitle">COVID-19 iNFO</IonTitle>
            <IonTitle></IonTitle>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow>
          <IonCol class="appTitle">
            Advisory & Guidelines (คำแนะนำ & แนวปฏิบัติ)
          </IonCol>
        </IonRow>
        <IonList>
          <IonCard>
            <iframe
              title="WHO"
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/i0ZabxXmH4Y"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </IonCard>
          <IonCard>
            <IonCardHeader>Symptons (โรคสัญญาณ)</IonCardHeader>
            <IonImg
              class="guidlineImages"
              src="assets/images/Symptoms2.png"
            ></IonImg>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              Symptoms of coronavirus (อาการของโรคโควิด-19)
            </IonCardHeader>
            <IonImg
              class="guidlineImages"
              src="assets/images/covid.png"
            ></IonImg>
          </IonCard>
          <IonCard>
            <IonCardHeader>Protection (การป้องกัน)</IonCardHeader>
            <IonImg class="guidlineImages" src="assets/images/def.png"></IonImg>
            <IonImg
              class="guidlineImages"
              src="assets/images/avoiding.png"
            ></IonImg>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              Stress Distraction Tips (การป้องกันStress)
            </IonCardHeader>
            <IonImg
              class="guidlineImages"
              src="assets/images/Stress.jpg"
            ></IonImg>
            <IonCardHeader>Stay Home (อยู่บ้านหยุดเชื้อ)</IonCardHeader>
            <IonImg
              class="guidlineImages"
              src="assets/images/stayhome.jpg"
            ></IonImg>
          </IonCard>
        </IonList>
      </IonContent>

      <IonRow>
        <IonCol class="appTitle">StayHealthy | StaySafe</IonCol>
      </IonRow>
    </IonPage>
  );
};

export default World;
