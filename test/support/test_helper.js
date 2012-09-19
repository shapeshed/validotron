module.exports = {
  isEmpty: function(obj){
    return (Object.getOwnPropertyNames(obj).length === 0);
  }
}
