const getEpoch = (date) => {
     return Math.floor(new Date(date).getTime()/1000.0)
};

export default getEpoch;