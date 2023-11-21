const getDate = (epoch) => {
    var myDate = new Date(epoch * 1000);
    return (
        ("0" + myDate.getDate()).slice(-2) +
        "/" +
        ("0" + (myDate.getMonth() + 1)).slice(-2) +
        "/" +
        myDate.getFullYear() +
        " " +
        ("0" + myDate.getHours()).slice(-2) +
        ":" +
        ("0" + myDate.getMinutes()).slice(-2)
    );
};

export default getDate;
