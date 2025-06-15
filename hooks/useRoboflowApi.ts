import axios from "axios";

export default function useRoboFlowApi({ image }: { image: string }) {
  axios({
    method: "POST",
    url: "https://serverless.roboflow.com/atik-ayristirma/4",
    params: {
      api_key: "g4OtrfWuqIEudJ2QkAz1",
    },
    data: image,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.message);
    });
}
