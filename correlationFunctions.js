function sum(array){
		var mysum = 0;
		for (var i = 0; i < array.length; i++){
			mysum += array[i];
		}
		return mysum;
	}

	function calcS(a,b){
		var mysum = 0;
		var minlength;
		if (a.length<b.length){
			minlength = a.length;
		}
		else {
			minlength = b.length;
		}
		for (var i = 0; i < minlength; i++){
			mysum += (a[i]*b[i]);
		}
		mysum -= (mysum/minlength);
		return mysum;
	}

	function calcCorr(a,b){
		var mycorr = 0;
		mycorr = (calcS(a,b)/Math.sqrt(calcS(a,a)*calcS(b,b)));
		return mycorr;
	}

	function maxCorr(list){
		var maxi = 0;
		var maxj = 0;
		var max = 0;
		var tempcorr = 0;
		for (var i = 0; i < list.length-1; i++){
			for (var j = 1; j < list.length; j++){
				if (i == j){
					continue;
				}
				tempcorr = calcCorr(list[i], list[j]);
				if (tempcorr > max){
					maxi = i;
					maxj = j;
					max = tempcorr;
				}
			}
		}
		var myret;
		myret = [maxi, maxj, max]
		return myret;
	}

	function maxCorrWith(a, list){
		var maxi = 0;
		var maxj = 0;
		var max = 0;
		var tempcorr = 0;
		var j;
		j = list.indexOf(a);
		for (var i = 0; i < list.length-1; i++){
			if (i == j){
				continue;
			}
			tempcorr = calcCorr(list[i], list[j]);
			if (tempcorr > max){
				maxi = i;
				maxj = j;
				max = tempcorr;
			}
		}
		var myret;
		myret = [maxi, maxj, max]
		return myret;
		
	}


	function formBuckets(rdt){
		var BUCKET_SCALAR = 10;
		var P_THRESHOLD = .0005;
		var b_size = Math.floor((rdt.length-1)/BUCKET_SCALAR);
		var b_start = 0;
		var b_stop = Math.floor(b_size);
		var dt = Array.apply(null, new Array(BUCKET_SCALAR)).map(Number.prototype.valueOf,0);

		for (var c = 0; c < BUCKET_SCALAR; c++){

			for (var i = b_start; i < b_stop; i++ ){

				for (var j = 0; j < rdt[i].data.length; j++){
					if (rdt[i].data[j].y == undefined){
						continue;
					}
					if (rdt[i].data[j].y>P_THRESHOLD){
						dt[c]++; 
					}
				}
			}
			b_start = b_stop+1;
			b_stop += Math.floor(b_size);
			if (!(b_stop<rdt.length-1)){
				b_stop = rdt.length-1;
			}
		}
		return dt;
	}
