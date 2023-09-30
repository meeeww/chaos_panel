const getEdad = (epoch) => {
  var birthday = new Date(0);
  birthday.setUTCSeconds(epoch);
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default getEdad;