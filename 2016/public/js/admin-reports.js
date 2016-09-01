(function(){

    var templates = {
        sponsorInfo: `<table cellspacing="0">
            <tr>
                <th>
                    <img src="@{image}" width="100" />
                </th>
                <th>
                    @{name}
                </th>
            </tr>
            <tr>
                <td>
                    Cota:
                </td>
                <td>
                    @{level}
                </td>
            </tr>
            <tr>
                <td>
                    Primeiro pagamento:
                </td>
                <td>
                    @{firstpayment}
                </td>
            </tr>
            <tr>
                <td>
                    Número de parcelas
                </td>
                <td>
                    @{payments}
                </td>
            </tr>
            {@ if (payments != "1") @}
                <tr>
                    <td>
                        Valor mensal
                    </td>
                    <td>
                        @{monthpayment}
                    </td>
                </tr>
            {@ endif @}
            <tr>
                <td>
                    Valor total
                </td>
                <td>
                    @{ammount}
                </td>
            </tr>
            <tr>
                <td>
                    Contratos
                </td>
                <td>
                    {@ for contract in contractList @}
                        <a href="/@{ contract.url }" class="openInModal">@{ contract.fakeName }</a>
                        <a href="/@{ contract.url }?download=1" target="blank">[download]</a><br/>
                    {@ endfor @}
                </td>
            </tr>

            <tr>
                <td>
                    Notas Fiscais
                </td>
                <td>
                    {@ for nf in nfsList @}
                        <a href="/@{ nf.url }" class="openInModal">@{ nf.fakeName }</a>
                        <a href="/@{ nf.url }?download=1" target="blank">[download]</a><br/>
                    {@ endfor @}
                </td>
            </tr>
        </table>`,

        eventInfo: `<table cellspacing="0" class="event-info-content">
            <tr>
                <th>
                    <img src="@{image}" width="100" />
                </th>
                <th>
                    @{name}
                </th>
            </tr>
            <tr>
                <td>
                    Description:
                </td>
                <td>
                    @{description}
                </td>
            </tr>
            <tr>
                <td>
                    Link
                </td>
                <td>
                    <a href="@{link}" target="_blank">@{link}</a>
                </td>
            </tr>
            <tr>
                <td>
                    Date:
                </td>
                <td>
                    @{date}
                </td>
            </tr>
            <tr>
                <td>
                    Date End:
                </td>
                <td>
                    @{dateend}
                </td>
            </tr>
            <tr>
                <td>
                    Featured:
                </td>
                <td>
                    @{featured}
                </td>
            </tr>
            <tr>
                <td>
                    Sponsoring Type:
                </td>
                <td>
                    @{sponsoringType}
                </td>
            </tr>
            {@ if sponsoringType == "Valor Flexível" @}
            <tr>
                <td>
                    Expected ammount:
                </td>
                <td>
                    @{flexibleAmmount}
                </td>
            </tr>
            {@ else @}
            <tr>
                <td>
                    Gold Ammount
                </td>
                <td>
                    @{fixedAmmountGold}
                </td>
            </tr>
            <tr>
                <td>
                    Silver Ammount
                </td>
                <td>
                    @{fixedAmmountSilver}
                </td>
            </tr>
            <tr>
                <td>
                    Bronze Ammount
                </td>
                <td>
                    @{fixedAmmountBronze}
                </td>
            </tr>
            {@ endif @}

            <tr>
                <td>
                    Price:
                </td>
                <td>
                    @{price}
                </td>
            </tr>
            <tr>
                <td>
                    Venue:
                </td>
                <td>
                    @{venue}
                </td>
            </tr>
            <tr>
                <td>
                    Location:
                </td>
                <td>
                    Street: @{location.street1} @{location.street2}<br/>
                    Suburb: @{location.suburb}<br/>
                    @{location.country} - @{location.state}<br/>
                    Postcode: @{location.postcode}
                </td>
            </tr>
        </table>`,

        file: `<object data="@{ url }" width="100%" height="100%">
            alt : <a href="@{ url }">@{ url }</a>
        </object>`
    }

    const NASC_PERC = 25; // %
    var edition = {
        year: document.getElementById('select-edition-year').value,
        initialCash: document.getElementById('editionInitialCash').innerHTML,
        sponsoringLimit: document.getElementById('editionSponsoringLimit').innerHTML,
        bonus: parseFloat(document.getElementById('editionBonusLimit').innerHTML)
    };
    var infoBtns = [].slice.call(document.querySelectorAll('input[type=button][value=i]'));
    var showingModal = false;
    var modalShaddowEl = document.getElementById('shaddow-modal');
    var backModalBtn = document.getElementById('back-modal');
    var modalEl = document.getElementById('modal');

    var env = nunjucks.configure('/path/to/templates', {
        tags: {
            blockStart: '{'+'@',
            blockEnd: '@'+'}',
            variableStart: '@{',
            variableEnd: '}',
            commentStart: '<!--',
            commentEnd: '-->'
        }
    });

    infoBtns.forEach(function(cur){
        cur.addEventListener('click', function(event){
            showModal(cur);
            var data = JSON.parse(JSON.stringify(this.dataset));
            if(data.contracts){
                // sponsors
                data.contracts = JSON.parse(data.contracts);
                data.contractList = [];
                data.contracts.forEach(function(cur){
                    if(cur){
                        var tmp = cur.split('---');
                        tmp.shift();
                        data.contractList.push({
                            url: cur,
                            fakeName: tmp.join(' ').replace(/(\d{0,2})\-(\d{0,2})\-(\d{0,4})/, '$1/$2/$3')
                        });
                    }
                });

                data.firstpayment = new Date(data.firstpayment);
                data.firstpayment = ("0" + data.firstpayment.getDate()).slice(-2)+'/'+(("0" + (data.firstpayment.getMonth()+1)).slice(-2) )+'/'+data.firstpayment.getFullYear();

                data.nfs = JSON.parse(data.nfs);
                data.nfsList = [];
                data.nfs.forEach(function(cur){
                    if(cur){
                        var tmp = cur.split('---');
                        tmp.shift();
                        data.nfsList.push({
                            url: cur,
                            fakeName: tmp.join(' ').replace(/(\d{0,2})\-(\d{0,2})\-(\d{0,4})/, '$1/$2/$3')
                        });
                    }
                });

                modalEl.innerHTML = renderTpl('sponsorInfo', data);
            }else{
                // events
                data.location = JSON.parse(data.location);
                modalEl.innerHTML = renderTpl('eventInfo', data);
            }

        });
    });

    function renderTpl (tpl, data) {
        tpl = templates[tpl];
        return env.renderString(tpl, data);
    }

    function hideModal () {
        showingModal = false;
        modalShaddowEl.style.display = 'none';
        backModalBtn.style.display = 'none';
    }

    function showModal (from) {
        showingModal = from;
        modalShaddowEl.style.display = 'flex';
    }

    function showBackBtn (from) {
        backModalBtn.style.display = 'block';
        backModalBtn.onclick = function(){
            console.log(from)
            from.click();
        };
        return false;
    }

    modalShaddowEl.addEventListener('click', function(event){

        if(event.target.classList.contains('openInModal')){

            modalEl.innerHTML = renderTpl('file', {
                url: event.target.getAttribute('href')
            });

            showBackBtn(showingModal);

            event.stopPropagation();
            event.preventDefault();
            return false;
        }
    });

    document.getElementById('close-modal').addEventListener('click', function(){
        hideModal();
    });

    document.addEventListener('keyup', function(event){
        if (event.keyCode == 27) {
            hideModal();
        }
    });

    /* ********  CALCULATING ******** */
    function getQuarterSelector (tableId, q) {
        q--;
        q = [2+(q*3), 3+(q*3), 4+(q*3)];
        //var qList= [2+(q*3), ]
        var selector = '#'+tableId+' td:nth-child('+q[0]+'):not([colspan]),#spon-table td:nth-child('+q[1]+'):not([colspan]), #spon-table td:nth-child('+q[2]+'):not([colspan])';
        //return selector;
        return [].slice.call(
            document.querySelectorAll(selector)
        );
    }

    function sumValues (qEls) {
        var sum = 0;
        qEls.forEach(function(cur){
            sum+= parseFloat(cur.dataset.ammount || cur.innerText || 0);
        });
        return sum.toFixed(2);
    }

    function nascCommission (ammount) {
        return NASC_PERC * ammount /100;
    }

    function getQuarterTotalEls (totalRow) {
        return [].slice.call(
            document.querySelectorAll('.'+totalRow+' td[colspan]')
        ).slice(0, 4);
    }

    function getQuartersSum () {
        var tmp = [].slice.call(document.querySelectorAll('.total-quarter td:nth-child(2)[colspan],.total-quarter td:nth-child(3)[colspan], .total-quarter td:nth-child(4)[colspan], .total-quarter td:nth-child(5)[colspan]'));
        return sumValues(tmp);
    }

    function getNascCommission () {
        var tmp = [].slice.call(document.querySelectorAll('.total-nasc td[colspan]'));
        return sumValues(tmp);
    }

    function setFlexibleEvents (flexibleEventsQuarters) {
        var flexibleEvents = [].slice.call(document.querySelectorAll('.flexible-value-events th input[value=i]'));
        var extraCash = 0;

        var eventsInQ = [
            [].slice.call(document.querySelectorAll('.flexible-value-events .event-month:nth-child(2), .flexible-value-events .event-month:nth-child(3), .flexible-value-events .event-month:nth-child(4)')),
            [].slice.call(document.querySelectorAll('.flexible-value-events .event-month:nth-child(5), .flexible-value-events .event-month:nth-child(6), .flexible-value-events .event-month:nth-child(7)')),
            [].slice.call(document.querySelectorAll('.flexible-value-events .event-month:nth-child(8), .flexible-value-events .event-month:nth-child(9), .flexible-value-events .event-month:nth-child(10)')),
            [].slice.call(document.querySelectorAll('.flexible-value-events .event-month:nth-child(11), .flexible-value-events .event-month:nth-child(12), .flexible-value-events .event-month:nth-child(13)'))
        ];

        var totalExtraEls = getQuarterTotalEls('total-extra');
        flexibleEventsQuarters.forEach(function(currentQuarter, idx){
            var quarterEventsSum = 0;
            //debugger

            if (eventsInQ[idx].length) {

                eventsInQ[idx].forEach(function(cur){
                    var eventData = cur.parentNode.querySelector('th input[value=i]').dataset;
                    quarterEventsSum+= parseFloat(eventData.flexibleAmmount);
                });
                //console.log(quarterEventsSum);
                var totalForQuarter = parseFloat(flexibleEventsQuarters[idx].innerHTML) + extraCash;
                extraCash= 0;

                eventsInQ[idx].forEach(function(cur){
                    var eventData = cur.parentNode.querySelector('th input[value=i]').dataset;
                    var result = 0;
                    result = (parseFloat(eventData.flexibleAmmount) / quarterEventsSum * parseFloat(totalForQuarter));
                    cur.classList.add('has-info');
                    eventData.flexibleAmmount = parseFloat(eventData.flexibleAmmount);

                    cur.title= "Expected ammount: " + eventData.flexibleAmmount;

                    if (result > eventData.flexibleAmmount && eventData.flexibleAmmount < edition.sponsoringLimit) {
                        var diff = result - eventData.flexibleAmmount;
                        var prevResult = result;
                        if(diff > edition.bonus){
                            result= parseFloat(eventData.flexibleAmmount) + edition.bonus;
                            cur.title+= "\n"+"Received a BONUS of " + edition.bonus;
                            cur.classList.add('has-change-up');
                            extraCash+= parseFloat(prevResult - result);
                            cur.title+= "\n"+"Would be: " + prevResult.toFixed(2);
                            cur.title+= "\n"+"Extra ammount: " + parseFloat(prevResult - result).toFixed(2)
                        }else{
                            cur.title+= "\n"+"Received a BONUS of " + diff;
                        }
                    }

                    if (result > edition.sponsoringLimit) {
                        var extra = (result - edition.sponsoringLimit).toFixed(2);
                        cur.classList.add('has-change-down');
                        cur.title+= "\n"+"Would be: " + result.toFixed(2) +
                                    "\n"+"Edition Limit: " + edition.sponsoringLimit +
                                    "\n"+"Extra ammount: " + extra;
                        result = parseFloat(edition.sponsoringLimit);
                        cur.innerHTML+= "<br/>("+ result.toFixed(2) +")";
                        extraCash+= parseFloat(extra);
                    }else{
                        if(result < eventData.flexibleAmmount){
                            cur.classList.add('has-change-way-down');
                            cur.title+= "\n"+(eventData.flexibleAmmount - result).toFixed(2)+" below the expected";
                        }
                        cur.innerHTML+= "<br/>("+result.toFixed(2)+")";
                    }
                });
                // console.log(extraCash);
                totalExtraEls[idx].innerHTML = (extraCash || 0).toFixed(2);
            }else{
                extraCash+= parseFloat(flexibleEventsQuarters[idx].innerHTML);
                totalExtraEls[idx].innerHTML = extraCash.toFixed(2);
            }
        });

        var totalExtraEl = document.getElementById('total-extra-sum');
        var extraAmmountFromSponsors = document.getElementById('extra-ammount');
        totalExtraEl.innerHTML = (extraCash).toFixed(2);
        totalExtraEl.classList.add('has-info');
        totalExtraEl.title = "Extra cash, from the Q4";

        var finalExtraEl = document.getElementById('final-cash-next-edition');
        finalExtraEl.classList.add('has-info');
        finalExtraEl.innerHTML = (extraCash + parseFloat(extraAmmountFromSponsors.innerHTML)).toFixed(2);
        finalExtraEl.title = "To be used as initial Budget in the next edition.\n   Incoming from Q4 sponsors\n+ Extra from Q4\n\n"+
                            "  "+extraCash +"\n+"+ parseFloat(extraAmmountFromSponsors.innerHTML);

        var finalNascProfit = document.getElementById('final-nasc-commission');
            finalNascProfit.innerHTML = document.getElementById('total-nasc-commission').innerHTML;
            finalNascProfit.classList.add('has-info');
            finalNascProfit.title="Nasc Profit\n25% based on sponsors incoming";

        var finalInvestedInEvents = document.getElementById('final-invested-in-events');
        var tmp = document.getElementById('total-flexible-sum').innerHTML - document.getElementById('total-extra-sum').innerHTML;
        tmp+= parseFloat(document.getElementById('total-fixed-sum').innerHTML);
        finalInvestedInEvents.innerHTML = tmp.toFixed(2);
        finalInvestedInEvents.classList.add('has-info');
        finalInvestedInEvents.title = "Total distributed among all the events, with both fixed or flexible ammount";

        var finalSponsorsIncoming = document.getElementById('final-sponsors-incoming');
        finalSponsorsIncoming.innerHTML = document.getElementById('total-quarter-sum').innerHTML;
        finalSponsorsIncoming.classList.add('has-info');
        finalSponsorsIncoming.title = "Total incoming from sponsors";

        return ;
    }
    function setFixedEvents () {

        var levelsEls = {
            gold: [].slice.call(document.querySelectorAll('.level-gold')),
            silver: [].slice.call(document.querySelectorAll('.level-silver')),
            bronze: [].slice.call(document.querySelectorAll('.level-bronze'))
        };
        var golds = document.querySelectorAll('.level-gold').length;
        var silvers = document.querySelectorAll('.level-silver').length;
        var bronzes = document.querySelectorAll('.level-bronze').length;
        var fixedEvents = [].slice.call(document.querySelectorAll('.fixed-value-events th input[value=i]'));
        var total = 0;

        function getTotalFromLevel (level, percent) {
            percent = percent || 40;
            var curLevelTotal = 0;
            levelsEls[level].forEach(function(cur){
                curLevelTotal = parseFloat(curLevelTotal) + parseFloat(cur.parentElement.parentElement.lastElementChild.textContent);
            });
            debugger;
            return (curLevelTotal * percent / 100).toFixed(2);
        }

        fixedEvents.forEach(function(cur){
            // TODO: treat ammounts for other fixed events
            //cur.dataset.bronzeAmmount = cur.dataset.fixedAmmountBronze * bronzes; // 40%
            //cur.dataset.silverAmmount = cur.dataset.fixedAmmountSilver * silvers; // 40%
            //cur.dataset.goldAmmount = cur.dataset.fixedAmmountGold * golds;
            cur.dataset.bronzeAmmount = cur.dataset.fixedAmmountBronze * bronzes; // 40%
            cur.dataset.silverAmmount = cur.dataset.fixedAmmountSilver * silvers; // 40%

            //cur.dataset.goldAmmount = cur.dataset.fixedAmmountGold * golds;

            cur.dataset.goldAmmount = getTotalFromLevel('gold');
            cur.dataset.silverAmmount = getTotalFromLevel('silver');
            cur.dataset.bronzeAmmount = getTotalFromLevel('bronze');

            cur.dataset.totalSponsoredAmmount = parseFloat(cur.dataset.bronzeAmmount) + parseFloat(cur.dataset.silverAmmount) + parseFloat(cur.dataset.goldAmmount);

            var theMonth = cur.parentNode.parentNode.querySelector('.event-month');
            if(theMonth){
                theMonth.innerHTML += "<br/>("+cur.dataset.totalSponsoredAmmount+")";
                total+= parseFloat(cur.dataset.totalSponsoredAmmount);
                theMonth.classList.add('has-info');
                theMonth.title = golds + " Gold: " + cur.dataset.goldAmmount + "\n" +
                                 silvers + " Silver: " + cur.dataset.silverAmmount + "\n" +
                                 bronzes + " Bronze: " + cur.dataset.bronzeAmmount;
            }
        });
        document.getElementById('total-fixed-sum').innerHTML = total;

        setTotalFixedEventsForQuarters(total);
    }

    function setTotalFixedEventsForQuarters (totalAmmount) {
        var first = true;
        var qTotals = getQuarterTotalEls('total-for-quarters');
        var qTotalsSum = parseFloat(document.getElementById('total-for-quarters-sum').innerHTML);
        var totalFixedEls = getQuarterTotalEls('total-fixed');
        var restanteEls = getQuarterTotalEls('restante');
        //console.log(totalFixedEls);
        qTotals.forEach(function(cur, idx){

            var currentQuarter = parseFloat(cur.innerHTML);
            if(first){
                currentQuarter+= parseFloat(edition.initialCash);
                first = false;
            }
            //console.log(qTotalsSum, qTotals, totalAmmount);
            var result = (currentQuarter / qTotalsSum * totalAmmount).toFixed(2);
            totalFixedEls[idx].innerHTML = result;
            restanteEls[idx].innerHTML = (currentQuarter - result).toFixed(2);
        });
        document.getElementById('total-flexible-sum').innerHTML = sumValues(restanteEls);

        setFlexibleEvents(restanteEls);
    }

    function getQuarterMinusCommission () {
        var qTotals = getQuarterTotalEls('total-quarter');
        var nascEls = getNascCommission();
        var qTotalsValues = [
            sumValues(getQuarterSelector('spon-table', 1)),
            sumValues(getQuarterSelector('spon-table', 2)),
            sumValues(getQuarterSelector('spon-table', 3)),
            sumValues(getQuarterSelector('spon-table', 4))
        ];
    }

    function calculateNascMonthlyCommition () {
        var els = [].slice.call(document.querySelectorAll('.nasc-month-ammount'));

        els.forEach(function(cur, idx){
            var result = sumValues([].slice.call(document.querySelectorAll('#spon-table .has-payment.month-'+idx)));
            result = parseFloat(NASC_PERC * result /100).toFixed(2);
            cur.innerHTML = result;
        });
    }

    // TOTAL QUARTERS
    var qTotals = getQuarterTotalEls('total-quarter');
    var qTotalsValues = [
        sumValues(getQuarterSelector('spon-table', 1)),
        sumValues(getQuarterSelector('spon-table', 2)),
        sumValues(getQuarterSelector('spon-table', 3)),
        sumValues(getQuarterSelector('spon-table', 4))
    ];

    qTotals[0].innerHTML = qTotalsValues[0];
    qTotals[1].innerHTML = qTotalsValues[1];
    qTotals[2].innerHTML = qTotalsValues[2];
    qTotals[3].innerHTML = qTotalsValues[3];

    // total quarter
    document.getElementById('total-quarter-sum').innerHTML = getQuartersSum();

    // TOTAL NASC COMMISSION
    qTotals = getQuarterTotalEls('total-nasc');

    var nascCommissionTotals = [
        nascCommission(qTotalsValues[0]),
        nascCommission(qTotalsValues[1]),
        nascCommission(qTotalsValues[2]),
        nascCommission(qTotalsValues[3])
    ];
    qTotals[0].innerHTML = nascCommissionTotals[0];
    qTotals[1].innerHTML = nascCommissionTotals[1];
    qTotals[2].innerHTML = nascCommissionTotals[2];
    qTotals[3].innerHTML = nascCommissionTotals[3];
    // total commission
    document.getElementById('total-nasc-commission').innerHTML = parseFloat(getNascCommission()).toFixed(2);
    calculateNascMonthlyCommition();

    // TOTAL FOR EACH QUARTER
    qTotals = getQuarterTotalEls('total-for-quarters');

    qTotals[0].innerHTML = edition.initialCash;//qTotalsValues[0] - nascCommissionTotals[0];
    qTotals[0].title = "Edition Initial Cash: " + edition.initialCash;
    qTotals[1].innerHTML = parseFloat(qTotalsValues[0] - nascCommissionTotals[0]).toFixed();
    qTotals[1].title = " " + parseFloat(qTotalsValues[0] + "\n-" + nascCommissionTotals[0]).toFixed();
    qTotals[2].innerHTML = parseFloat(qTotalsValues[1] - nascCommissionTotals[1]).toFixed();
    qTotals[2].title = " " + parseFloat(qTotalsValues[1] + "\n-" + nascCommissionTotals[1]).toFixed();
    qTotals[3].innerHTML = parseFloat(qTotalsValues[2] - nascCommissionTotals[2]).toFixed();
    qTotals[3].title = " " + parseFloat(qTotalsValues[2] + "\n-" + nascCommissionTotals[2]).toFixed();
    //qTotals[3].innerHTML = qTotalsValues[3] - nascCommissionTotals[3];
    var extraAmmountForTheNextYear = parseFloat(qTotalsValues[3] - nascCommissionTotals[3]).toFixed();
    document.getElementById('extra-ammount').innerHTML = extraAmmountForTheNextYear;
    document.getElementById('extra-ammount').title = "Money from sponsors in the Q4\n " + qTotalsValues[3] + "\n-" + nascCommissionTotals[3];
    // total commission
    document.getElementById('total-for-quarters-sum').innerHTML = sumValues(qTotals);

    document.getElementById('select-edition-year').addEventListener('change', function(){
        location.href = location.protocol+location.host+location.port+location.pathname + '?year=' + this.value;
    });

    setFixedEvents();

})();


/// FORMULA
// valorDoEvento / somaDosEventosDoQuarter * budgetDoQuarter
