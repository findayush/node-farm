module.exports = (temp, prod) => {
  let output = temp.replace(/{%PRODNAME%}/g, prod.productName);
  output = output.replace(/{%IMAGE%}/g, prod.image);
  output = output.replace(/{%PRICE%}/g, prod.price);
  output = output.replace(/{%FROM%}/g, prod.from);
  output = output.replace(/{%NUTRIENTS%}/g, prod.nutrients);
  output = output.replace(/{%QTY%}/g, prod.quantity);
  output = output.replace(/{%DESC%}/g, prod.description);
  output = output.replace(/{%ID%}/g, prod.id);
  if (!prod.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};
