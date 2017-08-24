$(document).ready(function(){

	var calcCIDR = function(ipL, cnt) {

		var addrs = [];
		for(i=0; i < ipL.length; i++)
			addrs.push(ipaddr.parse(ipL[i]));

		if(addrs.length > 1)
			for(i = 1; i < addrs.length; i++)
				while(!addrs[i].match(addrs[0], cnt) && cnt > 0)
					cnt--;

		return addrs[0].toString() + "/" + cnt;
	};

	$('#goButton').click(function(e) {
		var boxText = $('#ipBox').val().trim();
		if(!boxText)
			return;

		var cnt = $("#protocol-select option:selected").val();
		var protocol = cnt == 32 ? ipaddr.IPv4 : ipaddr.IPv6;
		var ipL = boxText.split("\n");

		for(i=0; i < ipL.length; i++)
			if(!protocol.isValid(ipL[i]))
			{
				alert("Error: '" + ipL[i] + "' is not a valid IP address in this context.  Please fix before proceeding");
				return;
			}

		$('#resultBox').text(calcCIDR(ipL, cnt));
	});
});