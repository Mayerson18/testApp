export default {
  numberWithCommas: (x, currency) => {
    const curr = currency
    let thousands_sep = ','
    let  decimals_sep = '.'
    let decimals = 2
    if(curr) {
      thousands_sep = curr.thousands_sep ? curr.thousands_sep: ','
      decimals_sep = curr.decimals_sep ? curr.decimals_sep: ','
      decimals = curr.decimals ? parseFloat(curr.decimals): 2
    }
    let final_decimal = ''
    for (let i = 0; i < decimals; i++) { final_decimal += '0'}
    const mask = `#${thousands_sep}##0${decimals_sep}${final_decimal}`
    mask
    return parseInt(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousands_sep);
  }
}