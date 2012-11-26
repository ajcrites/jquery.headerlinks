(function ($) {
   $.fn.headerlinks = function (faith) {
      var container = this;
      var hope = {
         minlen: 5
         , incl: []
         , deny: []
         , headers: {
            use: true
            , depth: 3
         }
         , numbers: true
         , hierarchy: {
            'h2': {
               css: {'margin-left': '20px'}
               , num: 2
            }
            , 'h3': {
               css: {'margin-left': '40px'}
               , num: 3
            }
            , 'h4': {
               css: {'margin-left': '60px'}
               , num: 4
            }
            , 'h5': {
               css: {'margin-left': '80px'}
               , num: 5
            }
            , 'h6': {
               css: {'margin-left': '100px'}
               , num: 6
            }
         }
         , container: {
            'width': '30%'
            , 'border': '1px solid black'
            , 'padding' : '10px'
            , 'font-size': '10px'
         }
         , debug: true
         , init: true
      };
      var love = {};
      var incl = '';
      var justice = $.extend(love, hope, faith);
      var numbers = justice.numbers;
      var all_links = 0;
      var debug_data = '';
      if (justice.debug) {
         var debug = document.createElement("div");
         debug.id = "headerlinks_debug";
         $(debug).css({
            'position': 'fixed'
            , 'display': 'none'
            , 'background-color': 'red'
            , 'color': 'white'
            , 'font-weight': 'bold'
            , 'top': 0
            , 'left': 0
            , 'width': '100%'
         });
         $("body").prepend(debug);
      }
      if (justice.incl.length == 0 && justice.headers.use == false) {
         debug_data += 'You must either set headers.use = true or provide options for incl. ';
      }
      else {
         if (typeof(justice.incl) == 'object') {
            incl = justice.incl.join(', ');
         }
         else if (typeof(justice.incl == 'string')) {
            incl = justice.incl;
         }
         else {
            debug_data += 'incl must be either an array [] or string with comma separated selectors. ';
            incl = 'nothing';
         }
      }
      if (justice.headers.use) {
         var head = justice.headers;
         if (head.depth < 1 || head.depth > 6) {
            debug_data += 'headers.depth must be between 1 and 6.  Defaulting to 3. ';
            head.depth = 3;
         }
         for (var x = 1; x <= head.depth; x++) {
            if (incl.length) {
               incl += ', ';
            }
            incl += 'h' + x;
         }
      }
      var deny = '';
      if (justice.deny.length > 0) {
         if (typeof(justice.deny) == 'object') {
            deny = justice.deny.join(', ');
         }
         else {
            deny = justice.deny;
         }
      }
      var use_hierarchy = !$.isEmptyObject(justice.hierarchy);
      var selector = $(incl).not(deny);
      var matches = false;
      var any_matches = false;
      var indeces = {1: 0};
      container.hide();
      if (!selector.length) {
         debug_data += 'No elements found with given selector combinations.  Rework incl, deny, and headers as needed. ';
      }
      else {
         selector.each(function (index) {
            all_links++;
            if (all_links >= justice.minlen) {
               container.show();
            }
            var match = $(this);
            var link = 'headerlinks_ident' + index;
            var anchor = null;
            var matched_css = {};
            var index_text = '';

            if (!this.id) {
               this.id = link;
            }
            else {
               link = this.id;
            }

            matches = false;
            $.each(justice.hierarchy, function (hr, attributes) {
               if (match.is(hr)) {
                  if (matches) {
                     debug_data += 'Element' + hr + ', class: ' + $(this).attr('class') + ', id: ' + this.id + ' has multiple matches in the hierarchy.  Using last match. ';
                  }
                  matches = true;
                  matched_css = attributes.css;
                  try {
                     var num = attributes.num
                  }
                  catch (e) {
                     num = false;
                  }
                  if (numbers && num) {
                     if (indeces[num] == undefined) {
                        indeces[num] = 1;
                     }
                     else {
                        indeces[num]++;
                     }
                     $.each(indeces, function(index, val) {
                        if (num >= index) {
                           index_text += val + '.';
                        }
                        else {
                           indeces[index] = 0;
                        }
                     });
                  }
               }
            });

            var linker = document.createElement('a');
            var linker_text = '';
            if (numbers) {
               if (index_text.length == 0) {
                  $.each(indeces, function(index) {
                     if (index == 1) {
                        indeces[index]++;
                     }
                     else {
                        indeces[index] = 0;
                     }
                  });
                  index_text = indeces[1] + '. ';
               }
               else {
                  index_text += ' ';
               }
               linker_text = index_text;
            }
            linker_text += match.text();
            linker.href = '#' + link;
            $(linker)
               .css($.extend({'display': 'block'}, matched_css))
               .text(linker_text);
            container.append(linker);
         });
      }
      if (debug_data.length) {
         $(debug).text('Headerlinks debug: ' + debug_data).show();
      }
      container.css(justice.container);
      if (justice.init && location.hash != '') {
         window.location = window.location;
         return false;
      }
   }
})(jQuery);
