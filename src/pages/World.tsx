import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonImg,
  IonRow,
  IonCol,
  IonLoading,
  IonCard,
  IonSlides,
  IonSlide,
  IonGrid,
  IonTitle,
} from "@ionic/react";
import moment from "moment";
import axios from "axios";
import "./World.css";
import codesToCountryNames from "./../data/Country3Codes.json";

interface IGLobalCount {
  count: number;
  date: string;
  result: ICaseCount;
}

interface ICaseCount {
  confirmed: number;
  recovered: number;
  deaths: number;
}

interface ICountry {
  country: ICaseCount;
}

interface ICountryCodeNames {
  code: string;
  name: string;
}

const slideOpts = {
  initialSlide: 1,
  speed: 50,
  slideShadows: true,
  loop: true,
  autoplay: true,
};

export function CalculateActiveCases(props: any) {
  return (
    <React.Fragment>
      {(props.a - (props.b + props.c)).toLocaleString()}
    </React.Fragment>
  );
}

export function CountryCodesToNames(props: any): any {
  let country: ICountryCodeNames =
    codesToCountryNames[
      codesToCountryNames
        .map((item) => {
          return item.code;
        })
        .indexOf(props.code)
    ];
  return country ? country.name : props.code;
}

export function sortByTotalCases(props: any): any {
  return props.sort((a: Object, b: Object) => {
    return Object.values(a)[0].confirmed > Object.values(b)[0].confirmed
      ? -1
      : Object.values(a)[0].confirmed < Object.values(b)[0].confirmed
      ? 1
      : 0;
  });
}

const World: React.FC = () => {
  const [data, setData] = useState<IGLobalCount>();
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const getGlobalData = async () => {
      //latest global count
      const result = await axios("https://covidapi.info/api/v1/global");
      // console.log(result);
      setData(result.data);
      setShowLoading(false);
    };
    getGlobalData();
  }, []);

  const confirmed = data?.result?.confirmed;
  const recovered = data?.result?.recovered;
  const deaths = data?.result?.deaths;

  const [countryWiseData, setCountryWiseData] = useState<ICountry[]>([]);
  useEffect(() => {
    const getGlobalCountryData = async () => {
      //latest global country wise count
      const result = await axios("https://covidapi.info/api/v1/global/latest");
      //console.log(result.data.result);
      let sortedResult = result.data.result;
      sortedResult.sort((a: Object, b: Object) => {
        return Object.values(a)[0].confirmed > Object.values(b)[0].confirmed
          ? -1
          : Object.values(a)[0].confirmed < Object.values(b)[0].confirmed
          ? 1
          : 0;
      });
      setCountryWiseData(sortedResult);
    };
    getGlobalCountryData();
  }, []);

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
            <IonCol class="appDate">{moment().format("Do MMM,HH:mm")}</IonCol>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Fetching total cases..."}
        />
        <IonRow>
          <IonCol class="appTitle">COVID-19 Dashboard</IonCol>
        </IonRow>
        <IonRow class="casesBox">
          <IonCol class="totalCases">
            Confirmed {confirmed?.toLocaleString()}
          </IonCol>
          <IonCol class="confirmedBox">
            Active
            <br />
            <CalculateActiveCases a={confirmed} b={recovered} c={deaths} />
          </IonCol>
          <IonCol class="recoveredBox">
            Recovered {recovered?.toLocaleString()}
          </IonCol>
          <IonCol class="deathsBox">Deaths {deaths?.toLocaleString()}</IonCol>
        </IonRow>

        <IonSlides class="tipsSlides" options={slideOpts}>
          <IonSlide class="slide">
            รักษาระยะห่างระหว่างตัวคุณกับตัวเองอย่างน้อย 1 เมตร (3 ฟุต)
            ใครก็ตามที่ไอหรือจาม
          </IonSlide>
          <IonSlide class="slide">
            หมั่นล้างมือบ่อยๆ ล้างให้สะอาด
            เพราะถือเป็นหนึ่งในวิธีช่วยป้องกันไวรัส COVID-19 ได้ดีที่สุด
          </IonSlide>
          <IonSlide class="slide">
            ควรทานอาหารที่ปรุงสุกแล้ว งดอาหารดิบ และเนื้อสัตว์ป่า
          </IonSlide>
          <IonSlide class="slide">งดเดินทางไปยังพื้นที่เสี่ยงโรคระบาด</IonSlide>
          <IonSlide class="slide">
            สถานการณ์ไวรัส COVID-19 ยังคงแพร่ระบาดอยู่อย่างต่อเนื่องในขณะนี้
            ทำให้ผู้ป่วยมีอาการปอดอักเสบรุนแรงจนถึงแก่ชีวิตได้
          </IonSlide>
        </IonSlides>
        <IonCard>
          <IonGrid>
            <IonRow class="tableTitle">
              <IonCol col-4 class="tableCountry">
                ประเทศ
              </IonCol>
              <IonCol class="tableCol">สะสม</IonCol>
              <IonCol class="tableCol">ผู้ติดเชื้อ</IonCol>
              <IonCol class="tableCol">หายแล้ว</IonCol>
              <IonCol class="tableCol">เสียชีวิต</IonCol>
            </IonRow>
            {countryWiseData.map((item, idx) => (
              <IonRow class="tableZebraStrip" key={idx}>
                <IonCol col-4 class="tableCountry">
                  <CountryCodesToNames code={Object.keys(item)[0]} />
                </IonCol>
                <IonCol class="tableCol">
                  {Object.values(item)[0].confirmed?.toLocaleString()}
                </IonCol>
                <IonCol class="tableCol">
                  <CalculateActiveCases
                    a={Object.values(item)[0].confirmed}
                    b={Object.values(item)[0].recovered}
                    c={Object.values(item)[0].deaths}
                  />
                </IonCol>
                <IonCol class="tableCol">
                  {Object.values(item)[0].recovered?.toLocaleString()}
                </IonCol>
                <IonCol class="tableCol">
                  {Object.values(item)[0].deaths?.toLocaleString()}
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonCard>
      </IonContent>
      <IonRow class="tableFooter">
        <IonCol col-4 class="tableCountry">
          ทั่วโลก
        </IonCol>
        <IonCol class="tableCol">{confirmed?.toLocaleString()} </IonCol>
        <IonCol class="tableCol">
          <CalculateActiveCases a={confirmed} b={recovered} c={deaths} />
        </IonCol>
        <IonCol class="tableCol">{recovered?.toLocaleString()}</IonCol>
        <IonCol class="tableCol">{deaths?.toLocaleString()}</IonCol>
      </IonRow>
    </IonPage>
  );
};

export default World;
