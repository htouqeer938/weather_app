import fetch from "cross-fetch";

// action types

export const GET_POSTS = "GET POSTS";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

//action Creaters
export const getPosts = () => ({
  type: GET_POSTS,
});

export const getPostsSuccess = (data) => ({
  type: GET_POSTS_SUCCESS,
  data: data,
});

export const getPostsFailure = (error) => ({
  type: GET_POSTS_FAILURE,
  error: error,
});

export function fetchPosts(address) {
  return function (dispatch) {
    dispatch(getPosts());

    // getting latitude and logitude geocode
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?types=place&access_token=pk.eyJ1IjoiZmFyYXpzaGFoaWQxIiwiYSI6ImNrN3lvOThpeDAwY2szZ3FxamppMTY5bXMifQ.9W-8GrvP4WnJNYRSnvSSBw";
    return fetch(url)
      .then(
        (response) => response.json(),

        (error) => {
          console.log("An error occurred.", error);
          //dispatch(getPostsFailure(error))
        }
      )
      .then((json) => {
        const data = {
          latitude: json.features[0].center[1],
          longitude: json.features[0].center[0],
          location: json.features[0].place_name,
        };

        // Getting Forecast
        forecast(data.latitude, data.longitude, (error, Temperature) => {
          const CityWeather = {
            location: data.location,
            temperature: Temperature["dailyTemperature"],
          };

          //console.log(CityWeather.temperature)

          dispatch(getPostsSuccess(CityWeather));
        });
      });
  };
}

const forecast = (latitute, longitude, callback) => {
  const url =
    "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/195ca987ca37b2ade73084bb2b53559c/" +
    latitute +
    "," +
    longitude +
    "?units=si";

  return fetch(url)
    .then(
      (response) => response.json(),

      (error) => {
        console.log("An error occurred.", error);
        if (error) {
          callback("Unable to connect to weather service", undefined);
        }
        //dispatch(getPostsFailure(error))
      }
    )
    .then((json) => {
      // console.log(json.daily.data[0])

      // dailyTemperature Array has daily Temperature

      const dailyTemperature = json.daily.data.map((d, i) => {
        return d.temperatureHigh;
      });

      callback(undefined, {
        dailyTemperature,
      });
    });
};
