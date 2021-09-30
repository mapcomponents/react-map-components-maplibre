const nmMap = {
  street: [
    "footway",
    "street",
    "road",
    "street_name",
    "residential",
    "path",
    "pedestrian",
    "road_reference",
    "road_reference_intl",
    "square",
    "place",
  ],
  number: ["house_number", "street_number"],
  place: [
    "city",
    "village",
    "hamlet",
    "locality",
    "croft",
    "neighbourhood",
    "suburb",
    "city_district",
    "district",
    "quarter",
    "borough",
    "city_block",
    "residential",
    "commercial",
    "industrial",
    "houses",
    "subdivision",
    "allotments",
    "postal_city",
    "town",
    "municipality",
    "local_administrative_area",
  ],
  zip: ["postcode", "partial_postcode"],
  state: ["state", "province", "state_code"],
};

const nmConverter = (nmAddress) => {
  const addressArr = [];
  for (let key in nmMap) {
    nmMap[key].some((element) => {
      if (nmAddress.hasOwnProperty(element)) {
        addressArr.push(nmAddress[element]);
        return true;
      }
      return false;
    });
  }
  return addressArr.join(", ");
};
export default nmConverter;
