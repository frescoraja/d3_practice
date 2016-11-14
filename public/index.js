import numbro from 'numbro';
import AllLocales from 'numbro/languages';

window.numbro = numbro;


const bling = numbro.culture('de-DE')(1231231).formatCurrency();

console.log(bling);
