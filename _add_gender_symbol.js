//cd AppData/Roaming/Anki2/username
//git clone https://github.com/khonkhortisan/_add_gender_symbol.git
//mklink /H "collection.media/_add_gender_symbol.js" "_add_gender_symbol/_add_gender_symbol.js"

//*see _style.anki.main.css
//replace {{Gender}} with
//<span class="gender {{Gender}}">{{Gender}}</span><script src="_add_gender_symbol.js"/>
addgendersymbol = function(){///alert("function run");
	let dosymbol=true, docolor=true, doreplace=true;	// conversion options
	let doallwords=true, dofirstword=false, dolastparen=false, dodotwords=false;	// placement options

	//palettes:
	let male='#89cff0', female='#ffb6c1', neuter='#fdfd96'; //baby blue/pink/yellow //♂♀⚲
	let noun='blue',pronoun='purple',verb='red',adjective='green',adverb='yellow',article='brown',preposition='orange',conjunction='gray',interjection='pink';//creativelanguageteaching
	
	//Colors needed for:
	let auxiliary='green', intransitive='red', transitive='yellow', normative='', pi='', number='green',person=pronoun,tense='tan',aspect=tense,fix=conjunction;//what does pi expand to?
	let declension=neuter, case_=declension//;, number=declension, gender=declension;
	//overrides:
	//let noun='red',verb='green',adjective='blue',adverb='orange',preposition='purple',pronoun='pink',conjunction='brown',interjection='yellow';//brwi, incomplete
	//let noun='green',adjective='orange',verb='blue',adverb='cyan';//effectiviology, incomplete
	//let noun='darkblue',pronoun='lightblue',actionverb='darkgreen',linkingverb='lightgreen',adjective='purple',adverb='orange',conjunction='white',preposition='tan';//kimskorner4teachertalk, includes white, incomplete
	//let noun='yellow',adjective='red',pronoun='pink',verb='green',adverb='blue',preposition='purple';//askatechteacher, incomplete
	
	/*
	 declension (dĭ-klĕnˈshən)►

    n.
    Linguistics In certain languages, the inflection of nouns, pronouns, and adjectives in categories such as case, number, and gender.
    n.
    Linguistics A class of words of one language with the same or a similar system of inflections, such as the first declension in Latin.
    n.
    A descending slope; a descent.

	*/
	
	//https://en.wikipedia.org/wiki/Grammatical_category
	//Viewing this table requires a text editor with support for elastic tabstops (eg. notepad++).
	let
replacement=0	,abbreviation=1	,color=2	,defaultcolor=2	,symbol=3	,replace=4	,expand=5	 ,allreplacements=	[ //category
["masculine"	,	,male	||'#89cff0'	,'♂'	,'m'	,["der","el","los","un"]	],//gender //baby blue
["feminine"	,	,female	||'#ffb6c1'	,'♀'	,'f'	,["die","la","las","una"]	],//gender //baby pink
["neuter"	,	,neuter	||'#fdfd96'	,'⚲'	,'neuter'	,["das","lo"]	],//gender //baby yellow //[ ,"the","an"]
["noun"	,	,noun	||'blue'	,'🤖'	,'n'	,	],//part of speech
["pronoun"	,	,pronoun	||'purple'	,'👤'	,'pron'	,	],//part of speech
["verb"	,	,verb	||'red'	,'🏃'	,'v'	,	],//part of speech SVO
["adjective"	,	,adjective	||'green'	,'👽'	,'adj'	,	],//part of speech
["adverb"	,	,adverb	||'yellow'	,'🐌'	,'adv'	,	],//part of speech
["article"	,	,article	||'brown'	,'📰'	,'art'	,	],//part of speech
["preposition"	,	,preposition	||'orange'	,'→'	,'prep'	,	],//part of speech
["conjunction"	,	,conjunction	||'gray'	,'+'	,'conj'	,	],//part of speech
["interjection"	,	,interjection	||'pink'	,'¡'	,'intj'	,	],//part of speech
["auxiliary"	,	,auxiliary	||'green'	,'<u>👍</u>'	,'aux'	,	],//type of verb
["intransitive"	,	,intransitive	||'red'	,'🚫'	,'int'	,	],//type of verb
["transitive"	,	,transitive	||'yellow'	,'🔴'	,'trans'	,	],//type of verb
["subject"	,	,noun	||'blue'	,'⚽→'	,'suj'	,	],//grammar? SVO
["object"	,	,noun	||'blue'	,'→⚽'	,'obj'	,	],//grammar? SVO
["number"	,	,number	||'green'	,'#'	,'num'	,	],//number //green like money
["first"	,	,'light'	+number	,'#'	,'1st'	,	],//person/declension/number
["second"	,	,	number	,'#'	,'2nd'	,	],//person/declension/number
["third"	,	,'dark'	+number	,'#'	,'3rd'	,	],//person/declension/number
//["first person"	,	,person	||'purple'	,'👤'	,'1st person'	,	],//person
//["second person"	,	,person	||'purple'	,'👤👤'	,'2nd person'	,	],//person
//["third person"	,	,person	||'purple'	,'👤👤👤'	,'3rd person'	,	],//person
["person"	,	,person	||'purple'	,'👤'	,'person'	,	],//person
["singular" 	,	,number	||'green'	,'#'	,'singular'	,	],//number
["plural"	,	,number	||'green'	,'#'	,'plural'	,	],//number
["dual" 	,	,number	||'green'	,'#'	,'dual'	,	],//number
["trial" 	,	,number	||'green'	,'#'	,'trial'	,	],//number
["paucal" 	,	,number	||'green'	,'#'	,'paucal'	,	],//number
["uncountable" 	,	,number	||'green'	,'#'	,'uncountable'	,	],//number
["partitive" 	,	,number	||'green'	,'#'	,'partitive'	,	],//number
["inclusive" 	,	,number	||'green'	,'#'	,'inclusive'	,	],//number
["exclusive" 	,	,number	||'green'	,'#'	,'exclusive'	,	],//number
["familiar"	,	,pronoun	||'purple'	,'👤'	,'familiar'	,	],//formality
["informal"	,	,pronoun	||'purple'	,'👤'	,'informal'	,	],//formality
//["unfamiliar"	,	,pronoun	||'purple'	,'🧟'	,'unfamiliar'	,	],//formality?
["formal"	,	,pronoun	||'purple'	,'🧟'	,'formal'	,	],//formality
["past"	,	,tense	||'tan'	,'←'	,'past'	,	],//tense 
["present"	,	,tense	||'tan'	,'↓'	,'present'	,	],//tense 
["future"	,	,tense	||'tan'	,'→'	,'future'	,	],//tense
["future-in-the-past"	,	,tense	||'tan'	,'↩'	,'future-in-the-past'	,	],//tense
["simple"	,	,aspect	||'tan'	,'→'	,'simple'	,	],//aspect //clock color
["continuous"	,	,aspect	||'tan'	,'⇴'	,'cont'	,	],//aspect
["perfect"	,	,aspect	||'tan'	,'🌟'	,'perfect'	,	],//aspect //perfect continuous
["tense"	,	,tense	||'tan'	,'⏰'	,'tense'	,	],//tense
["declension"	,	,declension 	||'blue'	,'🍂'	,'declension'	,	],//declension?
["particle"	,	,noun	||'blue'	,'?'	,'particle'	,	],//particle?
["normative"	,	,normative	||'blue'	,'?'	,'norm'	,	],//normal?
["nominative"	,	,case_	||'blue'	,'⚽→💼'	,'nom'	,	],//case, Subject of a finite verb
["accusative"	,	,case_	||'blue'	,'→⚽💼'	,'acc'	,	],//case, Direct object of a transitive verb
["dative"	,	,case_	||'blue'	,'→⚽→👤💼'	,'dat'	,	],//case, Indirect object of a verb 
["ablative"	,	,case_	||'blue'	,'←💼→'	,'abl'	,	],//case, Movement away from 💥
["genitive"	,	,case_	||'blue'	,'🤳💼'	,'gen'	,	],//case, Possessor of another noun 
["vocative"	,	,case_	||'blue'	,'→👤💼'	,'voc'	,	],//case, Addressee
["locative"	,	,case_	||'blue'	,'📍💼'	,'loc'	,	],//case, Location, either physical or temporal 
["instrumental"	,	,case_	||'blue'	,'🔨💼'	,'ins'	,	],//case, A means or tool used or companion present in/while performing an action
["prefix"	,	,fix	||'blue'	,'+'	,'prefix'	,	],//agglutinative?
["infix"	,	,fix	||'blue'	,'+'	,'infix'	,	],//agglutinative?
["suffix"	,	,fix	||'blue'	,'+'	,'suffix'	,	],//agglutinative?
["ending"	,	,fix	||'blue'	,'+'	,'ending'	,	],//agglutinative?
['m'	,'n'	,''	||''	,''	,"nm"	,	],//abbreviations //putting these at the beginning breaks it
['f'	,'n'	,''	||''	,''	,"nf"	,	],//abbreviations
['neuter'	,'n'	,''	||''	,''	,"nn"	,	],//abbreviations
['aux'	,'v'	,''	||''	,''	,"va"	,	],//abbreviations
['int'	,'v'	,''	||''	,''	,"vi"	,	],//abbreviations
['trans'	,'v'	,''	||''	,''	,"vt"	,	] //abbreviations
//ending prefix suffix infix

//all ♂♀⚲genders
//noun ending, plural, genitive, all genders [feminine (1st declension) and masculine & neuter (2nd declension)]
//<b>lugubrious</b><i>&nbsp;adj.</i><div>(luh-'goo-bree-us)</div>
//al frente: frente a<br>frente (nmf)
	];
	
	c=function(_color){return (docolor ? '<span style="color:'+_color+'">' : '<span>')}; let k='</span>';//colorize part of speech
	s=function(_symbol){return (dosymbol ? _symbol : '')};//add symbol before part of speech
	var convert=function(part){
		//*
		for(var row=0; row<allreplacements.length; row++) {
			//if(part==allreplacements[row][abbreviation]) { //nm
			//	return convert(allreplacements[row][replacement])+convert(allreplacements[row][abbreviation]);
			//}
			if(allreplacements[row][expand]){ //der
				for(var rr=0; rr<allreplacements[row][expand].length; rr++) {
					if(part==allreplacements[row][expand][rr]) {
						return c(allreplacements[row][color])	+s(allreplacements[row][symbol])	+part+k;
					}
				}
			}
			if(part==allreplacements[row][replace] || part==allreplacements[row][replacement]) { //nm, //m, //masculine
				if(allreplacements[row][abbreviation]) { //nm
					return convert(allreplacements[row][replacement])+" "+convert(allreplacements[row][abbreviation]);
				} else { //m, //masculine
					return c(allreplacements[row][color])	+s(allreplacements[row][symbol])	+(doreplace ? allreplacements[row][replacement] : part)+k;
				}
			}
			//if(part==allreplacements[row][replace] || part==allreplacements[row][replacement]) { //m, //masculine
			//	return c(allreplacements[row][color])	+s(allreplacements[row][symbol])	+(doreplace ? allreplacements[row][replacement] : part)+k;
			//}
		}
		///alert('FIXME: include ('+part+') in _add_gender_symbol.js');
		return part;
		//*/
	}
	var convertparts=function(parts){// 'adj, pron' in 'cualquier (adj, pron)'
		var retvar='';
		parts=parts.split(' ');
		for(var j=0; j<parts.length; j++) {var part = parts[j];//foreach part of speech do
			if (part[part.length-1] === "."||part[part.length-1] === ",")part = part.slice(0,-1);//remove separators from 'adj, pron', 'pi. adv'
			retvar+=convert(part);
			//TODO: add spaces back
		}
		return retvar;
	}
	
	var elements = document.getElementsByClassName("gender"); for(var i=0; i<elements.length; i++) {var e = elements[i];//foreach element of class gender do
///		alert("found element");
		
		//* This(m) //just manually fix this
		if (doallwords) {
			//noun ending, plural, genitive, all genders [feminine (1st declension) and masculine & neuter (2nd declension)]
			//e.innerHTML.replace('&nbsp;',' ');
			//var words=e.innerHTML.split(" ");
			//var firstword=e.innerHTML.split("\b")[0]; //&nbsp;
			//var firstword=e.innerHTML.split("&nbsp;")[0]; //&nbsp;
			var words=e.innerHTML.split(/\s/);
			//noun ending, plural, nominative, masculine&nbsp;(2nd declension)
			var newwords="";
			for(var w=0; w<words.length; w++) {var word = words[w];
				if(w>0) newwords+=" ";
				
				// la palabra (f. n)] → la palabra f n
				let prefix='',_prefix='';
				while(true){ // [(word ?
					_prefix=word.substring(0,1); //first character
					if(	_prefix=='('||	
						_prefix=='['){	
							prefix=prefix+_prefix;
							word = word.substring(1,word.length);//everything but first character
					}else{	
						break;
					}
				}
				let suffix='',_suffix='';
				while(true){ //neuter (2nd declension)]
					_suffix = word.substring(word.length-1,word.length);//last character
					if(	_suffix==','||	
						_suffix=='.'||	
						_suffix==')'||	
						_suffix==']'){	
							suffix=_suffix+suffix;
							word = word.substring(0,word.length-1);//everything but last character
					}else{	
						break;
					}
				}
				
				newwords+=prefix+convert(word)+suffix
			}
			e.innerHTML=newwords;
		}
		//*/
		
		if (dofirstword) {
			//add color/symbol for 'la' in 'la palabra (nf)'
			var firstword=e.innerHTML.split(" ")[0];
			var restofwords=e.innerHTML.substring(firstword.length);
			//* //FIXME to get rid of below "der" code
			var firstworddone=false;
			for(var row=0; row<allreplacements.length; row++) {
				if(firstword==allreplacements[row][replace]) { //m
					e.innerHTML=c(allreplacements[row][color])	+s(allreplacements[row][symbol])	+allreplacements[row][replacement]+k+restofwords;
					//(doreplace ? allreplacements[row][replacement] : firstword)
					break;
				}
				if(allreplacements[row][expand]){ //der
					for(var rr=0; rr<allreplacements[row][expand].length; rr++) {
						if(firstword==allreplacements[row][expand][rr]) {
							e.innerHTML=c(allreplacements[row][color])	+s(allreplacements[row][symbol])	+firstword+k+restofwords;
							//(doreplace ? allreplacements[row][replacement] : firstword)
							firstworddone=true;break;
						}
					}
				}
				if(firstworddone)break;
			}
			//*/
		}
		
		
		if (dolastparen) {
		//color/symbol/expand 'nf' in 'la palabra (nf)'
		if (e.innerHTML.slice(-1)==')'){
			var p = e.innerHTML.lastIndexOf('(');	// index of '(' 	in 'la palabra (nf)'
			var parts=e.innerHTML.substring(p+1,e.innerHTML.length-1);	// 'nf' 	in 'la palabra (nf)'
			var previouswords=e.innerHTML.substring(0,p);	// 'la palabra (' 	in 'la palabra (nf)'
			//e.innerHTML=previouswords+'|'+part; //just a string test
			//somehow I lost a paren
			e.innerHTML=previouswords+"("+convertparts(parts)+")";
		}
		}
		
		if (dodotwords) {
		//catch adj. amatory adj.\n('am-uh-tohr-ee)
		//just convert from basic to another note type instead?
		}
		
		
//how many parts of speech are there?

//imp imperative
//intj interjection
//prefix
//punc punctuation
//suff suffix
//suf suffix

		//http://members.peak.org/~jeremy/dictionaryclassic/chapters/abbreviations.php
	}
}
///alert("javascript run");
addgendersymbol();
window.onload = function(){
	alert("window.onload");
	addgendersymbol();
}
body.onload = function(){
	alert("window.onload");
	addgendersymbol();
}
//either makes this work or crashes it to make it reload
$(document).ready(function()
{
    $(document).live("onchange",function()
    {
        // blah?
		alert("jquery live");
		addgendersymbol();
    });
});

/* testme
<script src="_add_gender_symbol.js"/>
<span class="gender">to be (norm) (v)</span><br>
<span class="gender">the (neuter art)</span><br>
<span class="gender">la palabra (nf)</span><br>
<span class="gender">der</span><br>
<span class="gender">die</span><br>
<span class="gender">das</span><br>
<span class="gender">der (m)</span><br>
<span class="gender">die (f)</span><br>
<span class="gender">das (n)</span><br>
<span class="gender">word (nm)</span><br>
<span class="gender">word (nf)</span><br>
<span class="gender">word (nn)</span><br>
<span class="gender">word (pron)</span><br>
<span class="gender">word (v)</span><br>
<span class="gender">word (va)</span><br>
<span class="gender">word (vi)</span><br>
<span class="gender">word (vt)</span><br>
<span class="gender">word (aux v)</span><br>
<span class="gender">word (int v)</span><br>
<span class="gender">word (trans v)</span><br>
<span class="gender">word (adj)</span><br>
<span class="gender">word (adv)</span><br>
<span class="gender">word (art)</span><br>
<span class="gender">word (prep)</span><br>
<span class="gender">word (conj)</span><br>
<span class="gender">word (intj)</span><br>
<span class="gender">cualquier (adj, pron)</span><br>

<span class="gender">word (pi)</span><br>
<span class="gender">word (pi. adv)</span><br>
<span class="gender">word (pi. prep)</span><br>
<span class="gender">word (pro pers suj)</span><br>
<span class="gender">word (pro pers.)</span><br>
*/

//Do I need to search the whole thing? Ignore the last character?
//what?, which?, how (adj)!

//copied from internet search
//nebulous (nĕbˈyə-ləs)
//adj.
//noun ending, singular, nominative, neuter and accusative, masculine & neuter (2nd declension)
//verb ending, 3rd person singular, present tense



		/*
		if(part=='m'	)return 'masculine'	;
		if(part=='f'	)return 'feminine'	;
//		if(part=='n'	)return 'neuter'	;
		if(part=='n'	)return 'noun'	;
//		if(part=='nf'	)return 'feminine noun'	;
//		if(part=='nm'	)return 'masculine noun'	;
//		if(part=='nn'	)return 'neuter noun'	;//regex split?
		if(part=='pron'	)return 'pronoun'	;
		if(part=='v'	)return 'verb'	;
//		if(part=='va'||part=='aux v'	)return 'auxiliary verb'	;//int v, trans v?
//		if(part=='vi'||part=='int v'	)return 'intransitive verb'	;
//		if(part=='vt'||part=='trans v'	)return 'transitive verb'	;
		if(part=='aux'	)return 'auxiliary'	;
		if(part=='int'	)return 'intransitive'	;
		if(part=='trans'	)return 'transitive'	;
		if(part=='adj'	)return 'adjective'	;
//		if(part=='adj'||part=='neuter adj'	)return 'adjective'	;//regex split?
		if(part=='adv'	)return 'adverb'	;
		if(part=='art'	)return 'article'	;
		if(part=='pi'	)return 'prepositional interjection?'	;
//		if(part=='pi. adv'	)return 'prepositional adverb?'	;//regex split?
//		if(part=='pi. prep'	)return 'prepositional preposition?'	;//regex split?
		if(part=='prep'	)return 'preposition'	;
		if(part=='conj'	)return 'conjunction'	;
		if(part=='intj'	)return 'interjection'	;
//	//	if(part=='pro pers suj'	)return 'pronoun persecution subject?'	;
//		if(part=='pro pers.'	)return 'pronoun persecution?'	;
		if(part=='suj'	)return 'subject'	;
		if(part=='obj'	)return 'object'	;
		//https://tamahaq.com/sil_parts_of_speech/nf/
		//*/
		
		/*
		if (match(part,"m"	)){return c(male)	+s('♂')	+x(part)+k	;}else	
		if (match(part,"f"	)){return c(female)	+s('♀')	+x(part)+k	;}else	
		if (match(part,"neuter"	)){return c(neuter)	+s('⚲')	+x(part)+k	;}else	
		if (match(part,"n"	)){return c(noun)	+s('🤖')	+x(part)+k	;}else	
		if (match(part,"pron"	)){return c(pronoun)	+s('👤')	+x(part)+k	;}else	
		if (match(part,"v"	)){return c(verb)	+s('🏃')	+x(part)+k	;}else	
		if (match(part,"adj"	)){return c(adjective)	+s('👽')	+x(part)+k	;}else	
//		if (match(part,"adv"	)){return c(adverb)	+s('💨')	+x(part)+k	;}else//quickly ran	
		if (match(part,"adv"	)){return c(adverb)	+s('🐌')	+x(part)+k	;}else//slowly ran	
		if (match(part,"art"	)){return c(article)	+s('📰')	+x(part)+k	;}else	
		if (match(part,"prep"	)){return c(preposition)	+s('→')	+x(part)+k	;}else	
		if (match(part,"conj"	)){return c(conjunction)	+s('+')	+x(part)+k	;}else	
		if (match(part,"intj"	)){return c(interjection)	+s('¡')	+x(part)+k	;}else	
		if (match(part,"aux"	)){return c(auxiliary)	+s('<u>👍</u>')	+x(part)+k	;}else//auxiliary verb→helping verb→ASL for help	
		if (match(part,"int"	)){return c(intransitive)	+s('🚫')	+x(part)+k	;}else	
		if (match(part,"trans"	)){return c(transitive)	+s('🔴')	+x(part)+k	;}else	
	//	if (match(part,"norm"	)){alert('FIXME: ('+part+')');return c(normative)	+s('?')	+x(part)+k	;}else	
		if (match(part,"num"	)){return c(number)	+s('#')	+x(part)+k	;}else	
	//	if (match(part,"pi"	)){alert('FIXME: ('+part+')');return c(pi)	+s('?')	+x(part)+k	;}else//loop	
//	//	if (match(part,"pro pers suj"	)){return convert('pro')	+convert('pers')	+convert('suj')	;}else//loop	
	//	if (match(part,"pro pers."	)){return convert('pro')	+convert('pers')		;}else//loop	
	//	if (match(part,"pi. adv"	)){return convert('pi')	+convert('adv')		;}else//loop	
	//	if (match(part,"pi. prep"	)){return convert('pi')	+convert('prep')		;}else//loop ignore period	
		if (match(part,"nm"	)){return convert('m')	+convert('n')		;}else	
		if (match(part,"nf"	)){return convert('f')	+convert('n')		;}else	
		if (match(part,"nn"	)){return convert('neuter')	+convert('n')		;}else	
//		if (match(part,"neuter art"	)){return convert('neuter')	+convert('art')		;}else//loop	
		if (match(part,"va"	)){return convert('aux')	+convert('v')		;}else	
		if (match(part,"vi"	)){return convert('int')	+convert('v')		;}else	
		if (match(part,"vt"	)){return convert('trans')	+convert('v')		;}else	
//		if (match(part,"aux v"	)){return convert('va')			;}else//loop	
//		if (match(part,"int v"	)){return convert('vi')			;}else//loop	
//		if (match(part,"trans v"	)){return convert('vt')			;}else//loop ignore comma	
//		if (match(part,"adj, pron"	)){return convert('adj')	+convert('pron')		;}else//loop through parts for part?	
		if (match(part,"suj"	)){return c(noun)	+s('⚽→')	+x(part)+k	;}else	
		if (match(part,"obj"	)){return c(noun)	+s('→⚽')	+x(part)+k	;}else	
		if (match(part,"familiar"	)){return c(pronoun)	+s('👤')	+x(part)+k	;}else//🧟 zombie for unfamiliar, 👤 bust for pronoun, person for famili	ar?
//		if (match(part,"unfamiliar"	)){return c(pronoun)	+s('🧟')	+x(part)+k	;}else
		if (match(part,"singular"	)){return c(number)	+s('1')	+x(part)+k	;}else
		if (match(part,"plural"	)){return c(number)	+s('#')	+x(part)+k	;}else
		//nominative
		//if (match(part,"accusative"	)){return c(number)	+s('🖚')	+x(part)+k	;}else
		//2nd declension
		//verb ending, 3rd person singular, present tense
		//past present future tense
		{
			alert('FIXME: include ('+part+') in _add_gender_symbol.js');
			return part;
		}
		*/
		
		
	/*x=function(part){
	//	return allreplacements[row][doreplace ? replace : type];}
		//*
		if(doreplace){
		
		for(var row=0; row<allreplacements.length; row++) {
			if(part==allreplacements[row][replace]) {
				//if(allreplacements[row][abbreviation]) {
				//	return allreplacements[row][abbreviation];
				//}
				return allreplacements[row][replacement];
			}
		}
		//
	}return part;};
	//*/
	//match=function(part,m) {return (part==m||part==x(m))}//match both (adj) and (adjective)
	
	
	
	
			/*
			if (firstword=="m"||firstword=="f"){
				e.innerHTML=convert(firstword)+restofwords;//expand m→masculine, f→feminine
			} else if (
			//if (
			firstword=="der"	||
			firstword=="el"	||
			firstword=="los"	||
			firstword=="un"	||
			firstword=="m"	){
				e.innerHTML=c(male)+s('♂')+firstword+k+restofwords;//expand this m→masculine, f→feminine?
			}else if (
			firstword=="die"	||
			firstword=="la"	||
			firstword=="las"	||
			firstword=="una"	||
			firstword=="f"	){
				e.innerHTML=c(female)+s('♀')+firstword+k+restofwords;
			}else if (
			firstword=="das"	||
			firstword=="the"	||
	//		firstword=="a"	||//spanish preposition becomes neuter?
			firstword=="an"	||
			firstword=="lo"	){
				e.innerHTML=c(neuter)+s('⚲')+firstword+k+restofwords;
			}
		//*/