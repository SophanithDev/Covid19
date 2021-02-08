import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonRow,
  IonCol,
  IonImg,
  IonLoading,
  IonCard,
  IonSelect,
  IonSelectOption,
  IonCardHeader,
  IonTitle,
} from "@ionic/react";
import moment from "moment";
import axios from "axios";
import { Doughnut, Bar } from "react-chartjs-2";
import "./Country.css";
import { CalculateActiveCases } from "./World";
import "chartjs-plugin-datalabels";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

interface ICountryCount {
  count: number;
  result: {
    todaysDate: {
      [caseName: string]: ICases;
    };
  };
}

interface ICases {
  confirmed: number;
  deaths: number;
  recovered: number;
}

interface ISeriesCases {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
}

const Country: React.FC = () => {
  const [yourCountry, setYourCountry] = useState<string>("KHM");
  Storage.set({ key: "yourCountry", value: yourCountry });
  const [countryData, setcountryData] = useState<ICountryCount>();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const getCountryData = async () => {
      let result: any = "";
      const { value } = await Storage.get({ key: "yourCountry" });
      if (value) {
        result = await axios(
          "https://covidapi.info/api/v1/country/" + value + "/latest"
        );
      } else {
        result = await axios(
          "https://covidapi.info/api/v1/country/" + yourCountry + "/latest"
        );
      }
      // console.log(result);
      setcountryData(result.data.result);
      setShowLoading(false);
    };

    getCountryData();
  }, [yourCountry]);

  let confirmed,
    recovered,
    deaths: number = 0;
  if (countryData) {
    confirmed = Object.values(countryData)[0]?.confirmed;
    recovered = Object.values(countryData)[0]?.recovered;
    deaths = Object.values(countryData)[0]?.deaths;
  }

  const CountryDoughnutChart = {
    labels: ["Confirmed", "Recovered", "Deaths"],
    datasets: [
      {
        labels: {
          render: "value",
        },
        backgroundColor: ["#4399F6", "#37EA61", "#F34943"],
        hoverBackgroundColor: ["#007bff", "#127729", "#ff073a"],
        data: [confirmed, recovered, deaths],
      },
    ],
  };

  const [countryTimeSeriesData, setcountryTimeSeriesData] = useState<
    ISeriesCases[]
  >([]);
  let endDate: string = new Date().toISOString().split("T")[0];
  let todaysDate = new Date();
  let startDate: string = new Date(
    todaysDate.getTime() - 5 * 24 * 60 * 60 * 1000
  )
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    const getCountryTimeSeriesData = async () => {
      const result = await axios(
        "https://covidapi.info/api/v1/country/" +
          yourCountry +
          "/timeseries/" +
          startDate +
          "/" +
          endDate
      );
      // console.log(result);
      setcountryTimeSeriesData(result.data.result);
      setShowLoading(false);
    };

    getCountryTimeSeriesData();
  }, [yourCountry, endDate, startDate]);

  let dateArr: Array<string> = [];
  let confirmedArr: Array<number> = [];
  let recoveredArr: Array<number> = [];
  let deathsArr: Array<number> = [];
  countryTimeSeriesData.forEach((ele, idx) => {
    dateArr.push(ele.date);
    confirmedArr.push(ele.confirmed);
    recoveredArr.push(ele.recovered);
    deathsArr.push(ele.deaths);
  });

  const countryBarChart = {
    labels: [
      moment(dateArr[0]).format("MMM Do"),
      moment(dateArr[1]).format("MMM Do"),
      moment(dateArr[2]).format("MMM Do"),
      moment(dateArr[3]).format("MMM Do"),
      moment(dateArr[4]).format("MMM Do"),
    ],
    datasets: [
      {
        label: "Confirmed",
        backgroundColor: "#4399F6",
        borderColor: "#007bff",
        borderWidth: 1,
        data: [
          confirmedArr[0],
          confirmedArr[1],
          confirmedArr[2],
          confirmedArr[3],
          confirmedArr[4],
        ],
      },
      {
        label: "Recovered",
        backgroundColor: "#37EA61",
        borderColor: "#127729",
        borderWidth: 1,
        data: [
          recoveredArr[0],
          recoveredArr[1],
          recoveredArr[2],
          recoveredArr[3],
          recoveredArr[4],
        ],
      },
      {
        label: "Deaths",
        backgroundColor: "#F34943",
        borderColor: "#ff073a",
        borderWidth: 1,
        data: [
          deathsArr[0],
          deathsArr[1],
          deathsArr[2],
          deathsArr[3],
          deathsArr[4],
        ],
      },
    ],
  };

  const customPopoverOptions = {
    header: "เลือกประเทศของคุณ",
    translucent: false,
  };

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
          message={"Fetching latest count for your country..."}
        />

        <IonRow>
          <IonCol size="5" class="appTitle">
            ค้นหา COVID-19 ใน:
          </IonCol>
          <IonCol size="5" class="selectTitle">
            <IonSelect
              interfaceOptions={customPopoverOptions}
              interface="popover"
              value={yourCountry}
              onIonChange={(e) => {
                setYourCountry(e.detail.value);
              }}
            >
              <IonSelectOption value="KHM">Cambodia/กัมพูชา</IonSelectOption>
              <IonSelectOption value="THA">Thailand/ประเทศไทย</IonSelectOption>
              <IonSelectOption value="VNM">Vietnam/เวียดนาม</IonSelectOption>
              <IonSelectOption value="LAO">Lao/ลาว</IonSelectOption>
              <IonSelectOption value="IND">India/อินเดีย</IonSelectOption>
              <IonSelectOption value="USA">
                United States/อเมริกา
              </IonSelectOption>
              <IonSelectOption value="ARE">
                UAE/สหรัฐอาหรับเอมิเรต
              </IonSelectOption>
              <IonSelectOption value="FRA">France/ฝรั่งเศส</IonSelectOption>
              <IonSelectOption value="ESP">Spain/สเปน</IonSelectOption>
              <IonSelectOption value="ITA">Italy</IonSelectOption>
              <IonSelectOption value="DEU">Germany</IonSelectOption>
              <IonSelectOption value="CHN">China</IonSelectOption>
              <IonSelectOption value="JPN">Japan</IonSelectOption>
              <IonSelectOption value="ZAF">South Africa</IonSelectOption>
              <IonSelectOption value="KOR">South Korea</IonSelectOption>
              <IonSelectOption value="CAN">Canada</IonSelectOption>
              <IonSelectOption value="BRA">Brazil</IonSelectOption>
              <IonSelectOption value="ARG">Argentina</IonSelectOption>
              <IonSelectOption value="PAK">Pakistan</IonSelectOption>
              <IonSelectOption value="CHE">Switzerland</IonSelectOption>
              <IonSelectOption value="IRN">Iran</IonSelectOption>
              <IonSelectOption value="GBR">United Kingdom</IonSelectOption>
              <IonSelectOption value="TUR">Turkey</IonSelectOption>
              <IonSelectOption value="NLD">Netherland</IonSelectOption>
              <IonSelectOption value="RUS">Russia</IonSelectOption>
              <IonSelectOption value="PRT">Portugal</IonSelectOption>
              <IonSelectOption value="ISR">Israel</IonSelectOption>
              <IonSelectOption value="SWE">Sweden</IonSelectOption>
              <IonSelectOption value="AUS">Australia</IonSelectOption>
              <IonSelectOption value="AUT">Austria</IonSelectOption>
              <IonSelectOption value="NZL">New Zealand</IonSelectOption>
              <IonSelectOption value="SGP">Singapore</IonSelectOption>
              <IonSelectOption value="MYS">Malaysia</IonSelectOption>
            </IonSelect>
          </IonCol>
        </IonRow>

        <IonRow class="casesBox">
          <IonCol class="totalCases">
            สะสม
            <br /> {confirmed?.toLocaleString()}
          </IonCol>
          <IonCol class="confirmedBox">
            ผู้ติดเชื้อ
            <br />
            <CalculateActiveCases a={confirmed} b={recovered} c={deaths} />
          </IonCol>
          <IonCol class="recoveredBox">
            หายแล้ว
            <br /> {recovered?.toLocaleString()}
          </IonCol>
          <IonCol class="deathsBox">
            เสียชีวิต
            <br /> {deaths?.toLocaleString()}
          </IonCol>
        </IonRow>
        <IonCard>
          <Doughnut
            data={CountryDoughnutChart}
            options={{
              legend: {
                display: true,
                position: "right",
              },
              plugins: {
                datalabels: {
                  anchor: "bottom",
                  clamp: "true",
                  align: "end",
                  color: "black",
                  labels: {
                    title: {
                      font: {
                        weight: "bold",
                        size: 10,
                      },
                    },
                  },
                },
              },
            }}
          />
        </IonCard>
        <IonCard>
          <Bar
            data={countryBarChart}
            options={{
              scales: {
                xAxes: [
                  {
                    stacked: true,
                  },
                ],
                yAxes: [
                  {
                    stacked: true,
                  },
                ],
              },
              title: {
                display: true,
                text: "Cases in the current week",
                fontSize: 15,
              },
              legend: {
                display: true,
                position: "bottom",
              },
              plugins: {
                datalabels: { display: false },
              },
            }}
          />
          <IonRow>
            <IonCard>
              <IonCardHeader>Stay Home (อยู่บ้านหยุดเชื้อ)</IonCardHeader>
              <br />
              <IonImg
                class="guidlineImages"
                src="assets/images/home.jpg"
              ></IonImg>
            </IonCard>
          </IonRow>
        </IonCard>
      </IonContent>
      <IonRow>
        <IonCol class="appTitle">StayHome | StaySafe</IonCol>
      </IonRow>
    </IonPage>
  );
};

export default Country;
