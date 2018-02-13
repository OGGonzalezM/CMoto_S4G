odoo.define('pos_custom.discount_price', function (require) {
"use strict";

var models = require('point_of_sale.models');

var _super_orderline = models.Orderline.prototype;
models.Orderline = models.Orderline.extend({
    initialize: function(attr, options){
        _super_orderline.initialize.apply(this,arguments);
        if (options.json) {
            return;
        }
        this.price   = options.product.list_price;
    },
});

var _super_order = models.Order.prototype;
models.Order = models.Order.extend({
    add_product: function(product, options){
        _super_order.add_product.apply(this, arguments);
        options = options || {};
        var dis = product.list_price - product.price,
            dis_per = (100 * dis) / product.list_price;
        if(dis_per){
            dis_per += (options.discount || 0);
            this.selected_orderline.set_discount(dis_per.toFixed(this.pos.dp['Discount']));
        }
    },
    numletras: function(n)
    {
      var o=new Array("Diez", "Once", "Doce", "Trece", "Catorce", "Quince", "Dieciseis", "Diecisiete", "Dieciocho", "Diecinueve", "Veinte", "Veintiuno", "Veintidos", "Veintitres", "Veinticuatro", "Veinticinco", "Veintiseis", "Veintisiete", "Veintiocho", "Veintinueve");
      var u=new Array("Cero", "Uno", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve");
      var d=new Array("", "", "", "Treinta", "Cuarenta", "Cincuenta", "Sesenta", "Setenta", "Ochenta", "Noventa");
      var c=new Array("", "Ciento", "Doscientos", "Trescientos", "Cuatrocientos", "Quinientos", "Seiscientos", "Setecientos", "Ochocientos", "Novecientos");

      var n=parseFloat(n).toFixed(2); /*se limita a dos decimales, no sabía que existía toFixed() :)*/
      var p=n.toString().substring(n.toString().indexOf(".")+1); /*decimales*/
      var m=n.toString().substring(0,n.toString().indexOf(".")); /*número sin decimales*/
      var m=parseFloat(m).toString().split("").reverse(); /*tampoco que reverse() existía :D*/
      var t="";

      for (var i=0; i<m.length; i+=3)
      {
        var x=t;
        var b=m[i+1]!=undefined?parseFloat(m[i+1].toString()+m[i].toString()):parseFloat(m[i].toString());
        t=m[i+2]!=undefined?(c[m[i+2]]+" "):"";
        t+=b<10?u[b]:(b<30?o[b-10]:(d[m[i+1]]+(m[i]=='0'?"":(" y "+u[m[i]]))));
        t=t=="Ciento Cero"?"Cien":t;
        if (2<i&&i<6)
          t=t=="Uno"?"Mil ":(t.replace("Uno","Un")+" Mil ");
        if (5<i&&i<9)
          t=t=="Uno"?"Un Millón ":(t.replace("Uno","Un")+" Millones ");
        t+=x;
      }

      t+=" Pesos "+p+"/100 M.N";
      /*correcciones*/
      t=t.replace("  "," ");
      t=t.replace(" Cero","");
      return t;
    },
    numberToWords: function(n) {
        const arr = x => Array.from(x);
        const num = x => Number(x) || 0;
        const str = x => String(x);
        const isEmpty = xs => xs.length === 0;
        const take = n => xs => xs.slice(0,n);
        const drop = n => xs => xs.slice(n);
        const reverse = xs => xs.slice(0).reverse();
        const comp = f => g => x => f (g (x));
        const not = x => !x;
        const chunk = n => xs =>
              isEmpty(xs) ? [] : [take(n)(xs), ...chunk (n) (drop (n) (xs))];

        // numToWords :: (Number a, String a) => a -> String
        let numToWords = n => {

          let a = [
            '', 'one', 'two', 'three', 'four',
            'five', 'six', 'seven', 'eight', 'nine',
            'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
            'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
          ];

          let b = [
            '', '', 'twenty', 'thirty', 'forty',
            'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
          ];

          let g = [
            '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
            'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
          ];

          // this part is really nasty still
          // it might edit this again later to show how Monoids could fix this up
          let makeGroup = ([ones,tens,huns]) => {
            return [
              num(huns) === 0 ? '' : a[huns] + ' hundred ',
              num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
              a[tens+ones] || a[ones]
            ].join('');
          };

          let thousand = (group,i) => group === '' ? group : `${group} ${g[i]}`;

          if (typeof n === 'number')
            return numToWords(String(n));
          else if (n === '0')
            return 'zero';
          else
            return comp (chunk(3)) (reverse) (arr(n))
              .map(makeGroup)
              .map(thousand)
              .filter(comp(not)(isEmpty))
              .reverse()
              .join(' ');
        };

        var noList = n.toString().split('.');
        if (noList.length == 1){
            return numToWords(n);
        }
        else {
            return numToWords(noList[0]) + ' and ' + numToWords(noList[1]);
        }
    },
});

});
