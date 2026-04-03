import { useState, useEffect, useCallback, useRef } from "react";

// ─── EMBEDDED QUESTION BANK ──────────────────────────────────────────────────
let QUESTION_BANK = {"mc_questions": [{"id": "jumps_1", "category": "jumps", "type": "multiple_choice", "question": "Senior Women FS\n\nWhat is the verbal call if a skater executes the elements in the video during the Choreographic Sequence?", "options": {"A": "(There is no verbal call and these elements are not considered by the technical panel)", "B": "\"Single Axel, Single Axel, Single Axel, Sequence\"", "C": "\"Single Axel, Single Axel, + Sequence, Single Axel\"", "D": "\"Lutz no value, Single Axel, Single Axel, Single Axel, Sequence\"", "E": "\"Single Lutz, Single Axel, Single Axel, Single Axel, Sequence\"", "F": "\"Review\"", "G": "Listed single and double jumps included in the Choreographic Sequence will not be\u00c2\u00a0called and will not occupy an element\u00e2\u20ac\u2122s box."}, "correct": ["A"], "feedback": "Listed single and double jumps included in the Choreographic Sequence will not be\u00c2\u00a0called and will not occupy an element\u00e2\u20ac\u2122s box.", "video_url": "https://www.dropbox.com/scl/fi/rksri75kltoa66y1zl27c/ChSq.mp4?rlkey=cjxwcbfi3nd1xpvohlydntm1z&st=ptk2qk6i&dl=0"}, {"id": "jumps_2", "category": "jumps", "type": "multiple_choice", "question": "Preliminary Girls Free Skate\n\nWhat is the written element code for the element in this video?", "options": {"A": "1A<<+SEQ+1Lo*+A*", "B": "1A<<+COMBO+1Lo*+1A<<*", "C": "A+SEQ+1Lo*+1A<<*", "D": "A+COMBO+1Lo*+A*", "E": "A+COMBO", "F": "1A<<+SEQ", "G": "The first axel type jump only rotates half a revolution and doesn't meet the definition of a downgraded single axel, therefore is called an axel no value\n\nThe skater steps out with a transfer of weight and attempts a single loop followed by another axel type jump, indicating the correct code should be\u00c2\u00a0the executed jump before the mistake + sequence + the executed jump(s). The jumps after the mistake are marked with an *.\u00c2\u00a0\n\nThe final axel type jump rotates to 3/4 of a revolution, with the jump missing over 1/2 of revolutions (1A<<)."}, "correct": ["C"], "feedback": "The first axel type jump only rotates half a revolution and doesn't meet the definition of a downgraded single axel, therefore is called an axel no value\n\nThe skater steps out with a transfer of weight and attempts a single loop followed by another axel type jump, indicating the correct code should be\u00c2\u00a0the executed jump before the mistake + sequence + the executed jump(s). The jumps after the mistake are marked with an *.\u00c2\u00a0\n\nThe final axel type jump rotates to 3/4 of a revolution, with the jump missing over 1/2 of revolutions (1A<<).", "video_url": "https://www.dropbox.com/scl/fi/1iuwrax25qywlekg2gf58/Jump-1.mp4?rlkey=eo43ijb6gillhh6d1memogrch&st=mh3a5996&dl=0"}, {"id": "jumps_3", "category": "jumps", "type": "multiple_choice", "question": "Junior Women Short Program\n\nWhat is the written element code of the following jump combination:", "options": {"A": "3A+2T (Fall)", "B": "3A+3T<< (Fall)", "C": "3A+3T<<b1 (Fall)", "D": "3Ab1+3T<< (Fall)", "E": "2A+3T<< (Fall)", "F": "2A+2T (Fall)", "G": "The 3Tis missing at least half of a revolution (landed forward). The jump combination is not eligible for the triple-triple combination bonus because of the downgrade on the 3T. However, the 3A is eligible for the 3A bonus even with the 3T<<"}, "correct": ["D"], "feedback": "The 3Tis missing at least half of a revolution (landed forward). The jump combination is not eligible for the triple-triple combination bonus because of the downgrade on the 3T. However, the 3A is eligible for the 3A bonus even with the 3T<<", "video_url": "https://www.dropbox.com/scl/fi/4mtt6zjn86skg5sdy2fbc/Jump-11.mp4?rlkey=qqxn1p32t2ef6k7iknejnvbyh&st=mgocm0he&dl=0"}, {"id": "jumps_4", "category": "jumps", "type": "multiple_choice", "question": "Juvenile Girls Free Skate\n\nWhat is the final written element code that shows up on the protocol?", "options": {"A": "2Lz+2T+2Lo", "B": "2Lz+2T+2Lo*", "C": "2Lz+2T+2Lob1", "D": "2Lz+2T+COMBO+2Lo*", "G": "One jump combination at juvenile can consist of three jumps with a maximum of two double jumps and one single jump. If double axel or triple jump is part of the three-jump combination/sequence, then two other double jumps may be included."}, "correct": ["B"], "feedback": "One jump combination at juvenile can consist of three jumps with a maximum of two double jumps and one single jump. If double axel or triple jump is part of the three-jump combination/sequence, then two other double jumps may be included.", "video_url": "https://www.dropbox.com/scl/fi/u36z4kuh2efhf37dazuu9/Jump-5.mp4?rlkey=l6nyg59awa0laolc13yqqp82d&st=lu0iml7x&dl=0"}, {"id": "jumps_5", "category": "jumps", "type": "multiple_choice", "question": "Juvenile Girls Free Skate\n\nWhat is the verbal call for the element in this video?", "options": {"A": "Double Axel, Fall, +Sequence, Single Axel, Double Loop", "B": "Double Axel, Fall in Element, Single Axel, Double Loop", "C": "Double Axel, Fall, +Combo, Single Axel, Double Loop", "D": "Double Axel, Fall (remaining jumps are ignored)", "G": "*bonus isn't always said, can add in if we want specialists saying it as part of verbal call*\n\npage 1 of handbook says falls in elements are simply called \"fall\"\n\nnext jump is a single axel, so the call is '+ Sequence'"}, "correct": ["A"], "feedback": "*bonus isn't always said, can add in if we want specialists saying it as part of verbal call*\n\npage 1 of handbook says falls in elements are simply called \"fall\"\n\nnext jump is a single axel, so the call is '+ Sequence'", "video_url": "https://www.dropbox.com/scl/fi/99znow1nzbpsxqqrnwmpz/Jump-4.mp4?rlkey=r6psrn5lrbl6iy0yf1lcwcd9w&st=zu1sqkky&dl=0"}, {"id": "jumps_6", "category": "jumps", "type": "multiple_choice", "question": "What is the written code for the element in this video?", "options": {"A": "2T", "B": "3T<<", "C": "2T<<", "D": "1T", "E": "T", "F": "T*"}, "correct": ["C"], "feedback": "", "video_url": "https://www.dropbox.com/scl/fi/wf0hhpniblokyt6wamj98/Jump-3.mp4?rlkey=ceeqvudmpckna1xi5kp20tjuy&st=zzx3e1mq&dl=0"}, {"id": "jumps_7", "category": "jumps", "type": "multiple_choice", "question": "What is the written code for the element in this video?", "options": {"A": "2F+1Eu+2S", "B": "2F+Eu+2S", "C": "2F+1Eu<+2S", "D": "2F+1Eu<<+2S", "G": "An Euler, when used in combinations between two listed jumps, becomes a listed jump (1Eu) with the value indicated in the SOV. Single Euler (1Eu) missing half a revolution or more will be considered as downgraded. In this case the judges will apply the reduction for a downgraded jump (<<). If the Single Euler is missing less than half a revolution, it will not be considered as under-rotated (<) or as landed on the quarter (q) by the Technical panel."}, "correct": ["D"], "feedback": "An Euler, when used in combinations between two listed jumps, becomes a listed jump (1Eu) with the value indicated in the SOV. Single Euler (1Eu) missing half a revolution or more will be considered as downgraded. In this case the judges will apply the reduction for a downgraded jump (<<). If the Single Euler is missing less than half a revolution, it will not be considered as under-rotated (<) or as landed on the quarter (q) by the Technical panel.", "video_url": "https://www.dropbox.com/scl/fi/9wkuu2lly8xa3u3cqbixc/Jump-8.mp4?rlkey=4huh4nhj0x130gilmhxmgahsr&st=o6o7h3lo&dl=0"}, {"id": "jumps_8", "category": "jumps", "type": "multiple_choice", "question": "Novice Women SP\n\nWhat is the written code for the element in this video?", "options": {"A": "2Lz+2Lo<", "B": "2Lz!+2Lo<", "C": "2Lze+2Lo<", "G": "Goal is to focus on the edge call for the Lutz"}, "correct": ["C"], "feedback": "Goal is to focus on the edge call for the Lutz", "video_url": "https://www.dropbox.com/scl/fi/l9i10aa16bqc0iqw1kkcg/Jump-7.mp4?rlkey=8770bm9h4nhsqvvavdwdcfr9y&st=mizs4370&dl=0"}, {"id": "jumps_9", "category": "jumps", "type": "multiple_choice", "question": "Novice Men Free Skate\n\nWhat is the verbal call for the element in this video?", "options": {"A": "Double Axel, Bonus, Double Toe", "B": "Double Axel, Double Toe", "C": "Double Axel, Double Toeloop", "D": "Double Axel, Bonus, Double Toeloop", "E": "Double Axel, + Combo, Double Toe", "F": "Double Axel, + Combo, Double Toeloop", "G": "Proper language is Double Toe, not Double Top Loop.\n\nIn case of a touch down with the free foot without weight transfer and up to 2 three turns or no turns between the jumps in a combination, the element remains a jump combination (however Judges will reduce the GOE because of error).\u00c2\u00a0 \u00c2\u00a0\n\nIn case of more than 1 full revolution on the ice, the call will be the jumps performed prior to this revolution + COMBO + all the next jumps with an *.\u00c2"}, "correct": ["B"], "feedback": "Proper language is Double Toe, not Double Top Loop.\n\nIn case of a touch down with the free foot without weight transfer and up to 2 three turns or no turns between the jumps in a combination, the element remains a jump combination (however Judges will reduce the GOE because of error).\u00c2\u00a0 \u00c2\u00a0\n\nIn case of more than 1 full revolution on the ice, the call will be the jumps performed prior to this revolution + COMBO + all the next jumps with an *.\u00c2", "video_url": "https://www.dropbox.com/scl/fi/4wqjindgwn56gzkxfo3z9/Jump-9.mp4?rlkey=h65hx5m15sh13haxjsbbpdvyv&st=uaj8nwrp&dl=0"}, {"id": "jumps_10", "category": "jumps", "type": "multiple_choice", "question": "In a junior man's singles short program a skater does the following, double lutz wrong edge and under rotated. What is the correct code that will appear on the final protocol?", "options": {"A": "2Lze<", "B": "2Lze<*", "C": "2Lze< + COMBO", "D": "2Loe<*"}, "correct": ["C"], "feedback": "", "video_url": null}, {"id": "jumps_11", "category": "jumps", "type": "multiple_choice", "question": "An Intermediate Man starts the following at 3 minutes and 12 seconds in his Free Skate:\n\nSingle Eule Double Flip Triple Loop, under rotated\nWhat will appear on the final protocol?", "options": {"A": "1Eu + 2F + 3Lo<", "B": "2F + 3Lo<b1", "C": "This will not be on the protocol", "D": "2F + 3Lo<"}, "correct": ["C"], "feedback": "", "video_url": null}, {"id": "jumps_12", "category": "jumps", "type": "multiple_choice", "question": "What is the correct written order of the jump modifiers?", "options": {"A": "Rotation, Edge, Bonus", "B": "Edge, Rotation, Bonus", "C": "Bonus, Rotation, Edge", "D": "Edge, Bonus, Rotation"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "jumps_13", "category": "jumps", "type": "multiple_choice", "question": "A Novice Women skater executes the following jumps in her free skate:\n\n3T + 2T; 3Lz + 3T<; 3S; 3Lo; 2A; 2A + 3Lo; 2F\nHow many bonus points does the skater achieve?", "options": {"B": "1", "C": "2", "D": "3", "E": "4", "F": "5", "G": "First 3T, First 3Lz, 2.0 reportoire bonus, 2A followed immediately by triple. (No triple triple bonus because 3T is under)"}, "correct": ["F"], "feedback": "First 3T, First 3Lz, 2.0 reportoire bonus, 2A followed immediately by triple. (No triple triple bonus because 3T is under)", "video_url": null}, {"id": "jumps_14", "category": "jumps", "type": "multiple_choice", "question": "A Junior man in the short program executes the following jumps:\nTriple Axel; Triple Flip; Triple Toe + Triple Toe\nWhat will appear on the final protocol?", "options": {"A": "1. 3A\n2. 3F\n3. 3T + 3T", "B": "1. 3A\n2. 3F*\n3. 3T + 3T", "C": "1. 3Ab1\n2. 3F*\n3. 3T + 3T", "D": "1. 3Ab1\n2. 3F*\n3. 3T + 3Tb1"}, "correct": ["D"], "feedback": "", "video_url": null}, {"id": "jumps_15", "category": "jumps", "type": "multiple_choice", "question": "In a FS, a skater executes a double flip, single Euler, three-turn on the same foot, and a single axel. What will appear on the final protocol?", "options": {"A": "2F + 1A + SEQ", "B": "2F + 1Eu + 1A + SEQ", "C": "2F + 1Eu + COMBO + 1A*", "D": "2F + 1Eu + 1A"}, "correct": ["D"], "feedback": "", "video_url": null}, {"id": "jumps_16", "category": "jumps", "type": "multiple_choice", "question": "A Senior woman executes the following jumps in her SP:\n2A; 2T; 3Lz (fall)\nWhat codes are on the final protocol?", "options": {"A": "1. 2A\n2. 2T*\n3. 3Lz + COMBO", "B": "1. 2A\n2. 2T + COMBO\n3. 3Lz", "C": "1. 2A\n2. 2T\n3. 3Lz", "D": "1. 2A + COMBO\n2. 2T*\n3. 3Lz"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "jumps_17", "category": "jumps", "type": "multiple_choice", "question": "A Novice Man does the following jumps in this order for the short program:\n2A, 3S+1Lo, 3Lz+3Lo, how should they appear on the final protocol?", "options": {"A": "2A, 3S+1Lo, 3Lz+3Lo", "B": "2A*, 3S+1Lo, 3Lz+3Lo", "C": "2A, 3S+1Lo, 3Lz*+3Lo*", "D": "2A, 3S+COMBO, 3Lz*+3Lo*", "E": "2A, 3S+1Lo*, 3Lz+3Lo*", "F": "2A, 3S+1Lo*, 3Lz+COMBO"}, "correct": ["E"], "feedback": "", "video_url": null}, {"id": "jumps_18", "category": "jumps", "type": "multiple_choice", "question": "How many different double jumps may be repeated in a Juvenile Boys Free Skate?", "options": {"A": "One", "B": "Two", "C": "Three", "D": "Four", "E": "Five"}, "correct": ["C"], "feedback": "", "video_url": null}, {"id": "jumps_19", "category": "jumps", "type": "multiple_choice", "question": "Select the correctly vetting program for an Intermediate Men's free skate including bonuses if applicable.", "options": {"A": "3Sb1\n2Lz+2T\n3Lo<<\nStSqB\n2A+1Eu+3Sb1\nCCoSp3\n3Lo<b1+1Lo\n2A*\nCCSp2*", "B": "3Sb1\n2Lz+2T\n3Lo<<\nStSqB\n2A+1Eu+3S\nCCoSp3\n3Lo<b1+1Lo\n2A\nCCSp2*", "C": "3S\n2Lz+2T\n3Lo<<\nStSqB\n2A+1Eu+3S\nCCoSp3\n3Lo<+1Lo\n2A\nCCSp2", "D": "3Sb1\n2Lz+2T\n3Lo<<b1\nStSqB\n2Ab1+1Eu+3Sb1\nCCoSp3\n3Lo<+1Lo\n2Ab1\nCCSp2"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "jumps_20", "category": "jumps", "type": "multiple_choice", "question": "What is the abbreviation in the Free Skating for the following executed element: Euler + Double Flip", "options": {"A": "1Eu+2F", "B": "2F", "C": "Eu+2F", "D": "Eu*+2F"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "jumps_21", "category": "jumps", "type": "multiple_choice", "question": "What is the written element code of the following jump combination:\nDouble Flip, Euler (under rotated), Double Salchow", "options": {"A": "2F+1Eu<+2S", "B": "2F+1Eu+2S", "C": "2F+Eu+2S", "D": "2F+Eu*+2S"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "jumps_22", "category": "jumps", "type": "multiple_choice", "question": "Senior Men SP:\u00a0 An athlete performs a quadruple toe loop and falls. Later in the program he performs a clean quadruple Salchow with an intentional undisturbed landing edge. Where will the combination be assigned?", "options": {"A": "4T", "B": "4S", "C": "Neither", "D": "Both"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "jumps_23", "category": "jumps", "type": "multiple_choice", "question": "In the Short Program, if a skater does more than 1 full revolution on the ice between the first and second jump, what is the call?", "options": {"A": "Jump+Jump", "B": "Jump+Jump*", "C": "Jump+Combo", "D": "Jump+Combo+Jump*", "E": "Jump+Combo+Jump"}, "correct": ["D"], "feedback": "", "video_url": null}, {"id": "jumps_24", "category": "jumps", "type": "multiple_choice", "question": "In the Short Program, if a skater falls or steps out of a jump and immediately after that executes another jump, how will the element be called?", "options": {"A": "Jump+Jump", "B": "Jump+Jump*", "C": "Jump+Seq+Jump*", "D": "Jump+Combo+Jump*", "E": "Jump+Combo+Jump"}, "correct": ["D"], "feedback": "", "video_url": null}, {"id": "jumps_25", "category": "jumps", "type": "multiple_choice", "question": "What is the correct written order of the jump modifiers?", "options": {"A": "Rotation, Edge, Bonus", "B": "Edge, Rotation, Bonus", "C": "Bonus, Rotation, Edge", "D": "Edge, Bonus, Rotation"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "jumps_26", "category": "jumps", "type": "multiple_choice", "question": "A skater may perform up to three jump sequences in a Free Skate Program.", "options": {"B": "True"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "jumps_27", "category": "jumps", "type": "multiple_choice", "question": "In the short program the skater executes a single loop in the step sequence. This jump is called.", "options": {"B": "True"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "jumps_28", "category": "jumps", "type": "multiple_choice", "question": "In the Short Program the skater executes a double loop in the step sequence. This jump is called.", "options": {"B": "True"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "jumps_29", "category": "jumps", "type": "multiple_choice", "question": "A Senior Man completes the following jumps in the short program.\u00a0 Where would you place +combo?\n\nTriple axel step out\nTriple toe step out\nTriple lutz fall", "options": {"A": "3A", "B": "3T", "C": "3Lz"}, "correct": ["C"], "feedback": "", "video_url": null}, {"id": "jumps_30", "category": "jumps", "type": "multiple_choice", "question": "Senior SP: A double lutz followed by two three turns without weight transfer into a double toe loop is performed. What is the final code of this element?", "options": {"A": "2Lz+2T*", "B": "2Lz+COMBO+2T*", "C": "2Lz+SEQ+2T", "D": "2LZ+2T"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "jumps_31", "category": "jumps", "type": "multiple_choice", "question": "In a junior men's short program event, a skater falls on an underrotated triple axel.\u00a0 How will the element appear on the protocol?", "options": {"A": "3A< with a fall tag", "B": "3A<< with a fall tag", "C": "3A<b1 with a fall tag", "D": "3A<b2 with a fall tag", "E": "3A* with a fall tag"}, "correct": ["C"], "feedback": "", "video_url": null}, {"id": "jumps_32", "category": "jumps", "type": "multiple_choice", "question": "In what level(s) is a bonus awarded for a quadruple jump?", "options": {"A": "Intermediate and above free skate events", "B": "Junior free skate", "C": "Junior short program and free skate events", "D": "Novice and above short program and free skate events", "E": "Intermediate and novice free skate, junior short program and free skate events"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "jumps_33", "category": "jumps", "type": "multiple_choice", "question": "A skater executes the following in the Free Skate: double axel, fall, single toe loop.\u00c2\u00a0 What is the correct code?", "options": {"A": "2A+1T", "B": "2A+SEQ+1T*", "C": "2A+1T*", "D": "2A+COMBO+1T*"}, "correct": ["D"], "feedback": "", "video_url": null}, {"id": "jumps_34", "category": "jumps", "type": "multiple_choice", "question": "During the review process, which reviews can be watched in slow motion?", "options": {"A": "Jump landings for rotation", "B": "Jump take offs for rotation", "C": "Jump take offs for correct edges", "D": "All of the above", "E": "A and C only"}, "correct": ["E"], "feedback": "", "video_url": null}, {"id": "jumps_35", "category": "jumps", "type": "multi_select", "question": "Under which circumstances is a single jump ignored by the tech panel?", "options": {"A": "Euler executed seperately", "B": "A double, triple, or quad popped to a single", "C": "In the ChSq", "D": "In the pChSq in the Juvenile FS", "E": "1/2 loop performed as the first jump of a combination or sequence", "F": "In the SP step sequence"}, "correct": ["A", "C", "E", "F"], "feedback": "", "video_url": null}, {"id": "choreo_1", "category": "choreo", "type": "multiple_choice", "question": "Jumps up to 2 revolutions can be included in the choreographic sequence. Will these jumps be called and occupy a box?", "options": {"A": "No", "B": "Yes"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "choreo_2", "category": "choreo", "type": "multiple_choice", "question": "What is the correct way to call the Choreographic Sequence if the sequence does not fulfill the basic requirements?", "options": {"A": "Choreo Sequence Zero", "B": "Choreo Sequence Not Confirmed", "C": "Choreo Sequence No Value"}, "correct": ["C"], "feedback": "", "video_url": null}, {"id": "choreo_3", "category": "choreo", "type": "multiple_choice", "question": "In singles events, a Choreographic Sequence is included only in Senior Women and Senior Men Free Skating.", "options": {"B": "True"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "choreo_4", "category": "choreo", "type": "multiple_choice", "question": "To be \"confirmed\", a Choreographic Sequence __________. (Check all that apply if applicable)", "options": {"A": "Must cover Full Ice", "B": "Consists of at least 2 different movements like spirals, arabesques, spread eagles, Ina Bauers, and hydroblading", "C": "Consists of at least 2 different movements like spirals, arabesques, spread eagles, Ina Bauers, and hydroblading (each held for 3\u00a0seconds each)", "D": "Ends the moment any spin is commenced"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "choreo_5", "category": "choreo", "type": "multi_select", "question": "Under which circumstances is a single jump ignored by the tech panel?", "options": {"A": "Euler executed seperately", "B": "A double, triple, or quad popped to a single", "C": "In the ChSq", "D": "In the pChSq in the Juvenile FS", "E": "1/2 loop performed as the first jump of a combination or sequence", "F": "In the SP step sequence", "G": "In the FS Step sequence", "H": "A skater executes a listed jump, followed by an attempt of another listed jump"}, "correct": ["A", "C", "E", "F", "G"], "feedback": "In the FS Step sequence", "video_url": null}, {"id": "choreo_6", "category": "choreo", "type": "multiple_choice", "question": "In Senior FS the step sequence must come before the ChSq", "options": {"A": "True"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "choreo_7", "category": "choreo", "type": "multiple_choice", "question": "A spiral must be included in the ladies ChSq for the sequence to be confirmed", "options": {"A": "True"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "choreo_8", "category": "choreo", "type": "multi_select", "question": "For a choreographic sequence", "options": {"A": "3T is called", "B": "SSp3 is called", "C": "The sequence must be visible. Any pattern is allowed"}, "correct": ["A", "C"], "feedback": "", "video_url": null}, {"id": "choreo_9", "category": "choreo", "type": "multi_select", "question": "Choreographic sequences", "options": {"A": "A 2T is called and counted", "B": "A 2A is called and counted", "C": "The ChSq ends when the 2T is executed", "D": "The ChSq ends when the 2A is executed"}, "correct": ["B", "D"], "feedback": "", "video_url": null}, {"id": "choreo_10", "category": "choreo", "type": "multi_select", "question": "The choreographic sequence ends when the following occurs", "options": {"A": "When the entire pattern ends at the opposing wall", "B": "When a 1A is performed", "C": "When a 3S is performed", "D": "When a 2Lz is performed", "E": "When a leveled step begins"}, "correct": ["C", "E"], "feedback": "", "video_url": null}, {"id": "spins_1", "category": "spins", "type": "multi_select", "question": "Which spin(s) will be considered a \"flying spin\"? Check all that apply.", "options": {"A": "FCoSp", "B": "FCCoSp", "C": "FSSp", "D": "FCSSp", "E": "All of the above"}, "correct": ["C"], "feedback": "", "video_url": null}, {"id": "spins_2", "category": "spins", "type": "multi_select", "question": "The following entries can elevate the level of a spin. (Check all that apply)", "options": {"A": "Difficult Entrance", "B": "Difficult Flying Entry", "C": "Backward Entry", "D": "Forward Entry"}, "correct": ["A", "B"], "feedback": "", "video_url": null}, {"id": "spins_3", "category": "spins", "type": "multi_select", "question": "Which of the following spins may receive a \"V\"? (Select all that apply)", "options": {"A": "FSSp", "B": "FCCoSp", "C": "CCoSp", "D": "CCSp", "E": "LSp", "F": "SSp"}, "correct": ["A", "B", "C", "D"], "feedback": "", "video_url": null}, {"id": "spins_4", "category": "spins", "type": "multi_select", "question": "A \"V\" can be assigned to which spins? (check all that apply)", "options": {"A": "FSSp3", "B": "LSp2", "C": "FCoSp No Value", "D": "FCCSp4", "E": "CCoSp Base"}, "correct": ["A", "E"], "feedback": "", "video_url": null}, {"id": "spins_5", "category": "spins", "type": "multiple_choice", "question": "A Toe Arabian can be used to change feet in the short program will count as a feature.", "options": {"A": "Yes, for a change of foot executed by a jump feature", "B": "Yes, but it will not increase the level of the spin", "C": "Yes, but it will decrease the spin by one level", "D": "No, and it will cause the spin to be given No Value"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "spins_6", "category": "spins", "type": "multiple_choice", "question": "Junior SP: FCSp is required. An athlete executes a traditional FSSp and achieves three features. The following procedure should occur.", "options": {"A": "TS calls \"Flying, Sit Spin, Level 3\"", "B": "TS calls \"Flying, Sit Spin, No Level\"", "C": "TS calls \"Flying, Camel Spin, No Level\"", "D": "TS calls \"Flying Spin, No Level\""}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "spins_7", "category": "spins", "type": "multiple_choice", "question": "Juvenile FS: athlete clearly attempts a CCoSp and completes 3 revolutions on each foot. A Sit Forward (SF) position and a Non-Basic Position (NBP) are achieved on one foot and a basic sit position is achieved on the other foot.\u00a0 What is the call?", "options": {"A": "CCoSp No Value", "B": "CSSp Level 1", "C": "CSSp Level 2", "D": "CCoSpBV"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "spins_8", "category": "spins", "type": "multi_select", "question": "An athlete performs a Difficult Entrance into a regular Flying Camel Entry. What will occur? (check all the apply)", "options": {"A": "Difficult Entrance will be evaluated for a level feature", "B": "Difficult Flying Entry will be evaluated for a level feature", "C": "Both features will be evaluated for a level feature", "D": "Neither feature will be evaluated for a level feature", "E": "Difficult entrance in this case is not considered as used."}, "correct": ["D", "E"], "feedback": "", "video_url": null}, {"id": "spins_9", "category": "spins", "type": "multi_select", "question": "Which spin(s) can be considered a \"Flying Spin\"?\u00a0 Check all that apply.", "options": {"A": "FLSp", "B": "FCoSp", "C": "FSSp", "D": "FCSSp", "E": "All of the above"}, "correct": ["A", "C"], "feedback": "", "video_url": null}, {"id": "spins_10", "category": "spins", "type": "multiple_choice", "question": "Novice Ladies FS:\u00a0 Flying Sit is performed with difficult air position and visible air, the intended BP was achieved within one revolution but not held for two consecutive revolutions after landing.\u00a0The following procedure should occur?", "options": {"A": "Spin is marked with a V", "B": "The difficult variation of a flying entry is not awarded", "C": "The difficult variation of the flying entry is awarded", "D": "None of the above"}, "correct": ["C"], "feedback": "", "video_url": null}, {"id": "spins_11", "category": "spins", "type": "multi_select", "question": "Eight Revolutions may be awarded in two different spins, if executed in a different basic position and/or in a different difficult variation for which levels? (choose all that apply)", "options": {"A": "Juvenile", "B": "Intermediate", "C": "Novice", "D": "Junior", "E": "Senior"}, "correct": ["A", "B"], "feedback": "", "video_url": null}, {"id": "spins_12", "category": "spins", "type": "multi_select", "question": "Difficult entrance into a spin (feature #5): check all that apply", "options": {"A": "Entrance must have a significant impact on the balance, control and execution of the spin", "B": "Must be performed on the first spinning foot", "C": "The intended position must be reached within the first 2 revolutions.\u00a0This position can be basic or (for spin combinations only) non-basic.", "D": "If the entrance of a spin is not considered by the TP as \"difficult\", it is considered as a transition and the \"difficult entrance\" feature can still be awarded in a later spin."}, "correct": ["A", "B", "C", "D"], "feedback": "", "video_url": null}, {"id": "spins_13", "category": "spins", "type": "multi_select", "question": "What is true about a Flying Spin?\u00a0(Check all that apply)", "options": {"A": "Any spin that has a Difficult flying entry", "B": "Name of the flying spin corresponds to its landing position", "C": "Spin which has a flying entry with a change of foot and one position", "D": "Spin which has a flying entry\u00a0with no change of foot or position"}, "correct": ["B", "D"], "feedback": "", "video_url": null}, {"id": "spins_14", "category": "spins", "type": "multi_select", "question": "For Spins a \"V\" can be awarded for the following situations:\u00a0(Check all that apply)", "options": {"A": "No clear visible jump in a Flying Spin", "B": "Only one basic position in a Spin Combination", "C": "In any change foot spin with less than 3 revolutions on one foot in the Free Skate", "D": "In Spin in one position with change of foot: less than 2 revolutions in a basic position on one foot in the Free Skate."}, "correct": ["A", "C", "D"], "feedback": "", "video_url": null}, {"id": "spins_15", "category": "spins", "type": "multi_select", "question": "For a change of foot executed by a jump: (Check all that apply)", "options": {"A": "If a Toe Arabian is performed in the Short Program it is considered an error and will not count as a feature", "B": "Requires significant strength", "C": "A basic position must be reached within the first 2 revolutions after the landing", "D": "A basic position must be reached within 2 revolutions and held for 2 revolutions after the landing"}, "correct": ["B", "C"], "feedback": "", "video_url": null}, {"id": "spins_16", "category": "spins", "type": "multi_select", "question": "For the entrance and exit of a spin: (Select all that apply)", "options": {"A": "Difficult entrance or difficult exit can be counted as one level feature", "B": "The exit out of the spin is defined as the last phase of the spin and does not include the phase immediately following the spin.", "C": "If the entrance or exit of a spin is not considered \"difficult\" by the Technical Panel, it is considered as a transition and the feature can still be awarded in a later spin.", "D": "2A is executed and called immediately after a spin.\u00a0 This is considered as a difficult exit of a spin."}, "correct": ["A", "C"], "feedback": "", "video_url": null}, {"id": "spins_17", "category": "spins", "type": "multi_select", "question": "Increase of speed can be awarded for the following positions: (Select all that apply)", "options": {"A": "Biellmann", "B": "Camel", "C": "Sit", "D": "Layback", "E": "All difficult variations of upright positions"}, "correct": ["A", "B", "C", "D"], "feedback": "", "video_url": null}, {"id": "spins_18", "category": "spins", "type": "multi_select", "question": "\"V\" sign can be awarded in which of the following situations: (Select all that apply)", "options": {"A": "No clear visible jump in Flying spin", "B": "Two basic positions in a Spin Combination", "C": "Any change foot spin in the Short Program with less than 3 revolutions on one foot\u00c2", "D": "Any Spin in one position with change of foot with less than 2 revolutions in a basic position on one foot in the Free Skate."}, "correct": ["A", "B", "D"], "feedback": "", "video_url": null}, {"id": "spins_19", "category": "spins", "type": "multi_select", "question": "Clear change of edge can be awarded for the following positions: (Select all that apply)", "options": {"A": "Biellmann", "B": "Camel", "C": "Sit (from backward inside to forward outside)", "D": "Layback", "E": "Difficult variation of an upright position"}, "correct": ["A", "B", "C", "D", "E"], "feedback": "", "video_url": null}, {"id": "spins_20", "category": "spins", "type": "multi_select", "question": "For feature 4: Difficult change of position on the same foot of a spin:", "options": {"A": "Requires significant strength, skill and control", "B": "The basic position must be achieved within two revolutions", "C": "May not include a jump", "D": "If the change is not considered difficult, it can be awarded later", "E": "The basic position after the change must be held for two revolutions"}, "correct": ["A", "C", "D", "E"], "feedback": "", "video_url": null}, {"id": "spins_21", "category": "spins", "type": "multi_select", "question": "Regarding difficult entrance of a spin: (Check all that apply.)", "options": {"A": "The intended basic spin position must be reached with the first 2 revolutions. The position can never by non-basic.", "B": "If the entrance is \"difficult\" and \"flying\" at the same time, only the \"flying\" feature can be awarded.", "C": "Must have a significant impact on the balance, control, and execution of the spin.", "D": "Only difficult entrance or difficult exit can be counted as a level feature."}, "correct": ["B", "C", "D"], "feedback": "", "video_url": null}, {"id": "spins_22", "category": "spins", "type": "multi_select", "question": "A Preliminary skater performs a CoSp, which of the following are correct?", "options": {"A": "All three basic positions required for level base", "B": "Max level 2", "C": "Two basic positions achieved will be assigned a \"V\""}, "correct": ["B", "C"], "feedback": "", "video_url": null}, {"id": "spins_23", "category": "spins", "type": "multi_select", "question": "The change of foot in a spin with both directions can originate in the following positions to be awarded.\u00a0Check all that apply.", "options": {"A": "Basic Upright Position", "B": "Non-Basic Position", "C": "Sit", "D": "Camel", "E": "Layback", "F": "Difficult Variation of an Upright"}, "correct": ["C", "D", "E", "F"], "feedback": "", "video_url": null}, {"id": "spins_24", "category": "spins", "type": "multi_select", "question": "In which positions can a skater be awarded the \"change of edge\" feature", "options": {"A": "Non-Basic Posititon", "B": "Difficult Variation of an Upright", "C": "Upright Position", "D": "Upright Layback", "E": "Camel", "F": "Any Sit Variation", "G": "Sit position from backward inside to forward outside edge"}, "correct": ["B", "D", "E", "G"], "feedback": "", "video_url": null}, {"id": "spins_25", "category": "spins", "type": "multi_select", "question": "Which of the following are considered the six \"mandatory features\" in spins that must have at least one of these to achieve a Level 4 Spins. Check all 6 that apply.", "options": {"A": "Difficult Change of Position", "B": "Clear Increase in Speed", "C": "Difficult Exit", "D": "Clear Change of Edge", "E": "Both Directions Immediately Following Each Other in Sit, Camel, Layback, or Difficult Upright", "F": "Difficult Entry", "G": "Difficult Variation of a Flying Entry", "H": "All Three Basic Positions on the Second Foot"}, "correct": ["A", "B", "C", "D", "E", "G"], "feedback": "", "video_url": null}, {"id": "spins_26", "category": "spins", "type": "multi_select", "question": "To receive credit for a difficult entry and difficult exit within a program, the following must be true. Check All that apply.", "options": {"A": "Must be executed in two different spins", "B": "Can be executed and awarded within the same spin", "C": "Movements must be of different nature", "D": "Movements can be of the same nature"}, "correct": ["A", "C"], "feedback": "", "video_url": null}, {"id": "spins_27", "category": "spins", "type": "multi_select", "question": "For Feature 12 (Difficult Blade Feature), what is true\n\n(Select all that apply)", "options": {"A": "Uses the blade in a way that has significant impact on the balance, control an execution of the spin", "B": "Can be executed in a Camel position", "C": "Can be executed in a sit position", "D": "Can be executed in a Layback position", "E": "Can be executed in a difficult variation of an Upright position", "F": "Must be clearly recognizable", "G": "Basic position has to be held for 2 revolutions before the blade feature", "H": "Can be used as a difficult change of position and count as an attempt of BOTH difficult blade feature and difficult change of position. Neither feature can be used again in a later spin", "I": "Can be used as a difficult exit, and will only be considered an attempt of a difficult exit and difficult blade feature can be used again in a later spin"}, "correct": ["A", "B", "C", "D", "F", "I"], "feedback": "", "video_url": null}, {"id": "spins_28", "category": "spins", "type": "multi_select", "question": "Which of the below statements is true about the Windmill/Illusion movement when the skater does not grab the blade?\n\n(Select all that apply)", "options": {"A": "Can be considered as a difficult entry", "B": "If attempted as a difficult entry, the windmill/illusion is considered as used", "C": "The movement must show physical strength or flexibility and have an effect on the balance of the main body core", "D": "Can be considered a difficult variation of a non-basic position when done three times in a row", "E": "Can be considered a difficult change of position", "F": "Can be considered a difficult exit", "G": "The skater can touch the ice with one or two hands and the feature is still counted", "H": "Windmill feature is counted as a feature only once in the program and only the first time it is attempted"}, "correct": ["B", "C", "D", "E", "H"], "feedback": "", "video_url": null}, {"id": "spins_29", "category": "spins", "type": "multi_select", "question": "Which of the below is true about the difficult exit feature\n\n(Select all that apply)", "options": {"A": "No change of foot is allowed", "B": "A difficult blade feature can be used as a difficult exit and then used again as a difficult blade feature in another spin\u00c2", "C": "Can be any movement that makes the exit significantly more difficult", "D": "Must have a significant impact on the balance, control, and execution of the spin", "E": "Can be started from the final windup of a spin in one position", "F": "Can be started from a non-basic position in combination spins"}, "correct": ["B", "C", "D", "F"], "feedback": "", "video_url": null}, {"id": "spins_30", "category": "spins", "type": "multi_select", "question": "Which of the following features cannot be executed at the same time with a used difficult variation?\n\n(Select all that apply)", "options": {"A": "One clear change of position backwards-sideways or reverse, at least 2 rev. in each position (counts also if the Layback position is a part of any other spin)\u00c2", "B": "Change of foot executed by a jump", "C": "Jump within a spin without changing feet", "D": "Difficult change of position on the same foot", "E": "Difficult entrance", "F": "Difficult exit", "G": "Clear change of edge in sit (only from backward inside to forward outside), camel, Layback, Biellmann or difficult variation of an upright position\u00c2", "H": "Both directions immediately following each other in sit, camel, Layback or difficult variation of an upright position", "I": "Clear increase of speed in camel, sit, Layback, Biellmann or difficult variation of an upright position (except in crossfoot spin)\u00c2", "J": "At least 8 rev. without changes in position/variation, foot or edge (camel, layback, difficult variation of any basic position or for combinations only non-basic position)\u00c2"}, "correct": ["A", "D", "G", "H", "I", "J"], "feedback": "", "video_url": null}, {"id": "spins_31", "category": "spins", "type": "multi_select", "question": "Which of the following is true about feature 9, clear increase of speed\n\n(Select all that apply)", "options": {"A": "Can be achieved within an established camel, sit, layback, Biellmann, and difficult variation of upright positions (except for crossfoot spin)", "B": "Valid as a feature if the increase of speed happens while going from one basic position to another basic position", "C": "It is allowed to perform increase of speed going from layback to sideways position or vice versa as long as the skater does not execute the change by rising to an upright position.\u00c2\u00a0\u00c2", "D": "Increase of speed can occur within a basic camel, sit, or layback so long as the skater doesn\u00e2\u20ac\u2122t come out of the basic position when making the change"}, "correct": ["A", "C", "D"], "feedback": "When performing the 8 revs in conjunction with the increase of speed, the 8 revs can be mixed throughout the slow and fast phase of the spin)", "video_url": null}, {"id": "spins_32", "category": "spins", "type": "multiple_choice", "question": "The correct code for the singles element: combination spin with a change of foot and a flying entry, level 1 is:", "options": {"A": "CCoSp1", "B": "FCCoSp1", "C": "CCoFSp1", "D": "FCoSp1"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "spins_33", "category": "spins", "type": "multiple_choice", "question": "The correct code for the singles element: Layback spin with change of foot level 4 is:", "options": {"A": "LSp4", "B": "CFLSp4", "C": "CLSp4", "D": "FCLSp4"}, "correct": ["C"], "feedback": "", "video_url": null}, {"id": "spins_34", "category": "spins", "type": "multiple_choice", "question": "The correct name for the singles element with code CSSp3 is:", "options": {"A": "Sit Spin with change of foot level 3", "B": "Combination sit spin level 3", "C": "Camel spin level 3", "D": "Camel spin with a change of foot level 3", "E": "Sit spin with a change of foot no value"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "spins_35", "category": "spins", "type": "multiple_choice", "question": "The correct name for the singles element with code CUSp3 is:", "options": {"A": "Camel upright spin level 3", "B": "Combination spin level 3", "C": "Change Upright spin level 3", "D": "Upright spin with a camel entry level 3", "E": "Change foot combination spin level 3", "F": "Layback spin level 3"}, "correct": ["C"], "feedback": "", "video_url": null}, {"id": "spins_36", "category": "spins", "type": "multiple_choice", "question": "Identify the level and code for the following spin.\n\nBack entry: CU(1.5); NBP(8) change feet SS(8); U(3)", "options": {"A": "CCoSp1", "B": "CCoSp2p1 V1", "C": "CCoSp1p3", "D": "CCoSp2p3 V1", "E": "CCoSp3 2p4 V1", "F": "CCoSp2p4"}, "correct": ["D"], "feedback": "", "video_url": null}, {"id": "spins_37", "category": "spins", "type": "multiple_choice", "question": "Identify the level for the following spin.\n\nJuvenile FCCoSp: \u00c2\u00a0Difficult flying entry;SS(3) change feet C(3); SF(4); U(3)", "options": {"A": "Level 1", "B": "Level 2", "C": "Level 3", "D": "Level 4"}, "correct": ["D"], "feedback": "", "video_url": null}, {"id": "spins_38", "category": "spins", "type": "multiple_choice", "question": "Identify the code and level for the following spin.\n\nNovice Ladies FS: \u00c2\u00a0C(3); CU(1.5) change feet CS(1.5); U(3)", "options": {"A": "CCoSp2pB", "B": "CCSpB V1", "C": "CCoSp1pB", "D": "CCoSp2pB V1"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "spins_39", "category": "spins", "type": "multiple_choice", "question": "Identify the level and code of the following spin.\n\nJuvenile Boy: \u00c2\u00a0C(3); NBP(2) change feet SF(1.5); US(3) \u00c2\u00a0", "options": {"A": "CCoSp2", "B": "CCoSp2 V1", "C": "CCoSp2p2\u00c2", "D": "CCoSp2p V1"}, "correct": ["C"], "feedback": "", "video_url": null}, {"id": "spins_40", "category": "spins", "type": "multiple_choice", "question": "Identify the level and code of the following spin.\n\nDifficult entry; NBP(3) change feet SF(3);US(3)", "options": {"A": "CCoSp Base", "B": "CCoSp 1", "C": "CCoSp2p3 V1", "D": "CCoSp2p4 V1"}, "correct": ["D"], "feedback": "", "video_url": null}, {"id": "spins_41", "category": "spins", "type": "multiple_choice", "question": "During the review process, which reviews can be watched in slow motion?", "options": {"A": "Spin entry into a spin for inversion on an illusion", "B": "Fly into a spin for achieving a basic position within 2 revolutions", "C": "Difficult variation for maintaining the position for two revolutions", "D": "All of the above", "E": "A and C only"}, "correct": ["D"], "feedback": "", "video_url": null}, {"id": "spins_42", "category": "spins", "type": "multiple_choice", "question": "What is the definition of a Spin Combination?", "options": {"A": "A spin that has at lease one change of foot", "B": "A spin that has only one change of foot", "C": "A spin that has only one change of position for 2 revolutions in each position", "D": "A spin with at least 2 basic positions with 2 revolutions in each position"}, "correct": ["D"], "feedback": "", "video_url": null}, {"id": "spins_43", "category": "spins", "type": "multiple_choice", "question": "In the Intermediate Short Program, how many spins can start with a fly?", "options": {"A": "All", "B": "1", "C": "2", "D": "3", "E": "No spins may start with a fly"}, "correct": ["E"], "feedback": "", "video_url": null}, {"id": "spins_44", "category": "spins", "type": "multiple_choice", "question": "In Junior, can the skater repeat the same flying spin in the Free Skate that was executed in the Short Program?", "options": {"A": "Yes", "B": "No"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "spins_45", "category": "spins", "type": "multiple_choice", "question": "In which category of difficult spin variations does the \"crossfoot\" spin position belong?", "options": {"A": "UF (upright front)", "B": "UL (upright layback)", "C": "UB (upright Biellman)", "D": "US (upright straight)"}, "correct": ["D"], "feedback": "", "video_url": null}, {"id": "spins_46", "category": "spins", "type": "multiple_choice", "question": "In which category of difficult spin variations does the \"windmill\" spin position belong?", "options": {"A": "Upright Position", "B": "Camel Position", "C": "Non-Basic Position", "D": "No longer counted as a feature"}, "correct": ["C"], "feedback": "", "video_url": null}, {"id": "spins_47", "category": "spins", "type": "multiple_choice", "question": "How many times does the skater need to do the \"windmill\" in a spin combination to be awarded as a non-basic difficult variation.", "options": {"A": "No longer counted as a feature", "B": "3", "C": "2", "D": "1"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "spins_48", "category": "spins", "type": "multiple_choice", "question": "Can you award the feature \"increase of speed\" in a Sit Position?", "options": {"A": "No", "B": "Yes"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "spins_49", "category": "spins", "type": "multiple_choice", "question": "A skater executes a camel spin with 4 revolutions counterclockwise direction, changes foot and executes a difficult variation of an upright spin in the clockwise direction. Does the skater get the feature for spinning in both directions?", "options": {"A": "No", "B": "Yes"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "spins_50", "category": "spins", "type": "multiple_choice", "question": "A skater does not have a clear visible jump in the FCCoSp in Free Skate. Is a \"V\" assigned to this spin?", "options": {"A": "No", "B": "Yes"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "spins_51", "category": "spins", "type": "multiple_choice", "question": "A skater does not have a clear visible jump in a FSSp in Short Program. Is a \"V\" assigned to this spin?", "options": {"A": "No", "B": "Yes"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "spins_52", "category": "spins", "type": "multiple_choice", "question": "For a change of edge the skater needs to execute 3 continuous revolutions on one edge and 3 continuous revolutions on the other edge to be awarded.", "options": {"A": "False", "B": "True"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "spins_53", "category": "spins", "type": "multiple_choice", "question": "For the change of position \"backwards-sideways\" feature in the Layback Spin, the skater must execute 3 revolutions in each position for the feature to be awarded?", "options": {"A": "False", "B": "True"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "spins_54", "category": "spins", "type": "multiple_choice", "question": "In the Free Skate, what is the consequence if a skaters does less than 3 revolutions after a change of foot in any spin with a change of foot?", "options": {"A": "V Sign is applied", "B": "Spin Receives No Value", "C": "Max Level Base", "D": "Spin is call with NO change of foot\u00c2"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "spins_55", "category": "spins", "type": "multiple_choice", "question": "In Junior & Senior Free Skating, the skater must have a spin combination with a change of foot.", "options": {"A": "False", "B": "True"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "spins_56", "category": "spins", "type": "multiple_choice", "question": "In the Free Skate, a skater performs a Combination Spin with 3 basic positions achieved on the first foot and 2 basic positions on the 2nd foot.\u00c2\u00a0 During the change of foot (without a change of direction), if there is both a curve of an exit on the first foot and an entry on the second foot, what is the call?", "options": {"A": "CCoSp(with levels achieved and a \"V\")", "B": "CCoSp (No Value)", "C": "CoSp(with levels achieved)"}, "correct": ["C"], "feedback": "", "video_url": null}, {"id": "spins_57", "category": "spins", "type": "multiple_choice", "question": "The skater changes position from a sit to a camel with 2 revolutions in each position without establishing a non basic position. Can this be considered as a difficult change of position on the same foot?", "options": {"A": "No", "B": "Yes"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "spins_58", "category": "spins", "type": "multiple_choice", "question": "What is the abbreviation and level of the following spin in the Short Program: sit position (4 revs), upright straight DV (3 revs), difficult change of foot with a jump, into a non-basic DV (3 revs), and a normal upright position (4 revs)", "options": {"A": "CCoSp1", "B": "CCoSp1V", "C": "CCoSp2", "D": "CCoSp2V", "E": "CCoSp3", "F": "CCoSp3V"}, "correct": ["D"], "feedback": "", "video_url": null}, {"id": "spins_59", "category": "spins", "type": "multiple_choice", "question": "What is the abbreviation and level of the following spin in the Short Program: normal flying camel entry into a camel up DV (8 revs), camel side DV (3 revs), camel forward DV (2 revs)", "options": {"A": "FCSp2V", "B": "FCSp2", "C": "FCSp3", "D": "FCSp3V", "E": "FCSp4", "F": "FCoSp3"}, "correct": ["C"], "feedback": "", "video_url": null}, {"id": "spins_60", "category": "spins", "type": "multiple_choice", "question": "What is the abbreviation and level of the following spin in the Free Skate: difficult entry into a camel up DV (3 revs), camel side DV (5 revs)//change of foot//camel position (3 revs), sit position (1 rev), jump within, sit position reached within two revs and held for (3 revs), upright position (2 revs)", "options": {"A": "CCoSp3", "B": "CCoSp3V", "C": "CCoSp4", "D": "CCoSp4V"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "spins_61", "category": "spins", "type": "multiple_choice", "question": "A \"failed\" difficult variation of a sit spin can be awarded as a Non Basic Position in a combination spin, as long as it meets the definition of a Non Basic difficult variation.", "options": {"A": "False", "B": "True"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "spins_62", "category": "spins", "type": "multiple_choice", "question": "For Juvenile thru Senior, \"All Three Basic Positions\" is a feature than can only be awarded on the second foot.", "options": {"A": "False", "B": "True"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "spins_63", "category": "spins", "type": "multiple_choice", "question": "Difficult Entry and Difficult Exit are considered the same feature so only the first attempt of the entry or exit will be considered)", "options": {"A": "False", "B": "True"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "spins_64", "category": "spins", "type": "multiple_choice", "question": "For the \"Crossfoot\" Spin to be awarded as a Difficult Variation of an Upright Spin, the toes should be held close together and the heels open.", "options": {"A": "False", "B": "True"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "spins_65", "category": "spins", "type": "multiple_choice", "question": "The \"increase in speed\" feature _____________ be awarded in the following example. A skater executes a Sit Forward DV and increases speed by changing into a Sit Side DV, while maintaining the definition of a Sit Position.", "options": {"A": "Can", "B": "Can NOT"}, "correct": ["A"], "feedback": "", "video_url": null}, {"id": "spins_66", "category": "spins", "type": "multiple_choice", "question": "A windmill is considered as a difficult movement for a feature only if it reaches close to a split position (135 degrees) and shows physical strength flexibility and has an effect on the balance of the main body core. If a windmill is used together with other difficult movements, it must also fulfill the requirement of at least 135 degrees.", "options": {"A": "False", "B": "True"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "spins_67", "category": "spins", "type": "multiple_choice", "question": "A skater executes the following features in a CCoSp:\nCamel side difficult variation for 3 revolutions / Sit forward difficult variation for 3 revolutions / Change of foot / Difficult non-basic position for 3 revolutions / Upright straight difficult variation for 3 revolutions\nWhat is the level achieved?", "options": {"A": "CCoSp1", "B": "CCoSp2", "C": "CCoSp3", "D": "CCoSp4", "E": "CCoSp2V"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "spins_68", "category": "spins", "type": "multiple_choice", "question": "An Intermediate woman performs the following spins in this order in her FS:\n\n1. Sit Forward for 3 revolutions, Camel Forward for 3 revolutions / (change feet) Non Basic position for 3 revolutions, Upright Straight for 3 revolutions\n2. Difficult Entrance, Camel Side for 4 revolutions on BI edge, Change of Edge, Camel Forward for two revolutions on FO edge\n\nWhat are the final codes and levels that appear on the final protocol?", "options": {"A": "1. CCoSp4\n2. CSp4", "B": "1. CCoSp3\n2. CSp3*", "C": "1. CCoSp4\n2. CSp2", "D": "1. CCoSp3\n2. CSp2*"}, "correct": ["D"], "feedback": "", "video_url": null}, {"id": "spins_69", "category": "spins", "type": "multiple_choice", "question": "A Pre-Juvenile girl performs the following:\n\nSpin 1: Difficult sit forward variation for 5 revolutions, difficult exit\nSpin 2: Basic camel spin for 5 revolutions, Basic sit spin for 3 revolutions / (change of foot) basic upright spin for 4 revolutions\n\nWhat appears on the final protocol?", "options": {"A": "1. SSp2\n2. CCoSp2", "B": "1. SSp2\n2. CCoSp1", "C": "1. SSp1\n2. CCoSp1", "D": "1. SSpB\n2. CCoSPB", "E": "1. SSp1\n2. CCoSpB", "F": "1. SSp3\n2. CCoSp3"}, "correct": ["B"], "feedback": "", "video_url": null}, {"id": "spins_70", "category": "spins", "type": "multiple_choice", "question": "If this spin was performed by a skater in a Pre-Juvenile Free Skate, what code and level should be on the final protocol?", "options": {"A": "CCoSpB", "B": "CCoSpBV", "C": "CCoSp2V", "D": "CCoSp2", "E": "CCoSp4V"}, "correct": ["B"], "feedback": "", "video_url": "https://www.dropbox.com/scl/fi/qzaweh07f0p4tofaqvqry/Spin14.mp4?rlkey=53ajdygwl9mrp28g3rso43zel&st=3kmydzdj&dl=0"}, {"id": "spins_71", "category": "spins", "type": "multiple_choice", "question": "Intermediate Men SP\n\nWhat is the final element code on the protocol for this spin?", "options": {"A": "CCSp", "B": "CCSpBV", "C": "CCSpB"}, "correct": ["A"], "feedback": "", "video_url": "https://www.dropbox.com/scl/fi/xmsvcju4u2prcoo597a1q/Spin2.mp4?rlkey=c637poe1lsa892j3eay90uzbq&st=fwdjxwl5&dl=0"}, {"id": "spins_72", "category": "spins", "type": "multiple_choice", "question": "Intermediate Men FS\n\nWhat is the final element code on the protocol for this spin?", "options": {"A": "CCSp", "B": "CCSpBV", "C": "CCSpB"}, "correct": ["B"], "feedback": "", "video_url": "https://www.dropbox.com/scl/fi/xmsvcju4u2prcoo597a1q/Spin2.mp4?rlkey=c637poe1lsa892j3eay90uzbq&st=fwdjxwl5&dl=0"}, {"id": "spins_73", "category": "spins", "type": "multiple_choice", "question": "Junior Women FS\n\nAssess the level of difficulty the spin in this video achieves", "options": {"A": "FCSp", "B": "FCSpB", "C": "FCSp1", "D": "FCSp2", "E": "FCSp3", "F": "FCSp4"}, "correct": ["A"], "feedback": "", "video_url": "https://www.dropbox.com/scl/fi/nr3phwtrc50hyoo4r8itu/Spin4.mp4?rlkey=o4ecrvhvqvjxs0zo12jqykvet&st=mx0pa5se&dl=0"}, {"id": "spins_74", "category": "spins", "type": "multiple_choice", "question": "The skater achieves the change of foot executed by jump level feature in the video in this spin.", "options": {"A": "True", "B": "False"}, "correct": ["B"], "feedback": "", "video_url": "https://www.dropbox.com/scl/fi/6qbywzk8dtbsg8u5j7uio/Spin5.mp4?rlkey=l94n6rhg4kkqhx6com5e3tqs2&st=5advgb9m&dl=0"}, {"id": "spins_75", "category": "spins", "type": "multiple_choice", "question": "In the video, the skater attempts two spins within the same Junior Women Free Skate program.\n\n\nBased on these two spins, which of the below is the correct value for the\u00c2\u00a0[u]SECOND[/u] spin executed", "options": {"A": "CCoSp", "B": "CCoSp1", "C": "CCoSp2", "D": "CCoSp3", "E": "CCoSp4"}, "correct": ["C"], "feedback": "", "video_url": "https://www.dropbox.com/scl/fi/c65njqc5skald6b92y73b/Spin13.mp4?rlkey=e1qeya30fwtq5ieyv90e10mkh&st=k1owonqr&dl=0"}], "flashcards": [{"id": "jumps_fc_1", "category": "jumps", "front": "What are jumping elements?", "back": "Jumping elements are:\n\nsolo jumps,\njump combinations, and\njump sequences"}, {"id": "jumps_fc_2", "category": "jumps", "front": "Define a jump combination", "back": "In a jump combination:\n\nthe landing foot of a jump is the take off foot of the next jump\nOne full revolution on the ice between the jumps (free foot can touch the ice, but no weight transfer) keeps the element in the frame of the definition of ajump combination"}, {"id": "jumps_fc_3", "category": "jumps", "front": "How is a single Euler considered within jumping elements?", "back": "Single Euler:\n\n* An Euler, when used in combinations between two listed jumps, becomes a listed jump (1Eu) with the value indicated in the SOV\n* Single Euler (1Eu) missing half a revolution or more will be considered as downgraded. In this case the judges will apply the reduction for a downgraded jump\n* If the Single Euler is missing less than half a revolution, it will not be considered as under-rotated\n* If the Single Euler is not clearly jumps or is executed as a step-over, the judges will apply a reduction in GOE"}, {"id": "jumps_fc_4", "category": "jumps", "front": "How is an intended waltz jump considered by the TP?", "back": "If in the opinion of the TP the intended waltz jump is used only as the preparation to the next jump, this Waltz jump will not be called"}, {"id": "jumps_fc_5", "category": "jumps", "front": "How is a single jump more similar to a hop than a jump that is a result of a bad landing of the previous jump considered?", "back": "The TP has the authority to not call a single jump which is more similar to a hop than a jump that is a result of a bad landing of the previous jump.\n\nThe Judges will reflect the mistake in the GOE"}, {"id": "jumps_fc_6", "category": "jumps", "front": "Definition of a Jump Sequence", "back": "A jump sequence consists of two (2) jumps of any number of revolutions, beginning with any listed jump, immediately followed by an Axel type jump with a direct step from the landing curve of the first jump to the take-off curve of the Axel jump"}, {"id": "jumps_fc_7", "category": "jumps", "front": "*Short Program*\n\nHow are jumps which do not satisfy the requirements considered?", "back": "Short Program\n\nJumps which do not satisfy the requirements (including wrong number of revolutions) will have NO VALUE, but WILL block a jumping box, if one is empty\nIf a combination of two double jumps is not allowed (Sr Men & Ladies, Jr Men), the jump with the lesser value (after the consideration of signs) will be the jump that will be asterisked"}, {"id": "jumps_fc_8", "category": "jumps", "front": "*Free Skate*\n\nHow are jumps which do not satisfy the requirements considered?", "back": "Free Skate\n\nIf any jumps in a combination/sequence is not according to requirements, only the jump(s) not according to the requirements will be deleted"}, {"id": "jumps_fc_9", "category": "jumps", "front": "When is a jump considered as \"quarter\"?", "back": "A jump will be considered as \"quarter\" if it is missing rotation of 1/4\n\nThis jump will be indicated by the Technical Panel to the Judges and in the protocols with a \"q\" symbol after the element code."}, {"id": "jumps_fc_10", "category": "jumps", "front": "When will a jump be considered as \"under-rotated\"?", "back": "A jump will be considered as \"under-rotated\" if it has missing rotation of more than 1/4 but less than 1/2 revolution\n\nAn under-rotated jump will be indicated by the Technical Panel to the Judges and in the protocols with a \"\n\nJumps identified as under-rotated will receive reduced base values which are listed in the designated row of the SOV"}, {"id": "jumps_fc_11", "category": "jumps", "front": "When is a jump considered as \"downgraded\"?", "back": "A jump will be considered as \"Downgraded\" if it has missing rotation of 1/2 or more\n\nA downgraded jump will be indicated by the Technical Panel to the Judges and in the protocols with a \"\\<\n\nA jump identified as downgraded will be evaluated using the SOV for the element of one rotation less (i.e. a downgraded triple will be evaluated with the SOV for the corresponding double)."}, {"id": "jumps_fc_12", "category": "jumps", "front": "How is an over-rotated jump considered?", "back": "If a jump is over-rotated more than a quarter revolution, it is called as a jump with the higher revolution.\n\n*For example 2T with more than a quarter revolution will be called as 3T downgraded"}, {"id": "jumps_fc_13", "category": "jumps", "front": "How is a cheated take-off considered by the TP?", "back": "A clear forward (backward for Axel type jump) take-off will be considered as a downgraded jump.\n\nThe TP may only watch the replay in REGULAR SPEED to determine the cheat and downgrade on the takeoff (more often in combinations or sequences)"}, {"id": "jumps_fc_14", "category": "jumps", "front": "Which edge does a flip take-off from?\n\nWhat edge does a lutz take-off from?\n\nIf the take-off is not clean correct, how are the jumps considered?", "back": "Flip take-off is from a backward ***inside*** edge\nLutz take-off is from a backward ***outside*** edge\n\nIf the take-off edge is not clean, correct, the TP indicates the error to the Judges using the signs \"e\" (edge) and \"!\" (attention)\n\nThe TP may watch the replay in slow motion\n\nThe TP uses the sign \"e\" if the take-off edge is definitely wrong\n\nThe Base values of the jumps with the sign \"e\" are listed in the designated row of the SOV. The TP uses the sign \"!\" if the take-off edge is not clear. In this case the Base value is not reduced. Both mistakes are reflected in the GOE of the judges"}, {"id": "jumps_fc_15", "category": "jumps", "front": "How is a popped listed jump considered?", "back": "The attempt will count as one jump element\n\nHowever, a small hop or jump with up to one-half revolution performed as a kind of \"decoration\" is not to be considered as a jump and will be marked within the component \"Transitions\""}, {"id": "jumps_fc_16", "category": "jumps", "front": "How are jumps not listed in the SOV *(e.g. Walley, split jump, Inside Axel with any number of revolutions taking off from the forward inside edge)* considered?", "back": "Jumps not listed in the SOV **_WILL NOT COUNT AS A JUMP ELEMENT_** but might be used as a special entrance to the jump to be considered in the mark for Transitions\n\nA Toe Walley, however, will be called and counted as a Toe loop"}, {"id": "jumps_fc_17", "category": "jumps", "front": "**True or False:**\n\nIn combinations/sequences, all jumps may be landed on either foot", "back": "FALSE\n\nIn combinations/sequences all jumps with more than one revolution, ***EXCEPT THE LAST ONE*** may be landed on either foot. If the last jump is landed on the wrong foot, the judges will reduce GOE"}, {"id": "jumps_fc_18", "category": "jumps", "front": "How is landing on the incorrect edge considered?", "back": "The call will not change if the jump is landed on an incorrect edge.\n\nHowever Judges will reflect this in their GOE"}, {"id": "jumps_fc_19", "category": "jumps", "front": "How is it considered when a skater performs a spin immediately followed by a jump or vice versa?", "back": "The two elements are called separately with credit given to difficult take off/entry (GOE).\n\nA listed jump that is called and executed immediately after a spin is not considered as a difficult exit of a spin"}, {"id": "jumps_fc_20", "category": "jumps", "front": "What is a jump attempt?", "back": "In principle, a clear preparation for a take off for a jump, stepping to the entry edge or placing the toe pick into the ice and leaving the ice with or without a turn is considered an attept of a jump, receives no value and blocks a box.\nIn some cases, **WHICH NEED TO BE DECIDED BY THE TP**, the preparation for the take off without leaving the ice might also be called an attempt, *e.g. a loop takeoff when the skater falls before leaving the ice, or a skater steps onto the forward take-off edge of an Axel and pulls back the free leg and arms, starts the forward movement to jump into the air with the free leg and arms passing through forward but at the last moment does not leave the ice, etc.*"}, {"id": "jumps_fc_21", "category": "jumps", "front": "How is a touch down with the free foot without weight transfer and up to 2 three turns or no turns between jumps in a combination considered?", "back": "The element remains a jump combination (however Judges will reduce the GOE because of error)"}, {"id": "jumps_fc_22", "category": "jumps", "front": "In the case of more than one full revolution on the ice, what is the call in the SP and the FS?", "back": "The call will be:\n\nall the jumps prior to this revolution; plus\n\n\" + COMBO\" if jump combination or SP or \" + SEQ\" if jump sequence in FS; plus\n\nall the next jumps perfomed with an \"*\""}, {"id": "jumps_fc_23", "category": "jumps", "front": "If the first or second jump of a two-jump combination fails and turns into a \"non-listed\" jump but the other jump is a listed jump, how is the jump element considered?", "back": "The unit will be considered as a jump combo with only the listed jump receiving value"}, {"id": "jumps_fc_24", "category": "jumps", "front": "In case one listed jump is followed or preceded by any non-listed jumps, what will the call be?", "back": "The call will be the solo listed jump only"}, {"id": "jumps_fc_25", "category": "jumps", "front": "*Short Program -*\n\nIf a Junior skater performs a different jump than required, **_?_**", "back": "*Short Program -*\n\nIf a Junior skater performs a different jump than required, **the element will receive no value but will block the \"jumping box\"**"}, {"id": "jumps_fc_26", "category": "jumps", "front": "*Short Program -*\n\nIf a skater completes a jump combo of 3 jumps, **_?_**", "back": "*Short Program -*\n\nIf a skater completes a jump combo of 3 jumps, **the third executed jump will receive _no value_**"}, {"id": "jumps_fc_27", "category": "jumps", "front": "*Short Program -*\n\nIf the same jump is executed twice as a solo jump and as part of a combination, **_?_**", "back": "*Short Program -*\n\nIf the same jump is executed twice as a solo jump and as part of a combination, **_the second execution will not be counted_**"}, {"id": "jumps_fc_28", "category": "jumps", "front": "*Short Program -*\n\nIf an extra jump is executed, **_?_**", "back": "*Short Program -*\n\nIf an extra jump is executed, **_only the jump(s) which is not according to the requirements will have no value._**\n\nAll extra jumps are called and marked with an \"**\\***\"\n\nThe jumps are considered in the order of execution."}, {"id": "jumps_fc_29", "category": "jumps", "front": "*Short Program -*\n\nIf a skater falls or steps out of a jump and immediately after that executes another jump, how will the element be called?", "back": "*Short Program -*\n\nIf a skater falls or steps out of a jump and immediately after that executes another jump, the element will be called as follows:\n\n**First Jump + COMBO + Second Jump\\***"}, {"id": "jumps_fc_30", "category": "jumps", "front": "*Short Program -*\n\nNo second jump in a jump combination", "back": "Short program -\n\nIf there is no second jump in a jump combination, the TP identifies the intended combination during or after the program.\n\nIf there is no clear way to identify the combination or the solo jump, the later jump element performed will be identified as the jump combination consisting of one jump only\n\n*For example:\n4T clean and 3Lz with a fall --\\> 4T and 3Lz+COMBO\n4T with a fall and 3Lz clean --\\> 4T+COMBO and 3Lz (solo jump)*"}, {"id": "jumps_fc_31", "category": "jumps", "front": "*Free Skating -*\n\nThe first repetition of a double jump as a solo jump or in a jump combination/sequence will receive **_?_**", "back": "*Free Skating -*\n\nThe first repetition of a double jump as a solo jump or in a jump combination/sequence will receive **_full base value_**"}, {"id": "jumps_fc_32", "category": "jumps", "front": "*Free Skating -*\n\nFirst repetition of a triple or quad jump of the same name and the same number of revolutions without one of them being in a jump combination/sequence", "back": "*Free Skating -*\n\nBoth jumps will be counted as solo jumps, **but the second of these jumps will be marked with the sign \"+REP\" and will receive 70% of the base value** with result rounded to two decimal places"}, {"id": "jumps_fc_33", "category": "jumps", "front": "*Free Skating -*\n\nSecond/third repetition of a double or triple or quad jump of the same name and the same number of revolutions as a solo jump or in a jump combination/sequence", "back": "*Free Skating -*\n\nOnly the jumps not according to the requirements will receive no value, but the rest of the jumps of the combination/sequence will be counted"}, {"id": "jumps_fc_34", "category": "jumps", "front": "*Free Skating -*\n\nSecond jump combo with 3 jumps", "back": "*Free Skating -*\n\nOnly the jumps not according to requirements will receive no value"}, {"id": "jumps_fc_35", "category": "jumps", "front": "*Free Skating -*\n\nExtra jumps", "back": "*Free Skating -*\n\nIf an extra jump is executed, only the solo jump(s) which is not according to the requirements will have no value\n\nAll extra jumps are called and marked with an *\n\nThe jumps are considered in the order of execution"}, {"id": "jumps_fc_36", "category": "jumps", "front": "*Free Skating -*\n\nMore than three Jump combinations / sequences", "back": "*Free Skating -*\n\nIf the number of jump combinations or sequences are more than three, only the first jump of an extra jump combinations/sequences is counted. The jump will be marked with the sign \"+REP\" and receive 70% of the base value (as a repetition of a jump combination/sequence),\n\n*e.g. 3Lo+3T*+REP, 3Lo+3T*+2A*+REP etc"}, {"id": "jumps_fc_37", "category": "jumps", "front": "*Free Skating -*\n\nIf in a jump combination or sequence a skater falls or steps out of a jump and immediately executes another jump(s), **_?_**", "back": "*Free Skating -*\n\nIf in a jump combination or sequence a skater falls or steps out of a jump and immediately executes another jump(s), the jump(s) after the mistake are not counted, and the call will be the executed jump(s) before the mistake + combo + the executed jump (if part of a jump combination) or jump(s) before the mistake + sequence + the executed jump(s) if part of a jump sequence. The jumps after the mistake are marked with an *\n\n2A (hop with weight change) + 2A is called 2A+SEQ+2A*\n2A+1Eu (fall/step out) +3S is called 2A+1Eu+COMBO+3S*\n\nBy doing this all the executed jumps will be visible on the computer screen and it will be easy to follow the requirements of the repetition rule.\n\nThe judges GOE refer to the entire element performed"}, {"id": "jumps_fc_38", "category": "jumps", "front": "*Free Skating -*\n\nJump units not fulfilling the definition of combo/seq", "back": "*Free Skating -*\n\nThe jumps are considered in the order of execution\n\nThe point where the mistake occurs will be marked with the either the sign \"+COMBO\" or \"+SEQ\" which results in 80% of the base value for the jumps prior to the mistake and asterisk (*) for the jumps after it\n\n*E.g.\n3T+2A+SEQ+2T*,\n3T+3T+SEQ+2A*\n3T+1Eu+COMBO+2T*"}, {"id": "steps_fc_1", "category": "steps", "front": "Minimum Variety", "back": "at least FIVE difficult turns and steps; none can be counted more than TWICE"}, {"id": "steps_fc_2", "category": "steps", "front": "Full body rotation definition for steps feature 2", "back": "- one complete rotation\n- skater doesn't get credit for turning half a revolution back and forth"}, {"id": "steps_fc_3", "category": "steps", "front": "Levels with partially leveled step sequence (i.e. max StSq2)", "back": "Juvenile, Intermediate"}, {"id": "steps_fc_4", "category": "steps", "front": "True or False - Turns cannot count for both feature 1 and feature 4", "back": "False - \n\nThe turns for feature 1 also count toward feature 4"}, {"id": "steps_fc_5", "category": "steps", "front": "If the skater does not perform a minimum variety of steps and turns, the level cannot be higher than ____?", "back": "Base"}, {"id": "steps_fc_6", "category": "steps", "front": "Step sequence pattern requirements", "back": "- no longer a required pattern\n- must FULLY UTILIZE the ice surface\n- must be VISIBLE and IDENTIFIABLE\n- failure to achieve above will result in no VALUE"}, {"id": "steps_fc_7", "category": "steps", "front": "General rules for step sequences (3)", "back": "- must FULLY UTILIZE the ice surface\n- turns and steps must be BALANCED in their DISTRIBUTION throughout the sequence\n- must be VISIBLE and IDENTIFIABLE"}, {"id": "steps_fc_8", "category": "steps", "front": "Simple Variety", "back": "must include at least SEVEN difficult turns and steps; none of the types can be counted more than TWICE"}, {"id": "steps_fc_9", "category": "steps", "front": "Unlisted jumps in the step sequence", "back": "unlisted jumps, independent of their number of revolutions CAN BE INCLUDED in the step sequence WITHOUT A DEDUCTION or any other consequence in both SP an FS"}, {"id": "steps_fc_10", "category": "steps", "front": "If the skater performs only minimum variety of steps and turns, the level cannot be higher than ___?", "back": "Level 1"}, {"id": "steps_fc_11", "category": "steps", "front": "Distribution of turns & steps", "back": "- MUST be distributed throughout the sequence\n- there should be no long sections without turns and steps\n- if this requirement is not met, the Level cannot be higher than BASE"}, {"id": "steps_fc_12", "category": "steps", "front": "Use of body movements", "back": "- steps level feature #3\n- any movements of the arms, head, torso, hips, and legs that have an effect on the main body core\n- having an effect on the main body core can also be understood as having an effect on the balance of the body as a whole and influencing the balance on the blade"}, {"id": "steps_fc_13", "category": "steps", "front": "Difficult turns that can be used in turn combinations (feature 4)", "back": "Rockers, Counters, Brackets, Twizzles, Loops"}, {"id": "steps_fc_14", "category": "steps", "front": "Listed jumps with more than half a revolution executed in the step sequence", "back": "SP - ignored as an element (but will force judges to reduce GOE by one grade)\n\nFS - can be included, will be identified and will occupy jumping boxes\n\n** in any case - doesn't affect level **"}, {"id": "steps_fc_15", "category": "steps", "front": "Rotations in either direction defined", "back": "- steps feature 2\n- skater must rotate CW for 1/3 of patterns and CCW of 1/3 of pattern\n- can be continuous or not continuous\n- must make full body rotations"}, {"id": "steps_fc_16", "category": "steps", "front": "Step sequence level feature #1", "back": "Level 1 - Minimum Variety (5)\nLevel 2 - Simple Variety (7)\nLevel 3 - Variety (9)\nLevel 4 - Complexity (11)"}, {"id": "steps_fc_17", "category": "steps", "front": "Step sequence level feature #3", "back": "use of body movements for at least 1/3 of the pattern"}, {"id": "steps_fc_18", "category": "steps", "front": "Steps feature 4 - \n\nWhich turn combination will be counted?", "back": "only the first combination attempted on each foot can be counted"}, {"id": "steps_fc_19", "category": "steps", "front": "If a skater does not distribute turns & steps throughout the step sequence, the level cannot be higher than ___?", "back": "Base"}, {"id": "steps_fc_20", "category": "steps", "front": "Level feature 4 turn combination requirements (6)", "back": "-only one difficult turn may be repeated once in the two combinations\n- 3-turns, change of edge, jump/hop, changes of foot not allowed\n- at least one turn in the combination must be a different type than the others\n- the exit edge of a turn is the entry edge of the next turn\n- the free foot must not touch the ice\n- combination must be executed with continuous flow"}, {"id": "steps_fc_21", "category": "steps", "front": "Complexity", "back": "must include at least ELEVEN difficult turns and steps; \nnone of the types can be counted more than TWICE; \nFIVE types of turns and steps must be executed in BOTH DIRECTIONS"}, {"id": "steps_fc_22", "category": "steps", "front": "Step sequence level feature #4", "back": "two difference combinations of three difficult turns on each foot executed with continuous flow within the sequence\n\n* only the first combination attempted on each foot can be counted"}, {"id": "steps_fc_23", "category": "steps", "front": "If a skater performs only VARIETY (not complexity) of steps and turns, the Level cannot be higher than ___?", "back": "Level 3"}, {"id": "steps_fc_24", "category": "steps", "front": "Step sequences MAY/MAY NOT include SOME/ANY unlisted jumps", "back": "step sequences MAY include ANY unlisted jumps in the short program and freeskate"}, {"id": "steps_fc_25", "category": "steps", "front": "If the skater performs only simple variety of steps and turns, the level cannot be higher than ___?", "back": "Level 2"}, {"id": "steps_fc_26", "category": "steps", "front": "Variety", "back": "must include at least NINE difficult turns and steps;\n\n| none of the types can be counted more than TWICE"}, {"id": "steps_fc_27", "category": "steps", "front": "# of step sequence level features", "back": "4"}, {"id": "steps_fc_28", "category": "steps", "front": "Step Sequence level feature #2", "back": "rotations in either direction (L and R) with full body rotation covering at least 1/3 of the pattern in total for each rotational direction"}, {"id": "steps_fc_29", "category": "steps", "front": "Difficult steps and turns (and 2 requirements)", "back": "Difficult steps and turns: twizzles, brackets, loops, counters, rockers, choctaws\n\nRequirements:\n\n1) must be executed on clean edges\n2) not counted as performed if \"jumped\""}, {"id": "steps_fc_30", "category": "steps", "front": "Levels with a fully leveled step sequence (i.e. max StSq4)", "back": "Novice, Junior, Senior"}, {"id": "steps_fc_1", "category": "steps", "front": "```\nWhat level is the step?\n8 turns/steps\nRotation - yes\nBody - no\nR and L combos - yes\n```", "back": "Level 2"}, {"id": "steps_fc_2", "category": "steps", "front": "```\nWhat level is the step?\n9 turns/steps\nRotation - no\nBody - yes\nR and L combos - yes\n```", "back": "Level 3"}, {"id": "steps_fc_3", "category": "steps", "front": "```\nWhat level is the step?\n12 turns/steps\nRotation - no\nBody - yes\nR and L combos - yes\n```", "back": "Level 3"}, {"id": "steps_fc_4", "category": "steps", "front": "```\nWhat level is the step?\n7 turns/steps\nRotation - yes\nBody - yes\nR and L combos - no\n```", "back": "Level 2"}, {"id": "steps_fc_5", "category": "steps", "front": "```\nWhat level is the step?\n8 turns/steps\nRotation - yes\nBody - yes\nR and L combos - no\n```", "back": "Level 2"}, {"id": "steps_fc_6", "category": "steps", "front": "```\nWhat level is the step?\n7 turns/steps\nRotation - yes\nBody - no\nR and L combos - no\n```", "back": "Level 2"}, {"id": "steps_fc_7", "category": "steps", "front": "```\nWhat level is the step?\n10 turns/steps\nRotation - yes\nBody - no\nR and L combos - no\n```", "back": "Level 2"}, {"id": "steps_fc_8", "category": "steps", "front": "```\nWhat level is the step?\n11 turns/steps\nRotation - no\nBody - no\nR and L combos - no\n```", "back": "Level 1"}, {"id": "steps_fc_9", "category": "steps", "front": "```\nWhat level is the step?\n5 turns/steps\nRotation - yes\nBody - no\nR and L combos - yes\n```", "back": "Level 1 (Review!)\n\n*If both turn combinations are successfully performed, must have a minimum of 6 difficult turns and steps"}, {"id": "steps_fc_10", "category": "steps", "front": "```\nWhat level is the step?\n11 turns/steps\nRotation - yes\nBody - no\nR and L combos - yes\n```", "back": "Level 3"}, {"id": "steps_fc_11", "category": "steps", "front": "```\nWhat level is the step?\n11 turns/steps\nRotation - yes\nBody - no\nR and L combos - no\n```", "back": "Level 2"}, {"id": "steps_fc_12", "category": "steps", "front": "```\nWhat level is the step?\n10 turns/steps\nRotation - no\nBody - no\nR and L combos - no\n```", "back": "Level 1"}, {"id": "steps_fc_13", "category": "steps", "front": "```\nWhat level is the step?\n8 turns/steps\nRotation - no\nBody - yes\nR and L combos - no\n```", "back": "Level 2"}, {"id": "steps_fc_14", "category": "steps", "front": "```\nWhat level is the step?\n10 turns/steps\nRotation - yes\nBody - yes\nR and L combos - yes\n```", "back": "Level 3"}, {"id": "steps_fc_15", "category": "steps", "front": "```\nWhat level is the step?\n9 turns/steps\nRotation - yes\nBody - yes\nR and L combos - yes\n```", "back": "Level 3"}, {"id": "steps_fc_16", "category": "steps", "front": "```\nWhat level is the step?\n10 turns/steps\nRotation - no\nBody - yes\nR and L combos - no\n```", "back": "Level 2"}, {"id": "steps_fc_17", "category": "steps", "front": "```\nWhat level is the step?\n9 turns/steps\nRotation - no\nBody - no\nR and L combos - no\n```", "back": "Level 1"}, {"id": "steps_fc_18", "category": "steps", "front": "```\nWhat level is the step?\n4 turns/steps\nRotation - yes\nBody - no\nR and L combos - yes\n```", "back": "Level Base"}, {"id": "steps_fc_19", "category": "steps", "front": "```\nWhat level is the step?\n7 turns/steps\nRotation - no\nBody - yes\nR and L combos - yes\n```", "back": "Level 2"}, {"id": "steps_fc_20", "category": "steps", "front": "```\nWhat level is the step?\n7 turns/steps\nRotation - yes\nBody - no\nR and L combos - yes\n```", "back": "Level 2"}, {"id": "steps_fc_21", "category": "steps", "front": "```\nWhat level is the step?\n5 turns/steps\nRotation - yes\nBody - yes\nR and L combos - yes\n```", "back": "Level 1"}, {"id": "steps_fc_22", "category": "steps", "front": "```\nWhat level is the step?\n6 turns/steps\nRotation - yes\nBody - no\nR and L combos - no\n```", "back": "Level 1"}, {"id": "steps_fc_23", "category": "steps", "front": "```\nWhat level is the step?\n7 turns/steps\nRotation - no\nBody - yes\nR and L combos - no\n```", "back": "Level 2"}, {"id": "steps_fc_24", "category": "steps", "front": "```\nWhat level is the step?\n5 turns/steps\nRotation - no\nBody - no\nR and L combos - no\n```", "back": "Level 1"}, {"id": "steps_fc_25", "category": "steps", "front": "```\nWhat level is the step?\n5 turns/steps\nRotation - no\nBody - no\nR and L combos - yes\n```", "back": "Level 1"}, {"id": "steps_fc_26", "category": "steps", "front": "```\nWhat level is the step?\n9 turns/steps\nRotation - yes\nBody - yes\nR and L combos - no\n```", "back": "Level 3"}, {"id": "steps_fc_27", "category": "steps", "front": "```\nWhat level is the step?\n7 turns/steps\nRotation - no\nBody - no\nR and L combos - yes\n```", "back": "Level 2"}, {"id": "steps_fc_28", "category": "steps", "front": "```\nWhat level is the step?\n11 turns/steps\nRotation - no\nBody - no\nR and L combos - yes\n```", "back": "Level 2"}, {"id": "steps_fc_29", "category": "steps", "front": "```\nWhat level is the step?\n6 turns/steps\nRotation - yes\nBody - yes\nR and L combos - no\n```", "back": "Level 1"}, {"id": "steps_fc_30", "category": "steps", "front": "```\nWhat level is the step?\n9 turns/steps\nRotation - yes\nBody - no\nR and L combos - yes\n```", "back": "Level 3"}, {"id": "steps_fc_31", "category": "steps", "front": "```\nWhat level is the step?\n9 turns/steps\nRotation - no\nBody - no\nR and L combos - yes\n```", "back": "Level 2"}, {"id": "steps_fc_32", "category": "steps", "front": "```\nWhat level is the step?\n4 turns/steps\nRotation - no\nBody - no\nR and L combos - yes\n```", "back": "Level Base (Review!)\n\nIf both difficult turn combinations are awarded, should be at least 6 difficult steps and turns, and therefore should be a Level 1"}, {"id": "steps_fc_33", "category": "steps", "front": "```\nWhat level is the step?\n6 turns/steps\nRotation - no\nBody - yes\nR and L combos - yes\n```", "back": "Level 1"}, {"id": "steps_fc_34", "category": "steps", "front": "```\nWhat level is the step?\n10 turns/steps\nRotation - no\nBody - no\nR and L combos - yes\n```", "back": "Level 2"}, {"id": "steps_fc_35", "category": "steps", "front": "```\nWhat level is the step?\n12 turns/steps\nRotation - yes\nBody - yes\nR and L combos - yes\n```", "back": "Level 4"}, {"id": "steps_fc_36", "category": "steps", "front": "```\nWhat level is the step?\n6 turns/steps\nRotation - no\nBody - no\nR and L combos - no\n```", "back": "Level 1"}, {"id": "steps_fc_37", "category": "steps", "front": "```\nWhat level is the step?\n4 turns/steps\nRotation - no\nBody - yes\nR and L combos - no\n```", "back": "Level Base"}, {"id": "steps_fc_38", "category": "steps", "front": "```\nWhat level is the step?\n6 turns/steps\nRotation - yes\nBody - yes\nR and L combos - yes\n```", "back": "Level 1"}, {"id": "steps_fc_39", "category": "steps", "front": "```\nWhat level is the step?\n9 turns/steps\nRotation - no\nBody - yes\nR and L combos - no\n```", "back": "Level 2"}, {"id": "steps_fc_40", "category": "steps", "front": "```\nWhat level is the step?\n4 turns/steps\nRotation - no\nBody - yes\nR and L combos - yes\n```", "back": "Level Base (Review!)\n\nIf both difficult turn combinations are awarded, should be at least 6 difficult steps and turns, and therefore should be a Level 1"}, {"id": "steps_fc_41", "category": "steps", "front": "```\nWhat level is the step?\n12 turns/steps\nRotation - yes\nBody - no\nR and L combos - no\n```", "back": "Level 2"}, {"id": "steps_fc_42", "category": "steps", "front": "```\nWhat level is the step?\n6 turns/steps\nRotation - yes\nBody - no\nR and L combos - yes\n```", "back": "Level 1"}, {"id": "steps_fc_43", "category": "steps", "front": "```\nWhat level is the step?\n12 turns/steps\nRotation - no\nBody - no\nR and L combos - yes\n```", "back": "Level 2"}, {"id": "steps_fc_44", "category": "steps", "front": "```\nWhat level is the step?\n5 turns/steps\nRotation - no\nBody - yes\nR and L combos - no\n```", "back": "Level 1"}, {"id": "steps_fc_45", "category": "steps", "front": "```\nWhat level is the step?\n5 turns/steps\nRotation - yes\nBody - yes\nR and L combos - no\n```", "back": "Level 1"}, {"id": "steps_fc_46", "category": "steps", "front": "```\nWhat level is the step?\n7 turns/steps\nRotation - yes\nBody - yes\nR and L combos - yes\n```", "back": "Level 2"}, {"id": "steps_fc_47", "category": "steps", "front": "```\nWhat level is the step?\n11 turns/steps\nRotation - no\nBody - yes\nR and L combos - yes\n```", "back": "Level 3"}, {"id": "steps_fc_48", "category": "steps", "front": "```\nWhat level is the step?\n5 turns/steps\nRotation - no\nBody - yes\nR and L combos - yes\n```", "back": "Level 1 (Review!)\n\nIf both difficult turn combinations are awarded, should be a minimum of 6 turns. Likely no change in level but discrepancy in features awarded"}, {"id": "steps_fc_49", "category": "steps", "front": "```\nWhat level is the step?\n5 turns/steps\nRotation - yes\nBody - no\nR and L combos - no\n```", "back": "Level 1"}, {"id": "steps_fc_50", "category": "steps", "front": "```\nWhat level is the step?\n12 turns/steps\nRotation - no\nBody - no\nR and L combos - no\n```", "back": "Level 1"}, {"id": "steps_fc_51", "category": "steps", "front": "```\nWhat level is the step?\n12 turns/steps\nRotation - yes\nBody - yes\nR and L combos - no\n```", "back": "Level 3"}, {"id": "steps_fc_52", "category": "steps", "front": "```\nWhat level is the step?\n4 turns/steps\nRotation - yes\nBody - no\nR and L combos - no\n```", "back": "Level Base"}, {"id": "steps_fc_53", "category": "steps", "front": "```\nWhat level is the step?\n10 turns/steps\nRotation - yes\nBody - yes\nR and L combos - no\n```", "back": "Level 3"}, {"id": "steps_fc_54", "category": "steps", "front": "```\nWhat level is the step?\n10 turns/steps\nRotation - yes\nBody - no\nR and L combos - yes\n```", "back": "Level 3"}, {"id": "steps_fc_55", "category": "steps", "front": "```\nWhat level is the step?\n11 turns/steps\nRotation - yes\nBody - yes\nR and L combos - yes\n```", "back": "Level 4"}, {"id": "steps_fc_56", "category": "steps", "front": "```\nWhat level is the step?\n7 turns/steps\nRotation - no\nBody - no\nR and L combos - no\n```", "back": "Level 1"}, {"id": "steps_fc_57", "category": "steps", "front": "```\nWhat level is the step?\n10 turns/steps\nRotation - no\nBody - yes\nR and  L combos - yes\n```", "back": "Level 3"}, {"id": "steps_fc_58", "category": "steps", "front": "```\nWhat level is the step?\n12 turns/steps\nRotation - yes\nBody - no\nR and L combos - yes\n```", "back": "Level 3"}, {"id": "steps_fc_59", "category": "steps", "front": "```\nWhat level is the step?\n6 turns/steps\nRotation - no\nBody - yes\nR and L combos - no\n```", "back": "Level 1"}, {"id": "steps_fc_60", "category": "steps", "front": "```\nWhat level is the step?\n8 turns/steps\nRotation - yes\nBody - yes\nR and L combos - yes\n```", "back": "Level 2"}, {"id": "steps_fc_61", "category": "steps", "front": "```\nWhat level is the step?\n4 turns/steps\nRotation - yes\nBody - yes\nR and L combos - yes\n```", "back": "Level Base"}, {"id": "steps_fc_62", "category": "steps", "front": "```\nWhat level is the step?\n8 turns/steps\nRotation - no\nBody - no\nR and L combos - yes\n```", "back": "Level 2"}, {"id": "steps_fc_63", "category": "steps", "front": "```\nWhat level is the step?\n11 turns/steps\nRotation - yes\nBody - yes\nR and L combos - no\n```", "back": "Level 3"}, {"id": "steps_fc_64", "category": "steps", "front": "```\nWhat level is the step?\n4 turns/steps\nRotation - yes\nBody - yes\nR and L combos - no\n```", "back": "Level Base"}, {"id": "steps_fc_65", "category": "steps", "front": "```\nWhat level is the step?\n8 turns/steps\nRotation - no\nBody - no\nR and L combos - no\n```", "back": "Level 1"}, {"id": "steps_fc_66", "category": "steps", "front": "```\nWhat level is the step?\n6 turns/steps\nRotation - no\nBody - no\nR and L combos - yes\n```", "back": "Level 1"}, {"id": "steps_fc_67", "category": "steps", "front": "```\nWhat level is the step?\n12 turns/steps\nRotation - no\nBody - yes\nR and L combos - no\n```", "back": "Level 2"}, {"id": "steps_fc_68", "category": "steps", "front": "```\nWhat level is the step?\n4 turns/steps\nRotation - no\nBody - no\nR and L combos - no\n```", "back": "Level Base"}, {"id": "steps_fc_69", "category": "steps", "front": "```\nWhat level is the step?\n8 turns/steps\nRotation - yes\nBody - no\nR and L combos - no\n```", "back": "Level 2"}, {"id": "steps_fc_70", "category": "steps", "front": "```\nWhat level is the step?\n9 turns/steps\nRotation - yes\nBody - no\nR and L combos - no\n```", "back": "Level 2"}, {"id": "steps_fc_71", "category": "steps", "front": "```\nWhat level is the step?\n11 turns/steps\nRotation - no\nBody - yes\nR and L combos - no\n```", "back": "Level 2"}, {"id": "steps_fc_72", "category": "steps", "front": "```\nWhat level is the step?\n8 turns/steps\nRotation - no\nBody - yes\nR and L combos - yes\n```", "back": "Level 2"}, {"id": "steps_fc_1", "category": "steps", "front": "RBO 3-Turn Direction", "back": "L / CCW"}, {"id": "steps_fc_2", "category": "steps", "front": "LBI 3-Turn Direction", "back": "L / CCW"}, {"id": "steps_fc_3", "category": "steps", "front": "RFI Bracket Direction", "back": "R / CW"}, {"id": "steps_fc_4", "category": "steps", "front": "RBO Bracket Direction", "back": "R / CW"}, {"id": "steps_fc_5", "category": "steps", "front": "LFI Twizzle Direction", "back": "R / CW"}, {"id": "steps_fc_6", "category": "steps", "front": "LBO Choctaw Direction", "back": "R / CW"}, {"id": "steps_fc_7", "category": "steps", "front": "LBO Bracket Direction", "back": "L / CCW"}, {"id": "steps_fc_8", "category": "steps", "front": "RFI Rocker Direction", "back": "L / CCW"}, {"id": "steps_fc_9", "category": "steps", "front": "LBI turns/steps that turn CW/R", "back": "Brackets; Counters; Choctaws"}, {"id": "steps_fc_10", "category": "steps", "front": "LFI Loop Direction", "back": "R / CW"}, {"id": "steps_fc_11", "category": "steps", "front": "Counters &amp; Rockers definition", "back": "- enter on one lobe and exit on another lobe\n- the same edge is maintained throughout the turn"}, {"id": "steps_fc_12", "category": "steps", "front": "LBI Choctaw Direction", "back": "R / CW"}, {"id": "steps_fc_13", "category": "steps", "front": "LFO Bracket Direction", "back": "R / CW"}, {"id": "steps_fc_14", "category": "steps", "front": "RBO Rocker Direction", "back": "L / CCW"}, {"id": "steps_fc_15", "category": "steps", "front": "LBI turns/steps that turn CCW/L", "back": "3-Turns; Rockers; Loops; Twizzles"}, {"id": "steps_fc_16", "category": "steps", "front": "LBO 3-Turn Direction", "back": "R / CW"}, {"id": "steps_fc_17", "category": "steps", "front": "RFI Counter Direction", "back": "R / CW"}, {"id": "steps_fc_18", "category": "steps", "front": "RBI turns/steps that turn CW/R", "back": "3-Turns; Rockers; Loops; Twizzles"}, {"id": "steps_fc_19", "category": "steps", "front": "LFI Counter Direction", "back": "L / CCW"}, {"id": "steps_fc_20", "category": "steps", "front": "RFI Twizzle Direction", "back": "L / CCW"}, {"id": "steps_fc_21", "category": "steps", "front": "LBO Rocker Direction", "back": "R / CW"}, {"id": "steps_fc_22", "category": "steps", "front": "LBI Twizzle Direction", "back": "L / CCW"}, {"id": "steps_fc_23", "category": "steps", "front": "LFI turns/steps that turn CCW/L", "back": "Brackets; Counters"}, {"id": "steps_fc_24", "category": "steps", "front": "RFI turns/steps that turn CW/R", "back": "Brackets; Counters"}, {"id": "steps_fc_25", "category": "steps", "front": "LFI Rocker Direction", "back": "R / CW"}, {"id": "steps_fc_26", "category": "steps", "front": "RFI turns/steps that turn CCW/L", "back": "3-Turns; Rockers; Loops; Twizzles; Choctaws"}, {"id": "steps_fc_27", "category": "steps", "front": "LBO Counter Direction", "back": "L / CCW"}, {"id": "steps_fc_28", "category": "steps", "front": "LBI Bracket Direction", "back": "R / CW"}, {"id": "steps_fc_29", "category": "steps", "front": "LFO Loop Direction", "back": "L / CCW"}, {"id": "steps_fc_30", "category": "steps", "front": "LFO turns/steps that turn CCW/L", "back": "3-Turns; Rockers; Loops; Twizzles"}, {"id": "steps_fc_31", "category": "steps", "front": "RFO Loop Direction", "back": "R / CW"}, {"id": "steps_fc_32", "category": "steps", "front": "LFO 3-Turn Direction", "back": "L / CCW"}, {"id": "steps_fc_33", "category": "steps", "front": "RBI turns/steps that turn CCW/L", "back": "Brackets; Counters; Choctaws"}, {"id": "steps_fc_34", "category": "steps", "front": "RBI Choctaw Direction", "back": "L / CCW"}, {"id": "steps_fc_35", "category": "steps", "front": "RFO Bracket Direction", "back": "L / CCW"}, {"id": "steps_fc_36", "category": "steps", "front": "LBO Twizzle Direction", "back": "R / CW"}, {"id": "steps_fc_37", "category": "steps", "front": "LFI Choctaw Direction", "back": "R / CW"}, {"id": "steps_fc_38", "category": "steps", "front": "RBO turns/steps that turn CCW/L", "back": "3-Turns; Rockers; Twizzles; Loops; Choctaws"}, {"id": "steps_fc_39", "category": "steps", "front": "Choctaw Definition", "back": "- a step from one foot to the other in which the curve of the exit edge is opposite to that of the entry edge\n- change of foot is directly from outside edge to inside edge or vice versa and from forward to backward or vice versa"}, {"id": "steps_fc_40", "category": "steps", "front": "RBI Counter Direction", "back": "L / CCW"}, {"id": "steps_fc_41", "category": "steps", "front": "RFO turns/steps that turn CCW/L", "back": "Brackets; Counters; Choctaws"}, {"id": "steps_fc_42", "category": "steps", "front": "RBI Bracket Direction", "back": "L / CCW"}, {"id": "steps_fc_43", "category": "steps", "front": "LFI Bracket Direction", "back": "L / CCW"}, {"id": "steps_fc_44", "category": "steps", "front": "LBI Rocker Direction", "back": "L / CCW"}, {"id": "steps_fc_45", "category": "steps", "front": "RFO Choctaw Direction", "back": "L / CCW"}, {"id": "steps_fc_46", "category": "steps", "front": "RBI Loop Direction", "back": "R / CW"}, {"id": "steps_fc_47", "category": "steps", "front": "LBO turns/steps that turn CCW/L", "back": "Brackets; Counters"}, {"id": "steps_fc_48", "category": "steps", "front": "RBO Counter Direction", "back": "R / CW"}, {"id": "steps_fc_49", "category": "steps", "front": "LBO Loop Direction", "back": "R / CW"}, {"id": "steps_fc_50", "category": "steps", "front": "RFO 3-Turn Direction", "back": "R / CW"}, {"id": "steps_fc_51", "category": "steps", "front": "LFO Twizzle Direction", "back": "L / CCW"}, {"id": "steps_fc_52", "category": "steps", "front": "RFO turns/steps that turn CW/R", "back": "3-Turns; Rockers; Loops; Twizzles"}, {"id": "steps_fc_53", "category": "steps", "front": "LBI Loop Direction", "back": "L / CCW"}, {"id": "steps_fc_54", "category": "steps", "front": "RFI Loop Direction", "back": "L / CCW"}, {"id": "steps_fc_55", "category": "steps", "front": "RFI Choctaw Direction", "back": "L / CCW"}, {"id": "steps_fc_56", "category": "steps", "front": "LBI Counter Direction", "back": "R / CW"}, {"id": "steps_fc_57", "category": "steps", "front": "LFO Choctaw Direction", "back": "R / CW"}, {"id": "steps_fc_58", "category": "steps", "front": "Loops &amp; Twizzles definition", "back": "- enter and exit on the same lobe like 3-turns and brackets\n- loops maintain the same edge throughout the turn like counters and rockers\n- twizzles are quickly rotated with a continuous (uninterrupted) action and are not on an edge during the actual turn"}, {"id": "steps_fc_59", "category": "steps", "front": "RBI Twizzle Direction", "back": "R / CW"}, {"id": "steps_fc_60", "category": "steps", "front": "LFO Counter Direction", "back": "R / CW"}, {"id": "steps_fc_61", "category": "steps", "front": "RFO Twizzle Direction", "back": "R / CW"}, {"id": "steps_fc_62", "category": "steps", "front": "RBO Twizzle Direction", "back": "L / CCW"}, {"id": "steps_fc_63", "category": "steps", "front": "RBI Rocker Direction", "back": "R / CW"}, {"id": "steps_fc_64", "category": "steps", "front": "LBO turns/steps that turn CW/R", "back": "3-Turns; Rockers; Loops; Twizzles; Choctaws"}, {"id": "steps_fc_65", "category": "steps", "front": "LFO turns/steps that turn CW/R", "back": "Brackets; Counters; Choctaws"}, {"id": "steps_fc_66", "category": "steps", "front": "RBO Loop Direction", "back": "L / CCW"}, {"id": "steps_fc_67", "category": "steps", "front": "RBO Choctaw Direction", "back": "L / CCW"}, {"id": "steps_fc_68", "category": "steps", "front": "LFO Rocker Direction", "back": "L / CCW"}, {"id": "steps_fc_69", "category": "steps", "front": "LFI turns/steps that turn CW/R", "back": "3-Turns; Rockers; Loops; Twizzles; Choctaws"}, {"id": "steps_fc_70", "category": "steps", "front": "LFI 3-Turn Direction", "back": "R / CW"}, {"id": "steps_fc_71", "category": "steps", "front": "RBI 3-Turn Direction", "back": "R / CW"}, {"id": "steps_fc_72", "category": "steps", "front": "3 Turns &amp; Brackets definition", "back": "- enter and exit from the same lobe\n- the change of edge occurs at the top of the turn when the blade changes direction"}, {"id": "steps_fc_73", "category": "steps", "front": "RFO Rocker Direction", "back": "R / CW"}, {"id": "steps_fc_74", "category": "steps", "front": "RFO Counter Direction", "back": "L / CCW"}, {"id": "steps_fc_75", "category": "steps", "front": "RBO turns/steps that turn CW / R", "back": "Brackets; Counters"}, {"id": "steps_fc_76", "category": "steps", "front": "RFI 3-Turn Direction", "back": "L / CCW"}, {"id": "spins_flow_fc_1", "category": "spins", "front": "Relevant considerations for a Flying Spin in the Short Program", "back": "**_Flying Spin (SP):_**\n\n* No previous rotation on the ice before the take-off is permitted \n* Step-over must be considered by Tech panel adding \"V\" to reduce Base Value and by Judges in the GOE \n* The name of the flying spin corresponds to its landing position \n* Flying position may be different than the landing position \n* Rules require a minimum 8 revolutions in the landing position, the lack of which is reflected by the Judges with the GOE \n* Required 8 revolutions can be executed in any variation of the landing position \n* Positions that are not basic are allowed, counted in the total number of revolutions required by the Rules, but are not valid for level features \n* Concluding upright position at the end of the spin (final wind-up) is not considered to be another position independent of the number of revolutions, as long as no additional feature is executed"}, {"id": "spins_flow_fc_2", "category": "spins", "front": "Relevant considerations for a **_Spin in One Position WITH NO Change of Foot_** in the ***Women's Short Program***", "back": "**Spin in One Position With No Change of Foot (Women's SP):**\n\n* Minimum of 2 revolutions without interruption in a basic positoin\n* Spin cannot be commenced with a jump\n* Position must be different from the landing position of the Flying Spin\n* Spin cannot change foot\n* Minimum number of revolutions required by the Rules is eight (8)\n* Positions that are not basic are allowed, counted in the total number of revolutions required by the Rules, but are not valid for Level features\n* The concluding upright spin at the end of the spin (final wind-up) is not considered to be another position independent of the number of revolutions, as long as in such a final windup no additional feature is executed (change of edge, variation of position, etc.)"}, {"id": "spins_flow_fc_3", "category": "spins", "front": "Relevant considerations for a **_Spin in One Position WITH Change of Foot_** in the ***Men's Short Program***", "back": "**Spin in One Position With Change of Foot (Men's SP):**\n\n* Minimum of 2 revolutions without interruption in a basic positoin\n* Spin cannot be commenced with a jump \n* Position must be different from the landing position of the Flying Spin\n* Change of foot in any spin must be preceded and followed by a spin position with at least three (3) revolutions. If this requirement is not fulfilled the spin will be \"No Value\" in SP \n* If the spinning centers (before and after the change of foot) are too far apart and the criteria of \"two spins\" is fulfilled, the spin is not fulfilling requirements and no value will be given \n* If a second change of foot is attempted, the spin is a wrong element and will receive \"No Value\"\n* Minimum number of revolutions on each foot as required by the Rules is six (6)\n* Positions that are not basic are allowed, counted in the total number of revolutions required by the Rules, but are not valid for Level features\n* The concluding upright spin at the end of the spin (final wind-up) is not considered to be another position independent of the number of revolutions, as long as in such a final windup no additional feature is executed (change of edge, variation of position, etc.)"}, {"id": "spins_flow_fc_4", "category": "spins", "front": "Relevant considerations for a **_Spin Combination_** in the ***Short Program***", "back": "**Spin Combination (SP):**\n\n* Must include a minimum of two different basic positions with 2 revolutions in each of these positions anywhere within the spin (will receive a \"V\" to reduce base value) \n* To receive full value, a Spin combination must include all three basic positions \n* The number of revolutions in positions that are non-basic is counted in the total number of revolutions \n* Changing to a non-basic is not considered as a change of position \n* The change of foot is required in the SP \n* A change of foot may be executed in the form of a step-over or a jump \n* The change of foot and the change of position may be made at either at the same time or separately \n* The change of foot in any spin must be preceded and followed by a spin position with at least three (3) revolutions. If this requirement is not fulfilled the spin will be \"No Value\" in the Short Program \n* The second change of foot (if attempted) in a spin with change of foot is not allowed in Short Program (wrong element) and will be \"No Value\" \n* If, in a spin with change of foot, there is a curve of exit after the first part and a curve of entry into the second part, the spin is not fulfilling the requirements and no value will be given"}, {"id": "spins_flow_fc_5", "category": "spins", "front": "Key considerations when assessing the:\n\n***Camel Forward Difficult Variation***", "back": "***Camel Forward Difficult Variation***\n\n1. Is the free leg backwards with the knee higher than the hip level? \n2. Are the shoulder lines parallel to the ice? \n3. Does the position require more physical strength ***_and_*** does it have an effect on the main body core? \n4. Is the difficult position held for at least 2 revolutions without interruption? \n5. Is this the first time this DV is attempted?"}, {"id": "spins_flow_fc_6", "category": "spins", "front": "Key considerations when assessing the:\n\n***Camel Sideways Difficult Variation***", "back": "***Camel Sideways Difficult Variation***\n\n1. Is the free leg backwards with the knee higher than the hip level? \n2. **Is the shoulder line twisted to a vertical position?**\n3. Does the position require more physical strength ***_and_*** does it have an effect on the main body core?\n4. Is the difficult position held for at least 2 revolutions without interruption?\n5. Is this the first time this DV is attempted?\n\n* Helpful questions when assessing difficulty of the Camel Side difficult variation:*\n* Is the bottom should in line with the top shoulder, making a line perpendicular to the ice?*"}, {"id": "spins_flow_fc_7", "category": "spins", "front": "Key considerations when assessing the:\n\n***Camel Upward Difficult Variation***", "back": "***Camel Upward Difficult Variation***\n\n1. Is the free leg backwards with the knee higher than the hip level? \n2. **Is the shoulder line twisted to _MORE THAN_ a vertical position?**\n3. Does the position require more physical strength ***_and_*** does it have an effect on the main body core? \n4. Is the difficult position held for at least 2 revolutions without interruption? \n5. Is this the first time this DV is attempted? \n\n* Helpful questions when assessing difficulty of the Camel Side difficult variation:*\n* Is the bottom shoulder twisted to a position where it is not directly below the top shoulder?*"}, {"id": "spins_flow_fc_8", "category": "spins", "front": "Key considerations when assessing the:\n\n***Sit Forward Difficult Variation***", "back": "***Sit Forward Difficult Variation***\n\n1. Is the upper part of the skating leg at least parallel to the ice? [1]\n2. **Is the free leg forward? [2]\n3. Does the position require more physical strength ***_and_*** does it have an effect on the main body core? [3]\n4. Is the difficult position held for at least 2 revolutions without interruption? [4]\n5. Is this the first time this DV is attempted? [5]\n\n1 Sp - R - Gen (iii) (B)\n2 Sp - C - Var - DVs (i) (B) (1)\n3 Sp - C - Var - Difficult (i) \n4 Sp - C - Var - Difficult (ii)\n5 Sp - C - Var - Reps (i)"}, {"id": "spins_flow_fc_9", "category": "spins", "front": "Key considerations when assessing the:\n\n***Sit Side Difficult Variation***", "back": "***Sit Side Difficult Variation***\n\n1. Is the upper part of the skating leg at least parallel to the ice? \n2. **Is the free leg sideways? \n3. **Does the position must also include a difficult variation which is a movement of a body part/leg/arm/hand/head** \n4. Does the position require more physical strength ***_and_*** does it have an effect on the main body core? \n5. Is the difficult position held for at least 2 revolutions without interruption?\n6. Is this the first time this DV is attempted?\n\n* Helpful questions when assessing difficulty of the Sit Side difficult variation:*\n1. *Is the free leg in a 2 or 3 o'clock position? (The more the free leg is to the side (i.e. distance between the knees), the more difficult the position*"}, {"id": "spins_flow_fc_10", "category": "spins", "front": "Key considerations when assessing the:\n\n***Sit Behind Difficult Variation***", "back": "***Sit Behind Difficult Variation***\n\n1. Is the upper part of the skating leg at least parallel to the ice? [1]\n2. **Is the free leg behind? [2]\n3. Does the position require more physical strength ***_and_*** does it have an effect on the main body core? [3]\n4. Is the difficult position held for at least 2 revolutions without interruption? [4]\n5. Is this the first time this DV is attempted? [5]\n\nReferences:\n1 Sp - R - Gen (iii) (B)\n2 Sp - C - Var - DVs (i) (B) (3)\n3 Sp - C - Var - Difficult (i) \n4 Sp - C - Var - Difficult (ii)\n5 Sp - C - Var - Reps (i)"}, {"id": "spins_flow_fc_11", "category": "spins", "front": "Key considerations when assessing the:\n\n***Upright Forward Difficult Variation***", "back": "***Upright Forward Difficult Variation***\n\n1. Is the skating leg extended or slightly bent? \n2. **Is the torso leaning forward? \n3. Does the position require more physical strength ***_and_*** does it have an effect on the main body core? \n4. Is the difficult position held for at least 2 revolutions without interruption? \n5. Is this the first time this DV is attempted?"}, {"id": "spins_flow_fc_12", "category": "spins", "front": "Key considerations when assessing the:\n\n***Upright Straight or Sideways Difficult Variation***", "back": "***Upright Straight or Sideways Difficult Variation***\n\n1. Is the skating leg extended or slightly bent? \n2. **Is the torso straight up or leaning sideways? \n3. Does the position require more physical strength ***_and_*** does it have an effect on the main body core? \n4. Is the difficult position held for at least 2 revolutions without interruption? \n5. Is this the first time this DV is attempted? \n\nOR:\n\n1. **Is the spin a crossfoot spin executed on both feet with equal weight distribution?"}, {"id": "spins_flow_fc_13", "category": "spins", "front": "Key considerations when assessing the:\n\n***Upright Biellmann Difficult Variation***", "back": "***Upright Biellmann Difficult Variation***\n\n1. Is the skating leg extended or slightly bent? \n2. **Is the free leg pulled from behind to a position higher than and towards the top of the head, close to the spinning axis of the skater? \n3. Does the position require more physical strength ***_and_*** does it have an effect on the main body core? \n4. Is the difficult position held for at least 2 revolutions without interruption? \n5. Is this the first time this DV is attempted?"}, {"id": "spins_flow_fc_14", "category": "spins", "front": "Key considerations when assessing the:\n\n***Upright Layback Difficult Variation***", "back": "***Upright Layback Difficult Variation***\n\n1. Is the skating leg extended or slightly bent? \n2. **Are the head and shoulders leaning backwards with the back arched? \n3. Does the position require more physical strength ***_and_*** does it have an effect on the main body core? \n4. Is the difficult position held for at least 2 revolutions without interruption? \n5. Is this the first time this DV is attempted?"}, {"id": "spins_flow_fc_15", "category": "spins", "front": "Key considerations when assessing the:\n\n***Non-Basic Position Difficult Variation***", "back": "***Non-Basic Position Difficult Variation***\n\n1. Is the position not a camel, sit or upright position? \n2. Does the position require more physical strength ***_and_*** does it have an effect on the main body core? \n3. Is the difficult position held for at least 2 revolutions without interruption? \n4. Is this the first time this DV is attempted? \n\n* [References:\n1 Sp - R - Gen (iv)\n2 Sp - C - Var - Difficult (i) \n3 Sp - C - Var - Difficult (ii)\n4 Sp - C - Var - Reps (i)]*"}, {"id": "spins_flow_fc_16", "category": "spins", "front": "Key considerations when assessing the:\n\n***Change of foot executed by jump***", "back": "***Change of foot executed by jump:***\n\n1. Is there a **clear jump** that requires ***_significant strength_***?  [1]\n2. Does the skater *_reach the basic position within the first two revolutions after the landin_**g*?  [2]\n3. Is this the first time this feature is attempted?  [3]\n\n* [References:\n1 Sp - C - CFJ (ii)\n2 Sp - C - CFJ (ii)\n3 Sp - L - i]*"}, {"id": "spins_flow_fc_17", "category": "spins", "front": "Key considerations when assessing the:\n\n***Jump within a spin without changing feet***", "back": "***Jump within a spin without changing feet:***\n\n1. Is there a **clear jump** that requires ***_significant strength_***?  [1]\n2. Does the jump land on the same foot it started with?  [2]\n3. Does the skater *_reach the basic position within the first two revolutions after the landin_**g*?  [3]\n4. Is this the first time this feature is attempted?  [3]\n\n* [References:\n1 Sp - C - JWS (ii)\n2 Sp - C - JWS (i)\n3 Sp - C - JWS (i)\n4 Sp - L - i]*"}, {"id": "spins_flow_fc_18", "category": "spins", "front": "Key considerations when assessing the:\n\n***Difficult change of position on the same foot***", "back": "***Difficult change of position on the same foot:***\n\n1. Is there a basic position held for at least two revolutions?  [1]\n2. Is there continuous movement performed throughout the change without establishing a non-basic position and without executing a jump or change of foot?  [2, 3, 4]\n3. Did the change require significant strength, skill, and control and having an impact on the ability to execute the position change?  [2]\n4. Is there a different basic position for at least two revolutions after the change?  [1]\n5. Is this the first time this feature is attempted?  [5]\n\n* Helpful pointer when assessing if change is difficult:*\n* Does the radius of the skater go from smaller to larger?*\n*  [References:\n1 Sp - C - D\u00e2\u02c6\u2020 (iv)\n2 Sp - C - D\u00e2\u02c6\u2020 (i)\n3 Sp - C - D\u00e2\u02c6\u2020 (ii)\n4 Sp - C - D\u00e2\u02c6\u2020 (iii)\n5 Sp - L - i]*"}, {"id": "spins_flow_fc_19", "category": "spins", "front": "Key considerations when assessing the:\n\n***Difficult entrance***", "back": "***Difficult extrance:***\n\n1. Is this the first time this feature is clearly attempted?  [1]\n2. Is the attempted difficult entrance performed on the first spinning foot?  [2]\n3. Does the entrance have a significant impact on the balance, control and execution of the spin?  [2]\n4. Is the intended basic (or non-basic for spin combinations) position reached within two revolutions?  [3]\n\n* [References:\n1 Sp - L - i\n2 Sp - C - DE (ii)(B)\n3 Sp - C - DE(ii)(C)]*"}, {"id": "spins_flow_fc_20", "category": "spins", "front": "Key considerations when assessing the:\n\n***Difficult exit***", "back": "***Difficult exit:***\n\n1. Is this the first time this feature is clearly attempted?  [1]\n2. Does the exit movement or jump have a significant impact on the balance, control and execution of the spin?  [2]\n\n* [References:\n1 Sp - L - i\n2 Sp - C - DE (iii)(B)]*"}, {"id": "spins_flow_fc_21", "category": "spins", "front": "Key considerations when assessing the:\n\n***Clear change of edge***", "back": "***Clear change of edge:***\n\n1. Is the skater in one of the following position:  [1]\n    * Sit position (from BI to FO)\n    * Camel position\n    * Layback position\n    * Biellmann position\n    * DV of an Upright position\n2. Does the skater maintain this position continuously while performing at least two revolutions on one edge followed by at least two revolutions on the other edge?  [2]\n3. Is this the first time this feature is attempted?  [3]\n\n*  [References:\n1 Sp - C - \u00e2\u02c6\u2020E (i)]*\n*  [2 Sp - C - \u00e2\u02c6\u2020E (iii)\n3 Sp - L - i]*"}, {"id": "spins_flow_fc_22", "category": "spins", "front": "Key considerations when assessing the:\n\n***All 3 basic positions on the second foot***", "back": "***All 3 basic positions on the second foot:***\n\n1. Does the skater attempt this feature on the 2nd foot (first change of foot) of the combination spin?  [1]\n2. Does the skater performed each of the basic positions for at least two revolutions without changing feet?  [2]\n3. Is this the first time this feature is attempted?  [3]\n\n*  [References:\n1 Sp - C - 3P (ii)]*\n*  [2 Sp - C - 3P (i)\n3 Sp - L - i]*"}, {"id": "spins_flow_fc_23", "category": "spins", "front": "Key considerations when assessing the:\n\n***Both directions immediately following each other***", "back": "***Both directions immediately following each other:***\n\n1. Does the skater complete at least three revolutions in the first direction?  [1]\n2. Does the skater complete and camel and/or sit position for at least 2 revolutions per basic position in the first direction?  [1, 2]\n3. Does the skater change direction without doing an upright or non-basic position?  [2]\n4. Does the skater change direction without a weight transfer?  [3]\n5. Does the skater complete at least three revolutions in the second direction?  [1]\n6. Does the skater achieve a camel and/or sit position in the second direction for at least two revolutions?  [1, 2]\n7. Is this the first time this feature is attempted?  [4]\n\n*  [References:\n1 Sp - C - BD (i)]*\n*  [2 Sp - C - BD (ii)\n3 Sp - R - G (x)\n4 Sp - L - i]*"}, {"id": "spins_flow_fc_24", "category": "spins", "front": "Key considerations when assessing the:\n\n***Clear increase of speed***", "back": "***Clear increase of speed:***\n\n1. Did the skater establish one of the following positions:  [1]\n    * Camel\n    * Sit\n    * Layback\n    * Biellmann\n    * DV of Upright positions (except corssfoot spin)\n2. Did the skater perform a clear increase of speed within that basic position or while going within a basic position into its variation?  [2]\n3. Is this the first time this feature is attempted?  [3]\n\n* Helpful hint:*\n* Always looks slower in review, try to award in real time when possible*\n\n*  [References:\n1 Sp - C - IS (i)]*\n*  [2 Sp - C - IS (ii)\n3 Sp - L - i]*"}, {"id": "spins_flow_fc_25", "category": "spins", "front": "Key considerations when assessing the:\n\n***8 revolutions***", "back": "***8 revolutions:***\n\n1. Does the skater establish one of the following positions?  [1]\n    * For all spins\n        * Camel\n        * Layback\n        * DV of any BP\n    * For spin combinations only\n        * DV of NBP\n2. Does the skater maintain this position for at least eight (8) revolutions without changes in variation, position, foot or edge?  [2]\n3. Is this the first time this feature is *_successfully performed_*?  [3]\n\n*  [References:\n1 Sp - C - 8 Revs (ii)]*\n*  [2 Sp - C - 8 Revs (i)\n3 Sp - L - i]*"}, {"id": "spins_flow_fc_26", "category": "spins", "front": "Key considerations when assessing the:\n\n***Difficult variation of flying entry***", "back": "***Difficult variation of flying entry:***\n\n1. Is there a clear visible jump?  [1]\n2. Is the flying position difficult?  [1]\n3. Is the landing foot of the jump the first spinning foot?  [2]\n4. Is the intended basic position reached within the first two revolutions after the landing of the jump?  [3]\n5. Is this the first time the level feature is attempted?  [4]\n\n*  [References:\n1 Sp - C - Ent/Exit - DF (i)]*\n*  [2 Sp - C - Ent/Exit - DF (ii)\n3 Sp - R - SP FSp Req (i)\n4 Sp - L - i]*"}, {"id": "spins_flow_fc_27", "category": "spins", "front": "Key considerations when assessing the:\n\n***One clear change of position backwards-sideways***", "back": "***One clear change of position backwards-sideways or reverse**:***\n\n1. Does the skater establish a Layback position, in which the head and shoulders are leaning backwards with the back arched?  [1]\n2. Does the skater maintain the Layback position for at least two (2) revolutions?  [2]\n3. Does the skater change to a sideways leaning position while maintaining the arch and without arising to an upright position?  [3]\n4. Does the skater achieve a sideways leaning position, in which the head and shoulders are leaning sideways and the upper body is arched?  [4]\n5. Does the skater maintain this Sideways Leaning position for at least two (2) revolutions?  [2]\n6. Is this the first time the level feature is attempted?  [5]\n\nSideway leaning spin - head and shoulders\n\n*  [References:\n1 Sp - R - Gen (v)]*\n*  [2 Sp - C - Pos - B-S/S-B (ii)]*\n*  [3 Sp - C - Pos - B-S/S-B (i)\n4 Sp - R - Gen (vi)\n5 Sp - L - i]*"}, {"id": "spins_flow_fc_28", "category": "spins", "front": "Key considerations when assessing the:\n\n***One clear change of position sideways-backwards***", "back": "***One clear change of position sideways-backwards**:***\n\n1. Does the skater achieve a sideways leaning position, in which the head and shoulders are leaning sideways and the upper body is arched?  [1]\n2. Does the skater maintain the Sideways Leaning position for at least two (2) revolutions?  [2]\n3. Does the skater change to a layback position while maintaining the arch and without arising to an upright position?  [3]\n4. Does the skater establish a Layback position, in which the head and shoulders are leaning backwards with the back arched?  [4]\n5. Does the skater maintain the Layback position for at least two (2) revolutions?  [2]\n6. Is this the first time the level feature is attempted?  [5]\n\n*Helpful hint: Sideways leaning spin - head and shoulders should be leaning towards a 3 or 9 o'clock position (not 2 or 10 o'clock)*\n\n*  [References:\n1 Sp - R - Gen (vi)]*\n*  [2 Sp - C - Pos - B-S/S-B (ii)]*\n*  [3 Sp - C - Pos - B-S/S-B (i)\n\u00e2\u20ac\u20394 Sp - R - Gen (v)\n5 Sp - L - i]*"}, {"id": "spins_flow_fc_29", "category": "spins", "front": "Key considerations when assessing the:\n\n***Biellmann position after LSp in SP***", "back": "***One clear change of position sideways-backwards**:***\n\n1. Does the skater achieve at least 8 revolutions in the Layback spin before attempting this level feature?  [1]\n2. Is the skater's free leg pulled from behind to a position higher than and towards the top of the head, close to the spinning axis of the skater?  [2]\n3. Is this Biellmann position maintained for at least two (2) revolutions?  [3]\n4. Is this the first time the level feature is attempted?  [4]\n\n*  [References:\n1 Sp - L - 13]*\n*  [2 Sp - C - Var - Biellmann (i)]*\n*  [3 Sp - C - Var - DV (ii)\n4 Sp - L - i]*"}, {"id": "spins_flow_fc_30", "category": "spins", "front": "Key considerations when assessing the:\n\n***Windmill (Illusion)***", "back": "***Windmill (Illusion)**:***\nCan be considered feature for difficult entry, difficult exit, DV NBP, or difficult change of position first time it's attempted\n\n1. Does the skater's head dip below their body to a 4 or 8 o'clock position?\n2. Does the skater's free leg reach a 2 or 10 o'clock position?\n3. Are the skaters head and free leg in a straight line?"}, {"id": "spins_fc_1", "category": "spins", "front": "A Spin that has no basic position with 2 revolutions will receive ____ and _____; however a spin with less than ____ revolutions is considered as a skating movement and not a spin.", "back": "A Spin that has no basic position with 2 revolutions will receive ***_NO LEVEL_*** and ***_NO VALUE_***, however a spin with less then ***_THREE (3)_*** revolutions is considered as a _skating movement and not a spin_.\n\n [*References:\nSp-R-General (i)*]"}, {"id": "spins_fc_2", "category": "spins", "front": "The minimum number of revolutions required in a position is **_?_** without interruption. In case this position is not fulfilled, the position is **_?_**.\n\nVariations of positions of the head, arms or free leg, as well as fluctuations of speed\n***_ARE / ARE NOT_*** permitted.", "back": "The minimum number of revolutions required in a position is ***_TWO (2)_*** without interruption. In case this requirement is not fulfilled, the position is ***_NOT COUNTED_***. [1]\n\nVariations of positions of the head, arms or free leg, as well as fluctuations of speed ***_ARE_*** permitted. [2]\n\n [*References:\n1 Sp - R - General (ii)(A)\n2 Sp - R - General (ii)(B)*]"}, {"id": "spins_fc_3", "category": "spins", "front": "What are the 3 basic positions?", "back": "* Camel\n* Sit\n* Upright\n\n [*References:\nSp - R- General (iii)*]"}, {"id": "spins_fc_4", "category": "spins", "front": "Define ***_'CAMEL POSITION'_***", "back": "Camel position -\n\n**Free leg backwards with the knee higher than the hip level**\n\n*However - Layback, Biellmann and similar variations are _still considered as upright spins_*\n\n [*Reference:\nSp - R - Gen (iii) (A)*]"}, {"id": "spins_fc_5", "category": "spins", "front": "Define ***_'SIT POSITION'_***", "back": "The upper part of the skating leg at least parallel to the ice\n\n* [References:\n1 Sp - R - General (iii)(B)]*"}, {"id": "spins_fc_6", "category": "spins", "front": "Define ***_'UPRIGHT POSITION'_***", "back": "Any position with skating leg extended or slightly bent which is not a camel position [1]\n\n* [References:\n1 Sp - R - General (iii)(C)]*"}, {"id": "spins_fc_7", "category": "spins", "front": "Any position which is not basic is a **_?_** position", "back": "Any position which is not basic is a ***_NON-BASIC_*** position [1]\n\n [*References:\n1 Sp - R - General (iv)*]"}, {"id": "spins_fc_8", "category": "spins", "front": "Define ***_'LAYBACK SPIN'_***", "back": "An upright spin in which head and shoulders are leaning backwards with the back arched. The position of the free leg is optional.\n\n [*References:\n1 Sp - R - General (v)*]"}, {"id": "spins_fc_9", "category": "spins", "front": "Define ***_'SIDEWAYS LEANING SPIN'_***", "back": "An upright spin in which head and shoulders are leaning sideways and the upper body is arched. The position of the free leg is optional.\n\n* [References:\n1 Sp - R - General (vi)]*"}, {"id": "spins_fc_10", "category": "spins", "front": "**In any spin** change of edge can only be counted if done in a **_?_**", "back": "**In any spin** change of edge can be counted only if done in a ***_BASIC POSITION_***\n\n* [References:\nSp - R - General (vii)]*"}, {"id": "spins_fc_11", "category": "spins", "front": "The change of foot in any spin must be preceded and followed by a spin position with at least **_?**_. If this requirement is not fulfilled the spin will be _**?**_ in Short Program and _**?_** in Free Skating.", "back": "The change of foot in any spin must be preceded and followed by a spin position with at least ***_THREE (3)***_. If this requirement is not fulfilled the spin will be _***NO VALUE***_ in Short Program and _***MARKED WITH A 'V'_***\u00e2\u20ac\u2039 in Free Skating.\n\n* [References:\nSp - R- General (viii)]*"}, {"id": "spins_fc_12", "category": "spins", "front": "If a skater falls when entering a spin, a spin or spinning movement ***_IS / IS NOT_*** allowed immediately after this fall with this spin with this spin/movement ***_BEING / NOT BEING_*** counted as an element.", "back": "If a skater falls when entering a spin, a spin or spinning movement **_IS_** allowed immediately after this fall *_(for filling time purpose)_* with this spin with this spin/movement **_NOT BEING_** counted as an element.\n\n* [References:\nSp - R - General (ix)]*"}, {"id": "spins_fc_13", "category": "spins", "front": "If there is a clear weight transfer during a spin, this ***_ENDS / DOES NOT END_*** the spin and **_?_** is called.", "back": "If there is a clear weight transfer during a spin, this **_ENDS_** the spin and **_ONLY THE FIRST PART BEFORE THE WEIGHT TRANSFER_** is called.\n\n [*References:\nSp - R - General (x)*]"}, {"id": "spins_fc_14", "category": "spins", "front": "If the spinning centers (before and after the change of foot) are too far apart and the criteria of \"two spins\" is fulfilled, only **_?_** will be called and considered for Levels features.", "back": "If the spinning centers (before and after the change of foot) are too far apart and the criteria of \"two spins\" is fulfilled, only **_THE PART BEFORE THE CHANGE OF FOOT_** will be called and considered for Levels features.\n\n* [References:\nSp - R - General (xi)]*"}, {"id": "spins_fc_15", "category": "spins", "front": "Define ***_'TWO SPINS'_*** criteria", "back": "there is a curve of exit after the first part and the curve of entry into the second part\n\n* [References:\nSp - R - General (xi)]*"}, {"id": "spins_fc_16", "category": "spins", "front": "**Spin combinations:**\n\nMust include a minimum of **_?_** different basic positions with **_?_** revolutions in each of those positions anywhere within the spin", "back": "**Spin combinations:**\n\nMust include a minimum of **_TWO**_ different basic positions with _**TWO_** revolutions in each of those positions anywhere within the spin [1]\n\n [*References:\n1 Sp - R - General (xiii) (A)*]"}, {"id": "spins_fc_17", "category": "spins", "front": "**Spin combinations:**\n\nChanging to a non-basic position ***_IS / IS NOT_*** considered as a change of position", "back": "**Spin combinations:**\n\nChanging to a non-basic position **_IS NOT_** considered as a change of position [1]\n\n* [References:\n1 Sp - R - General (xii) (B)]*"}, {"id": "spins_fc_18", "category": "spins", "front": "**Spin combinations:**\n\nA change of foot ***_MAY / MAY NOT_*** be executed in the form of a step over or a jump", "back": "**Spin combinations:**\n\nA change of foot **_MAY_** be executed in the form of a step over or a jump [1]\n\n* [References:\n1 Sp - R - General (xii) (C)]*"}, {"id": "spins_fc_19", "category": "spins", "front": "**Spin combinations:**\n\nThe change of foot and the change of position ***_MAY / MAY NOT_*** be made either at the same time or separately", "back": "**Spin combinations:**\n\nThe change of foot and the change of position **_MAY_** be made either at the same time or separately [1]\n\n [*References:\n1 Sp - R - General (xii) (D)*]"}, {"id": "spins_fc_20", "category": "spins", "front": "Define ***_'FLYING SPIN'_***", "back": "Spin with a flying entrance and no change of foot and position [1]\n\n [*References:\n1 Sp - R - General (xiii)*]"}, {"id": "spins_fc_21", "category": "spins", "front": "**Spin in one position and Flying spin:**\n\nPositions that are not basic ***_ARE / ARE NOT_*** allowed, ***_COUNTED / NOT COUNTED_*** in the total number of revolutions required by the Rules, and ***_ARE / ARE NOT_*** valid for Level features.", "back": "**Spin in one position and Flying spin:**\n\nPositions that are not basic **_ARE_** allowed, **_COUNTED_** in the total number of revolutions required by the Rules, *but* **_ARE NOT_** valid for Level features. [1]\n\n [*References:\n1 Sp - R - General (xiii)*]"}, {"id": "spins_fc_22", "category": "spins", "front": "**Spin in one position and Flying spin:**\n\nThe concluding upright position at the end of the spin (final wind-up) ***_IS / IS NOT_*** considered to be another position", "back": "**Spin in one position and Flying spin:**\n\nThe concluding upright position at the end of the spin (final wind-up) **_IS NOT_** considered to be another position *_independent of the number of revolutions; as long as in such a final wind-up no additional feature is executed (change of edge, variation of position etc.)_* [1]\n\n* [References:\n1 Sp - R - General (xiv)]*"}, {"id": "spins_fc_23", "category": "spins", "front": "**Flying spin:**\n\nWhen the spin is commenced with a jump, previous rotation on the ice before the take off ***_IS / IS NOT_*** permitted and a step-over must be considered by the Tech Panel by **_?_** and by the Judges in the **_?_** .", "back": "**Flying spin:**\n\nWhen the spin is commenced with a jump, previous rotation on the ice before the take off **_IS NOT_** permitted and a step-over must be considered by the Tech Panel by **_adding \"V\" to reduce the Base Value_** and by the Judges in the **_Grade of Execution_**.\n\n* [References:\nSp - R - General (xv)]*"}, {"id": "spins_fc_24", "category": "spins", "front": "How is the lack of required minimum spin revolutions reflected in the Short Program?", "back": "The lack of required spin revolutions in the Short Program is reflected\n\n**BY THE JUDGES IN THEIR MARKING**\n\n [*References:\nSp - R - SP (ii)*]"}, {"id": "spins_fc_25", "category": "spins", "front": "In the spin combination in the Short Program, the change of foot ***_IS / IS NOT_*** required", "back": "In the spin combination in the Short Program, the change of foot **_IS_** required\n\n* [References:\nSp - R - SP (iii)]*"}, {"id": "spins_fc_26", "category": "spins", "front": "Which spins in the short program can be commenced with a jump?\n\n* Flying spin\n* Spin in one position with/without change of foot\n* Spin combination", "back": "Which spins in the short program can be commenced with a jump?\n\n* **_FLYING SPIN_**\n* Spin in one position with/without change of foot\n* Spin combination\n\n* [References:\nSp - R - SP (iv)]*"}, {"id": "spins_fc_27", "category": "spins", "front": "*Ladies SP:*\n\n**Layback / Sideways Leaning Spin -**\n\nWhen can the Biellmann Spin be taken and considered as a feature to increase the Level?", "back": "*Ladies SP:*\nLayback / Sideways Leaning Spin -\n\n**Any position is permitted, as long as the basic layback or sideways leaning position is maintained for eight (8) revolutions without rising to an upright position**\n\n**The position of a \"Biellmann Spin\" can only be taken and considered as a feature to increase the level after having successfully rotated these required 8 revolutions in the layback position (backwards and/or sideways).**\n\n* [References:\nSp - R - SP Ladies LSp (i)]*"}, {"id": "spins_fc_28", "category": "spins", "front": "*Ladies SP:*\n\n**Layback / Sideways Leaning Spin -**\n\nIf a skater achieves the \"Biellmann Spin\", what additional features can be awarded if successfully performed?", "back": "*Ladies SP:*\n\nLayback / Sideways Leaning Spin -\n\n**CLEAR CHANGE OF EDGE *(feature 6)*\nCLEAR INCREASE OF SPEED *(feature 9)*\n8 REVOLUTIONS *(feature 10)***\n\n* [References:\nSp - R - SP Ladies LSp (ii)]*"}, {"id": "spins_fc_29", "category": "spins", "front": "*Senior Men's SP:*\n\n**Spin in One Position with Change of Foot**\n\nThe spin must include only **_?_** change of foot, which **_MAY / MAY NOT_** be executed by a step or a jump.", "back": "*Senior Men's SP:*\n\nSpin in One Position with Change of Foot\n\nThe spin must include only **_ONE_** change of foot, which **_MAY_** be executed by a step or a jump.\n\n* [References:\nSp - R - SP Mens Sp (i)]*"}, {"id": "spins_fc_30", "category": "spins", "front": "*Junior Men's SP:*\n\n**Spin in One Position with Change of Foot**\n\nThe spin must include only **_?_** change of foot, which **_MAY / MAY NOT_** be executed by a step or a jump.", "back": "*Junior Men's SP:*\n\nSpin in One Position with Change of Foot\n\nThe spin must include only **_ONE_** change of foot, which **_MAY_** be executed by a step or a jump.\n\n [*References:\nSp - R - SP Mens Sp (i)*]"}, {"id": "spins_fc_31", "category": "spins", "front": "*Senior & Junior Men's SP:*\n\n**Spin in One Position with Change of Foot**\n\nThe spin must have at least **_?_** revolutiona before **_AND / OR_** after the change of foot", "back": "*Senior & Junior Men's SP:*\n\nSpin in One Position with Change of Foot\n\n**The spin must have at least _THREE (3)_ revolutions before _AND_ after the change of foot.**\n\n* [References:\nSp - R - SP Mens Sp (iv)]*"}, {"id": "spins_fc_32", "category": "spins", "front": "*SP:*\n\n**Spin combination with change of foot**\n\nMust have a minimum of **_?_** \nTo receive full value, a Spin combination must include **_?_** \nThe number of revolutions in positions that are non-basic are **_?_** \nChanging to a non-basic position is **_?_**", "back": "*SP: Spin combination with change of foot*\n\n* Must have a minimum of **_TWO DIFFERENT BASIC POSITIONS WITH 2 REVOLUTIONS IN EACH OF THESE POSITIONS ANYWHERE WITHIN THE SPIN_**\n* To receive full value, a Spin combination must include **_ALL THREE BASIC POSITIONS_**\n* The number of revolutions in positions that are non-basic are **_COUNTED IN THE TOTAL NUMBER OF REVOLUTIONS_**\n* Changing to a non-basic position is **_NOT CONSIDERED AS A CHANGE OF POSITION_**\n\n*_References:_\nSp-R-SP CCoSp (i)*"}, {"id": "spins_fc_33", "category": "spins", "front": "*SP:*\n\n**Spin combination with change of foot**\n\nHow many changes of foot?\nMinimum revolutions on each foot?\nHow may the change of foot be executed?\nWhen does the change in foot have to occur in relation to the change of position?", "back": "*SP: Spin combination with change of foot*\n\n* Only **_ONE_** change of foot\n* Not less than **_SIX (6)_** revolutions on each foot\n* The change of foot may be executed in the form of **_A STEP OR A JUMP_**\n* The change of foot and the change of position may be **_MADE EITHER AT THE SAME TIME OR SEPARATELY_**\n\n*_References:_\nSp-R-SP CCoSp (ii)*"}, {"id": "spins_fc_34", "category": "spins", "front": "*SP:*\n\n**Flying Spin**\n\nThe name of the flynig spin corresponds to **_?_**", "back": "*SP:*\n\nFlying Spin\n\n**The name of the flynig spin corresponds to _ITS LANDING POSITION_**\n\n [*References:\nSp-R-SP FSp (i)*]"}, {"id": "spins_fc_35", "category": "spins", "front": "*SP:*\n\n**Flying Spin**\n\nA step-over must be considered by **_?_**", "back": "*SP:*\n\nFlying Spin\n\n**A step-over must be considered by the _JUDGES IN THE GOE_ and by the _TECHNICAL PANEL ADDING \"V\" TO REDUCE THE BASE VALUE_**\n\n [*References:\nSp-R-SP FSp (ii)*]"}, {"id": "spins_fc_36", "category": "spins", "front": "*SP:*\n\n**Flying Spin**\n\nT/F: The flying position may be different from the landing position", "back": "*SP:*\n\nFlying Spin\n\n**_TRUE_ - The flying position may be different from the landing position**\n\n [*References:\nSp-R-SP FSp (iii)*]"}, {"id": "spins_fc_37", "category": "spins", "front": "*SP:*\n\n**Flying Spin**\n\nRequired number of minimum revolutions", "back": "*SP:*\n\nFlying Spin\n\n**A minimum of EIGHT (8) revolutions in the landing positoin**\n\n**No previous rotation on the ice before the take-off is permitted**\n\n**The required eight (8) revolutions can be executed in any variation of the landing position**\n\n [*References:\nSp-R-SP FSp (iii) &amp; (iv)*]"}, {"id": "spins_fc_38", "category": "spins", "front": "*SP:*\n\nIf in Senior Men and Ladies the landing position of the Flying spin is the same that in the Spin in one position, **_?_** .", "back": "*SP:*\n\nIf in Senior Men and Ladies the landing position of the Flying spin is the same that in the Spin in one position, **_THE LAST PERFORMED OF THESE TWO SPINS WILL NOT BE COUNTED BY WILL OCCUPY A SPIN BOX._**\n\n [*References:\nSp-R-SP FSp REP (i)*]"}, {"id": "spins_fc_39", "category": "spins", "front": "*FS:*\n\nA well balanced Free Skating Program for Men & Ladies (Senior & Junior) mist contain a max of 3 spins, which are **_?_** .", "back": "*FS:*\n\nA well balanced Free Skating Program for Men & Ladies (Senior & Junior) mist contain a max of 3 spins:\n\n* *- ONE MUST BE A SPIN COMBINATION**\n* *- ONE A FLYING SPIN OR A SPIN WITH A FLYING ENTRANCE\n- ONE A SPIN WITH ONLY ONE POSITION**\n\n [*References:\nSp - R - FS (i)*]"}, {"id": "spins_fc_40", "category": "spins", "front": "*FS:*\n\nAny Spin with the same character (abbreviation) as the one executed before will **_?_** .", "back": "*FS:*\n\nAny Spin with the same character (abbreviation) as the one executed before **_WILL NOT BE COUNTED (BUT WILL OCCUPY A SPINNING BOX)_**\n\n [*References:\nSp - R - FS (ii)*]"}, {"id": "spins_fc_41", "category": "spins", "front": "*FS:*\n\nIf no performed spin has a flying entrance, or if there is no spin in one positoin, or no spin combination, the wrong executed spin **_?_** .", "back": "*FS:*\n\nIf no performed spin has a flying entrance, or if there is no spin in one positoin, or no spin combination, the wrong executed spin **_WILL BE AUTOMATICALLY DELETED BY THE COMPUTER_**\n\n [*References:\nSp - R - FS (iii)*]"}, {"id": "spins_fc_42", "category": "spins", "front": "*FS:*\n\nWhare the required number of revolutions for spins in the Free Skate?", "back": "*FS:*\n\nThe spins in the Free Skate must have a required minimum number of revolutions:\n\n**_SIX (6)_ for the flying spin and the spin with only one position**\n\n**_TEN (10)_ for the spin combination**\n\n [*References:\nSp - R - FS (iv)*]"}, {"id": "spins_fc_43", "category": "spins", "front": "*FS:*\n\nHow is the lack of required minimum revolutions refelcted?", "back": "*FS:*\n\nThe lack of required revolutions **_MUST BE REFLECTED BY JUDGES IN THEIR MARKING_**\n\n [*References:\nSp - R - FS (v)*]"}, {"id": "spins_fc_44", "category": "spins", "front": "*FS:*\n\nHow is the minimum number of revolutions in a spin counted?", "back": "*FS:*\n\nThe minimum number of required revolutions must be counted **_FROM THE ENTRY OF THE SPIN UNTIL ITS EXIT_ (except the final wind-up in Spins in one position and Flying spins)**\n\n [*References:\nSp - R - FS (v)*]"}, {"id": "spins_fc_45", "category": "spins", "front": "*FS:*\n\nIn the spin combination and spin in one position, the change of foot is **_OPTIONAL / REQUIRED?_**\n\nThe number of different positions in the spin combination is **_?_**", "back": "*FS:*\n\nIn the spin combination and spin in one position, the change of foot is **_OPTIONAL_**\n\nThe number of different positions in the spin combination is **_FREE_**\n\n [*Reference:\nSp - R - FS (vi)*]"}, {"id": "spins_fc_46", "category": "spins", "front": "*Level Features:*\n\nSpin Level Feature 1", "back": "*Spin Feature 1:*\n\n**DIFFICULT VARIATIONS**"}, {"id": "spins_fc_47", "category": "spins", "front": "*Level Features:*\n\nSpin Feature 2", "back": "*Spin Feature 2:*\n\n**CHANGE OF FOOT EXECUTED BY JUMP**"}, {"id": "spins_fc_48", "category": "spins", "front": "*Level Features:*\n\nSpin Feature 3", "back": "*Spin Feature 3:*\n\n**JUMP WITHIN A SPIN WITHOUT CHANGING FOOT**"}, {"id": "spins_fc_49", "category": "spins", "front": "*Level Features:*\n\nSpin Feature 4", "back": "*Spin Feature 4:*\n\n**DIFFICULT CHANGE OF POSITION ON THE SAME FOOT**"}, {"id": "spins_fc_50", "category": "spins", "front": "*Level Features:*\n\nSpin Feature 5", "back": "*Spin Feature 5:*\n\n**DIFFICULT ENTRANCE OR DIFFICULT EXIT**"}, {"id": "spins_fc_51", "category": "spins", "front": "*Level Features:*\n\nSpin Feature 6", "back": "*Spin Feature 6:*\n\n**CLEAR CHANGE OF EDGE IN SIT (only backward inside to forward outside), CAMEL, LAYBACK, BIELLMANN OR DIFFICULT VARIATION OF AN UPRIGHT POSITION**"}, {"id": "spins_fc_52", "category": "spins", "front": "*Level Features:*\n\nSpin Feature 7", "back": "*Spin Feature 7:*\n\n**ALL 3 BASIC POSITIONS ON THE SECOND FOOT**"}, {"id": "spins_fc_53", "category": "spins", "front": "*Level Features:*\n\nSpin Feature 8", "back": "*Spin Feature 8:*\n\n**BOTH DIRECTIONS IMMEDIATELY FOLLOWING EACH OTHER IN SIT OR CAMEL POSITION**"}, {"id": "spins_fc_54", "category": "spins", "front": "*Level Features:*\n\nSpin Feature 9", "back": "*Spin Feature 9:*\n\n**CLEAR INCREASE OF SPEED IN CAMEL, SIT, LAYBACK, BIELLMANN OR DIFFICULT VARIATION OF AN UPRIGHT POSITION (except in crossfit spin)**"}, {"id": "spins_fc_55", "category": "spins", "front": "*Level Features:*\n\nSpin Feature 10", "back": "*Spin Feature 10:*\n\n**AT LEAST 8 REVS WITHOUT CHANGES IN POSITION/VARIATION, FOOT OR EDGE (camel, layback, difficult variation of any basic position or for combinations only non-basic position)**"}, {"id": "spins_fc_56", "category": "spins", "front": "*Level Features:*\n\nSpin Feature 11", "back": "*Spin Feature 11:*\n\n**DIFFICULT VARIATION OF FLYING ENTRY IN FLYING SPINS / SPINS WITH A FLYING ENTRANCE**"}, {"id": "spins_fc_57", "category": "spins", "front": "*Level Features:*\n\nSpin Feature 12", "back": "*Spin Feature 12:*\n\n**ONE CLEAR CHANGE OF POSITION BACKWARDS-SIDEWAYS OR REVERS, AT LEAST 2 REVS IN EACH POSITION (counts also if the Layback position is part of any other spin)**"}, {"id": "spins_fc_58", "category": "spins", "front": "*Level Features:*\n\nSpin Feature 13", "back": "*Spin Feature 13:*\n\n**BIELLMAN POSITION AFTER LAYBACK SPIN (SP - after 8 revolutions in Layback spin for Junior/Senior)**"}, {"id": "spins_fc_59", "category": "spins", "front": "A \"spin with no change of position\", in which another basic position is executed with more than two (2) revolutions, ***_DOES / DOES NOT_*** fulfil the requirements of a spin with \"no change of position\" and will be identified as **_?_** .", "back": "A \"spin with no change of position\", in which another basic position is executed with more than two (2) revolutions, **_DOES NOT_** fulfil the requirements of a spin with \"no change of position\" and will be identified as **_a \"SPIN COMBINATION\"_**.\n\n* [References:\nSp \u00e2\u20ac\u201c C \u00e2\u20ac\u201c Pos \u00e2\u20ac\u201c No \u00e2\u02c6\u2020 (i)]*"}, {"id": "spins_fc_60", "category": "spins", "front": "In a \"spin with no change of position\", the concluding upright position at the end of the spin (final wind-up) ***_IS / IS NOT_*** considered to be another position **_?_** .", "back": "In a \"spin with no change of position\", the concluding upright position at the end of the spin (final wind-up) **_IS NOT_** considered to be another position **independent of the number of revolutions, as long as in such a final wind-up no additional feature is executed (change of edge, variation of position, etc.).**\n\n* [References:\nSp \u00e2\u20ac\u201c C \u00e2\u20ac\u201c Pos \u00e2\u20ac\u201c No \u00e2\u02c6\u2020 (ii)]*"}, {"id": "spins_fc_61", "category": "spins", "front": "In Free Skating a clear visible attempt of a spin combination which results in a spin with only 1 basic position with not less than 2 revolutions will be called by the Technical Panel as a spin combination **_?_** .", "back": "In Free Skating a clear visible attempt of a spin combination which results in a spin with only 1 basic position with not less than 2 revolutions will be called by the Technical Panel as a spin combination **_NO VALUE_**.\n\n* [Reference:\nSp \u00e2\u20ac\u201c C \u00e2\u20ac\u201c Pos - &lt;2 in BP (ii)]*"}, {"id": "spins_fc_62", "category": "spins", "front": "In Short Program a spin combination executed with only 1 basic position with not less than 2 revolutions and in all other positions less than 2 revolutions will receive **_?_** .", "back": "In Short Program a spin combination executed with only 1 basic position with not less than 2 revolutions and in all other positions less than 2 revolutions will receive **_NO VALUE_**.\n\n* [Reference:\nSp \u00e2\u20ac\u201c C \u00e2\u20ac\u201c Pos - &lt;2 in BP (i)]*"}, {"id": "spins_fc_63", "category": "spins", "front": "In the spin combination, in order to be counted as a Level feature, all three basic position must be executed on **_?_** .\n\nThis feature can be awarded only if **_?_** .", "back": "In the spin combination, in order to be counted as a Level feature, all three basic position must be executed on **_THE SECOND FOOT_**.\n\nThis feature can be awarded only if **_ITS EXECUTION IS NOT INTERRUPTED BY A CHANGE OF FOOT AND CANNOT BE AWARDED AFTER THE SECOND CHANGE OF FOOT_**.\n\n* [References:\nSp - C - Pos (3P) (i) &amp; (ii)]*"}, {"id": "spins_fc_64", "category": "spins", "front": "A spin combination with and without change of foot which includes only 2 basic positions with not less than 2 revolutions will have a ***_HIGHER / LOWER_*** base value in comparison with a spin combination with all 3 basic positions with not less than 2 revolutions and will be assigned **_?_** .", "back": "A spin combination with and without change of foot which includes only 2 basic positions with not less than 2 revolutions will have a **_LOWER_** base value in comparison with a spin combination with all 3 basic positions with not less than 2 revolutions and will be assigned **_a \"V\"_**.\n\n*The corresponding base values are listed in the SOV of the \"V\" row*\n\n_ [*References:*]_\n [*Sp - C - Pos CCoSpV (i)*]"}, {"id": "spins_fc_65", "category": "spins", "front": "Difficult change of position requirements (4 bullets)", "back": "i. Change from a basic position to a different basic position without establishing a non-basic position, requiring significant strength, skill and control and having an impact on the ability to execute the position change  [1]\nii. Continuous movement must be performed throughout the change  [2]\niii. May not include a jump to execute the change  [3]\niv. The basic positions before and after the change must be held for 2 revolutions  [4]\n\n* [References:\n1 Sp - C - Pos - D\u00e2\u02c6\u2020 (i)\n2 Sp - C - Pos - D\u00e2\u02c6\u2020 (ii)]*\n [*3 Sp - C - Pos - D\u00e2\u02c6\u2020 (iii)\n4 Sp - C - Pos - D\u00e2\u02c6\u2020 (iv)*]"}, {"id": "spins_fc_66", "category": "spins", "front": "Change of position not considered as difficult", "back": "If a change of position if not considered as \"difficult\" by the Technical Panel, it may be awarded in a later spin\n\n* [References:\nSp - C - Pos - Not D\u00e2\u02c6\u2020 (i)]*"}, {"id": "spins_fc_67", "category": "spins", "front": "In a spin in one position, if the skater executes a basic position and after that changes to a non-basic position, how is the spin considered?", "back": "If the skater executes a basic position and after that changes to a non-basic position, **this is not considered as a change of position and the spin does not become a combination spin**\n\n* [Reference:\nSp - C - Pos - BP to NBP (i)]*"}, {"id": "spins_fc_68", "category": "spins", "front": "In a spin in one position, if a skater executes a difficult variation of non-basic position, will the feature be counted in the spin?", "back": "If the skater executes a difficult variation of a non-basic position, **this feature will not be counted in this spin (for example a skater executes a camel spin where the feature of windmill (NBP) is included)**\n\n* [Reference:\nSp - C - Pos - BP to NBP (ii)]*"}, {"id": "spins_fc_69", "category": "spins", "front": "When will a clear change of position backwards-sideways or vise-versa be applied in a Layback spin?", "back": "i. The feature will only be awarded if this change is done wile maintaining the layback or sideways leanind position\nii. Two (2) revolutions in each of these positions are required\n*  [Reference:\nSp - C - Pos - B-S/S-B]*"}, {"id": "spins_fc_70", "category": "spins", "front": "If a skater attempts both a difficult entrance and difficult exit, **_ONE or BOTH_** will be awarded as a level feature?", "back": "Only **_ONE_** of the two can be counted as a level feature\n\n* [Reference:\nSp - C - Ent/Exit - DE (i)]*"}, {"id": "spins_fc_71", "category": "spins", "front": "Define the entrance to the spin", "back": "The entrance is defined as **the preparation immediately preceding a spin and may include the beginning phase of a spin**\n\n* [Reference:\nSp - C - Ent/Exit - DE (ii) (A)]*"}, {"id": "spins_fc_72", "category": "spins", "front": "Difficult Entry Level feature requirements (3)", "back": "i. The entrance must have a significant impact on the balance, control and execution of the spin and must be performed on the first spinning foot  [1]\nii. The intended basic position must be reached with the first 2 revolutions. The position can be non-basic in spin combinations only  [2]\niii. A regular backward entry is not considered as a difficult entry  [3]\n\n [*Reference:\n1 Sp - C - Ent/Exit- DE (ii) (B)\n2 Sp - C - Ent/Exit - DE (ii) (C)\n3 Sp - C - Ent/Exit - DE (ii) (D)*]"}, {"id": "spins_fc_73", "category": "spins", "front": "Define the exit of the spin", "back": "The exit out of the spin is defined as **the last phase of the spin and includes the phase immediately following the spin**\n\n* [Reference:\nSp - C - Ent/Exit - DE (iii) (A)]*"}, {"id": "spins_fc_74", "category": "spins", "front": "Difficult Exit Level feature requirements (3)", "back": "i. Any movement or jump that makes the exit significantly more difficult. The exit must have a significant impact on the balance, control and execution of the spin  [1]\nii. A listed jump that is called and executed immediately after a spin is not considered as difficult exit of a spin  [2]\n\n [*Reference:\n1 Sp - C - Ent/Exit- DE (iii) (B)\n2 Sp - C - Ent/Exit - DE (v)*]"}, {"id": "spins_fc_75", "category": "spins", "front": "If the entrance or exit of a spin is not considered \"difficult\" by the Technical Panel, it is considered **_?_**", "back": "If the entrance or exit of a spin is not considered \"difficult\" by the Technical Panel, it is considered **_AS A TRANSITION_** **and the feature can still be awarded in a later spin**\n\n [*Reference:\nSp - C - Ent/Exit - DE (iv)*]"}, {"id": "spins_fc_76", "category": "spins", "front": "If the entrance is \"difficult\" and \"flying\" at the same time, only the **_?_** feature can be awarded", "back": "If the entrance is \"difficult\" and \"flying\" at the same time, only the **_\"FLYING\"_** feature can be awarded\n\n* [Reference:\nSp - C - Ent/Exit - Diff &amp; Fly Ent (i)]*"}, {"id": "spins_fc_77", "category": "spins", "front": "Difficult entrance to a regular flying camel ***_IS / IS NOT_*** counted as a Level feature and \"difficult entrance\" in this case ***_IS / IS NOT_*** considered as used", "back": "Difficult entrance to a regular flying camel **_IS NOT_** as a Level feature and \"difficult entrance\" in this case **_IS NOT_** considered as used\n\n* [Reference:\nSp - C - Ent/Exit - Diff &amp; Fly Ent (ii)]*"}, {"id": "spins_fc_78", "category": "spins", "front": "Simple Variation", "back": "A simple variation of position is a movement of a body part, leg, arm, hand or head, which doesn not have an effect on the balance of main body core\n\nA simple variation does not increase the Level\n\n* [References:\nSp - C - Var - Simple ]*"}, {"id": "spins_fc_79", "category": "spins", "front": "Define difficult variation", "back": "A difficult variation is a movement of a bodt part/leg/arm/hand/head, which requires *_**more physical strength or flexibilty** and **has an effect on the balance of the main body core**_*\n\n[*References:\nSp - C - Var - Difficult (i)*]"}, {"id": "spins_fc_80", "category": "spins", "front": "How many revolutions must a difficult variation be held to be counted?", "back": "Any difficult variation must be held for ***_TWO (2)_*** revolutions to be counted\n\n* [Reference:\nSp - C - Var - Difficult (ii)]*"}, {"id": "spins_fc_81", "category": "spins", "front": "Only ***_SIMPLE / DIFFICULT_*** variations can increase the Level of a spin", "back": "Only ***_DIFFICULT_*** varations can increase the Level of the spin\n\n [*References:\nSp - C - Var - Difficult (iii)*]"}, {"id": "spins_fc_82", "category": "spins", "front": "How many categories of difficult variations are there?", "back": "**ELEVEN (11)**\n\n[*References:\nSp - C - Var - DVs (i)*]"}, {"id": "spins_fc_83", "category": "spins", "front": "In the **CAMEL** position:\n\nThere are **_?_** categories of difficult variations based on **_?_**", "back": "*CAMEL POSITION:*\n\nThere are **_THREE (3)_** categories based on **_DIRECTION OF THE SHOULDER LINE_**\n\n [*Reference:\nSp - C - Var - DV (i)(A)*]"}, {"id": "spins_fc_84", "category": "spins", "front": "In the **SIT** position:\n\nThere are **_?_** categories of difficult variations based on **_?_**", "back": "*SIT POSITION:*\n\nThere are **_THREE (3)_** categories based on **_POSITION OF FREE LEG_**\n\n* [Reference:\nSp - C - Var - DV (i)(B)]*"}, {"id": "spins_fc_85", "category": "spins", "front": "In the **UPRIGHT** position:\n\nThere are **_?_** categories of difficult variations based on **_?_**", "back": "*UPRIGHT POSITION:*\n\nThere are **_THREE (3)_** categories based on **_POSITION OF TORSO_**\n\n [*Reference:\nSp - C - Var - DV (i)(C)*]"}, {"id": "spins_fc_86", "category": "spins", "front": "Define the ***_CAMEL FORWARD (CF)_*** position", "back": "**CF**: *_Shoulder line parallel to the ice_*\n\n [<i>Reference:</i>\n<i>Sp - C - Var - DV (i)(A)(1)</i>]"}, {"id": "spins_fc_87", "category": "spins", "front": "Define the ***_CAMEL SIDEWAYS (CS)_*** position", "back": "**CS**: Shoulder line *_twisted to a vertical position_*\n\n [<i>Reference:</i>\n<i>Sp - C - Var - DV (i)(A)(2)</i>]"}, {"id": "spins_fc_88", "category": "spins", "front": "Define the ***_CAMEL UPWARD (CU)_*** position", "back": "**CU**: Shoulder line _*twisted to a **MORE THAN A** vertical position*_\n\n [<i>Reference:</i>\n<i>Sp - C - Var - DV (i)(A)(3)</i>]"}, {"id": "spins_fc_89", "category": "spins", "front": "Define the ***_SIT FORWARD (SF)_*** position", "back": "**SF**: Free leg *_forward_*\n\n [<i>Reference:</i>\n<i>Sp - C - Var - DV (i)(B)(1)</i>]"}, {"id": "spins_fc_90", "category": "spins", "front": "Define the ***_SIT SIDEWAYS (SS)_*** position", "back": "**SF**: Free leg *_sideways_* [ 1]\n\nThe sit side position *_must also include a difficult variation_* which is a movement of a body part/leg/arm/hand/head, **which requires more physical strength or flexibility and has an effect on the balance of the main body core**  [2]\n\n [<i>References:</i>\n<i>1 Sp - C - Var - DV (i)(B)(2)</i>]\n [<i>2 Sp - C - Var - SS (i)</i>]"}, {"id": "spins_fc_91", "category": "spins", "front": "Define the ***_SIT BEHIND (SB)_*** position", "back": "**SB**: Free leg *_behind_*\n\n [<i>Reference:</i>\n<i>Sp - C - Var - DV (i)(B)(3)</i>]"}, {"id": "spins_fc_92", "category": "spins", "front": "Define the ***_UPRIGHT FORWARD (UF)_*** position", "back": "**UF**: Torso leaning *_forward_*\n\n [<i>Reference:</i>\n<i>Sp - C - Var - DV (i)(C)(1)</i>]"}, {"id": "spins_fc_93", "category": "spins", "front": "Define the ***_UPRIGHT STRAIGHT OR SIDEWAYS (US)_*** position", "back": "**US**: Torso *_straight up_* or torso leaning *_sideways_*\n\n [<i>Reference:</i>\n<i>Sp - C - Var - DV (i)(C)(2)</i>]"}, {"id": "spins_fc_94", "category": "spins", "front": "Define the ***_UPRIGHT BIELLMANN (UB)_*** position", "back": "**UB**: In Biellmann position\n\n [<i>Reference:</i>\n<i>Sp - C - Var - DV (i)(C)(3)</i>]"}, {"id": "spins_fc_95", "category": "spins", "front": "What category of difficult variation is a correctly executed Crossfoot Spin considered?", "back": "A Crossfoot Spin is considered as a difficult variation of **_UPRIGHT POSITION (US)_**\n\n [*Reference:\nSp - C - Var - Crossfoot (i)*]"}, {"id": "spins_fc_96", "category": "spins", "front": "What are the requirements for a correctly executed Crossfoot Spin?", "back": "*Crossfoot Spin:*\n\nA Crossfoot Spin must be executed **_on both feet with equal weight distribution_**  [1]\n\nIt is not required to stay on one foot for three revolutions before the cross  [2]\n\n [*References:\n1 Sp - C - Var - Crossfoot (i)\n2 Sp - C - Var - Crossfoot (ii)*]"}, {"id": "spins_fc_97", "category": "spins", "front": "If correctly executed, which foot is a Crossfoot Spin awarded to?", "back": "If correctly executed, the feature is awarded to the **_foot before the cross_**\n\n_ [*Reference:*]_\n [*Sp - C - Var - Crossfoot (i)*]"}, {"id": "spins_fc_98", "category": "spins", "front": "Increase of speed during a crossfoot spin ***_IS / IS NOT_*** considered as a feature?", "back": "Increase of speed during a crossfoot spin **_IS NOT_** considered as a feature\n\n [*Reference:\nSp - C - Var - Crossfoot (iii)*]"}, {"id": "spins_fc_99", "category": "spins", "front": "Define Biellmann position", "back": "Biellmann position is a difficult variation of an upright position (UB) *_when the skater's free leg is **pulled from behind** to a p**osition higher than and towards the top of the head**, close to the spinning axis of the skater_*\n\n [*Reference:\nSp - C - Var - Biellmann (i)*]"}, {"id": "spins_fc_100", "category": "spins", "front": "In free skating a spin that starts with layback position (at least 2 revs) and continues with Upright Biellmann variation is called a ***_LAYBACK / COMBINATION_*** spin", "back": "In free skating a spin that starts with layback position (at least 2 revs) and continues with Upright Biellmann variation is called a **_LAYBACK_** spin\n\n* [Reference:\nSp - C - Var - Biellmann (iii)]*"}, {"id": "spins_fc_101", "category": "spins", "front": "In what ways can a Windmill (Illusion) be considered as a Level feature?", "back": "*Windmill (Illusion) is considered as a Level feature for:*\n\n**difficult variation of non-basic position**; or\n\n**difficult entry or difficult exit**; or\n\n**difficult change of position**\n\n [*Reference:\nSp - C - Var - Windmill (ii)*]"}, {"id": "spins_fc_102", "category": "spins", "front": "To be considered as a Level feature, the Windmill (Illusion) must show **_?_**", "back": "The Windmill (Illusion) movement must show ***_physical strength or flexibility_*** and ***_has an effect on the balance of the main body core_***\n\n* [Reference:\nSp - C - Var - Windmill (iii)]*"}, {"id": "spins_fc_103", "category": "spins", "front": "How must the Windmill (Illusion) be performed to be a difficult variation of non-basic position", "back": "The Windmill (Illusion) must be done at least **_THREE (3) TIME IN A ROW_** to be counted as a Level feature\n\n [*Reference:\nSp - C - Var - Windmill (i)*]"}, {"id": "spins_fc_104", "category": "spins", "front": "How many times can a difficult spin variation count per program?", "back": "Counts only ***_ONCE_*** per program, ***_FIRST TIME IT IS ATTEMPTED_***\n\n [*Reference:*\n*Sp - C - Var - DV Reps (i)*]"}, {"id": "spins_fc_105", "category": "spins", "front": "For Short Program and Free Skating once a difficult spin variation has been attempted and a difficult variation of the same category is executed, the variation **_CAN / CANNOT_** be counted, and any additional feature in this difficult variation **_CAN / CANNOT_** be counted.", "back": "* For Short Program and Free Skating once a difficult spin variation has been attempted and a difficult variation of the same category is executed, the variation* **_CANNOT_** *be counted,* _but_ *any additional feature in this difficult variation* **_CAN_** still *be counted.*\n*  [Reference:\nSp - C - Var - Features in DV Reps (i)]*"}, {"id": "spins_fc_106", "category": "spins", "front": "When is a difficult variation is considered as attempted?", "back": "A difficult variation is considered as attempted when **_this variation is clearly visible, independent of the fact this variation was counted or not_**\n\n* [Reference:\nSp - C - Var - Attempt (i)]*"}, {"id": "spins_fc_107", "category": "spins", "front": "If a difficult variation in a non-basic position of a spin combination is quite similar to one of the executed difficult variation in a basic position, **_?_**", "back": "*If a difficult variation in a non-basic position of a spin combination is quite similar to one of the executed difficult variation in a basic position,* **_the last performed of these two variations will not be counted as a level feature_**\n\n [*Reference:\nSp - C - Var - Similar DV in BP and NBP (i)*]"}, {"id": "spins_fc_108", "category": "spins", "front": "If the free leg drops down for a long time while preparing for a difficult camel variation, **_?_**", "back": "* If the free leg drops down for a long time while preparing for a difficult camel variation,* **_the corresponding Level feature is still awarded,_** but the Judges will apply the GOE reduction\n*  [Reference:\nSp - C - Var - Free leg drops (i)]*"}, {"id": "spins_fc_109", "category": "spins", "front": "If a skater takes a long time to reach the necessary basic position in a Spin in one position, **_?_**", "back": "*If a skater takes a long time to reach the necessary basic position in a Spin in one position,* **_the judges will apply the GOE reduction_**\n\n [*Reference:\nSp - C - Var - Too long to BP (i)*]"}, {"id": "spins_fc_110", "category": "spins", "front": "In any spin a clear jump started and landed on the same foot will be counted as a feature only if the skater reaches the basic position within the first **_?_** revolutions after the landing", "back": "* In any spin a clear jump started and landed on the same foot will be counted as a feature only if the skater reaches the basic position within the first* **_TWO_** *revolutions after the landing*\n*  [Reference:\nSp - C - JW (i)]*"}, {"id": "spins_fc_111", "category": "spins", "front": "*Jump on the same foot within a spin -*\n\nWhat are the requirements for this level feature? (3)", "back": "*Jump on the same foot within a spin -*\n\nSkater reaches basic position within the first **_TWO_** revolutions after the landing  [1]\n\nMust be a **_clear_** jump that **\"**_REQUIRES SIGNIFICANT STRENGTH_**\"**  [2]\n\nCan be performed even before the required minimum number of revolutions  [3]\n\n [*Reference:\n1 Sp - C - JW (i)\n2 Sp - C - JW (ii)\n3 Sp - C - JW (iii)*]"}, {"id": "spins_fc_112", "category": "spins", "front": "*Increase of speed -*\n\nWhich positions can a skater perform an increase in speed to be considered as a Level feature", "back": "*Increase of speed - Camel*\n\nSit\n\nLayback\n\nBiellmann\n\nDifficult variation of Upright positions (except crossfoot)\n\n [*Reference\nSp - C - IS (i)*]"}, {"id": "spins_fc_113", "category": "spins", "front": "*Increase of speed -*\n\nWhich spin positions is an increase of spin NOT considered as a Level feature?", "back": "*Increase of speed -*\n\nSimple upright position\n\nCrossfoot spin\n\nNon-basic position\n\n* [Reference:\nSp - C - IS (i)]*"}, {"id": "spins_fc_114", "category": "spins", "front": "*Increase of speed -*\n\nWhen can increase of speed be awarded as a Level feature?", "back": "*Increase of speed -*\n\nIncrease of speed counts only in a basic position or while going within a basic position into its variation.\n\nIt is NOT valid as a feature if the increase of speed happens while going from one basic position to another basic position\n\n [*Reference:\nSp - C - IS (ii)*]"}, {"id": "spins_fc_115", "category": "spins", "front": "*Clear change of edge -*\n\nA clear change of edge can only be counted as a feature in which positions?", "back": "*Clear change of edge -*\n\nSit position from backward inside to forward outside edge\n\nCamel position\n\nLayback position\n\nBiellmann position\n\nDifficult variation of upright position\n\n [*Reference:\nSp - C - \u00e2\u02c6\u2020E (i)*]"}, {"id": "spins_fc_116", "category": "spins", "front": "*Clear change of edge -*\n\nClear change of edge is NOT considered as a Level feature in which spin positions?\n\nHow are changes of edges in these positions considered by the Tech Panel?", "back": "*Clear change of edge -*\n\nAny attempts at a clear change of edge are NOT counted as a feature in:\n1**. Sit position from backward outside to forward inside edge\n2. Simple variation of/normal upright spin\n3. Non-basic position**\n\nAttempts at a clear change of edge in these positions will be **IGNORED** by the Tech Panel, not blocking the possibility to credit it elsewhere\n\n* [Reference:\nSp - C - \u00e2\u02c6\u2020E (i), (ii), (iv)]*"}, {"id": "spins_fc_117", "category": "spins", "front": "*Clear change of edge -*\n\nThe short phase following the landing of a fly or a step-in **_IS / IS NOT_** considered as an attempt of a change of edge", "back": "*Clear change of edge -*\n\nThe short phase following the landing of a fly or a step-in **_IS NOT_** considered as an attempt of a change of edge\n\n [*Reference:\nSp - C - \u00e2\u02c6\u2020E (ii)*]"}, {"id": "spins_fc_118", "category": "spins", "front": "*Clear change of edge -*\n\nA clear change of edge can only be counted as a feature if **_?_**", "back": "*Clear change of edge -*\n\nA clear change of edge can only be counted as a feature if there are at least _**TWO** revolutions on one edge_ ***followed by*** at least _**TWO** revolutions on the other edge in the same position_\n\n_ [*Reference:*]_\n [*Sp - C - \u00e2\u02c6\u2020E (iii)*]"}, {"id": "spins_fc_119", "category": "spins", "front": "*Clear change of edge -*\n\nHow often can the clear change of edge be counted as a feature that can increase the level?", "back": "*Clear change of edge -*\n\nThe change of edge counts as a feature that can increase the Level only once in a spin of the Short Program and once in a spin of the Free Skating Program  [1]\n\nCounts only once per program, first time it's attempted  [2]\n\n* [Reference\n1 Sp - C - \u00e2\u02c6\u2020E (v)\n2 Sp - L - (i)]*"}, {"id": "spins_fc_120", "category": "spins", "front": "*Spinning in both directions -*\n\nSpinning in both directions (clockwise and counterclockwise or vice-versa) can be counted as a feature in **_?_** immediately following each other", "back": "*Spinning in both directions -*\n\nSpinning in both directions (clockwise and counterclockwise or vice-versa) in **SIT OR CAMEL POSITION OR COMBINATION OF THE TWO** *_immediately following each other_* can be counted as a feature\n\n [*Reference:\nSp - C - BD (i)*]"}, {"id": "spins_fc_121", "category": "spins", "front": "*Spinning in both directions -*\n\nTo be considered as a level feature, a minimum of **_?_** revolutions in each direction is required and the position before and after the change of direction must be held for at least **_?_** revolutions", "back": "*Spinning in both directions -*\n\nTo be considered as a level feature, a minimum of **_THREE_** revolutions in each direction is required and the position before and after the change of direction must be held for at least **_TWO_** revolutions\n\n [*Reference:\nSp - C - BD (ii)*]"}, {"id": "spins_fc_122", "category": "spins", "front": "*Spinning in both directions -*\n\nA spin executed in both direction (clockwise and counter clockwise) is considered as **_ONE / TWO_** spin(s)?", "back": "*Spinning in both directions -*\n\nA spin executed in both direction is considered as **_ONE SPIN_**\n\n [*Reference:\nSp - C - BD (iii)*]"}, {"id": "spins_fc_123", "category": "spins", "front": "*8 revolutions -*\n\nThe 8 revolutions to be counted as a feature must be performed in which positions?", "back": "*8 revolutions -*\n\n**CAMEL**\n\n**LAYBACK**\n\n**ANY DIFFICULT VARIATION OF A BASIC POSITION**\n\n* *DIFFICULT VARIATION OF NONBASIC POSITION**\n* (in a spin combination only)*\n\n* [Reference:\nSp - C - 8 (ii)]*"}, {"id": "spins_fc_124", "category": "spins", "front": "*8 revolutions -*\n\nThe 8 revolutions **_CANNOT_** be counted as a feature when performed in which positions?", "back": "*8 revolutions -*\n\n**BASIC SIT / SIMPLE SIT VARIATION**\n\n**BASIC UPRIGHT / SIMPLE UPRIGHT VARIATION**\n\n* *SIMPLE VARIATION OF NONBASIC POSITION**\n* (in a spin combination only)*\n\n* [Reference:\nSp - C - 8 (ii)]*"}, {"id": "spins_fc_125", "category": "spins", "front": "*8 revolutions -*\n\nAt least 8 revolutions can only be considered as a level feature when there is no change in **_?_**", "back": "*8 revolutions -*\n\nAt least 8 revolutions can only be considered as a level feature when there is no change in:\n\n**POSITION / VARIATION**\n\n**FOOT**\n\n**EDGE**\n\n* [Reference:\nSp - C - 8 (i)]*"}, {"id": "spins_fc_126", "category": "spins", "front": "*8 revolutions -*\n\nHow often can 8 revolutiohns count as a Level feature per program?", "back": "*8 revolutions -*\n\nFor levels Novice & up:\n\n**ONCE PER PROGRAM, IN THE FIRST SPIN IT IS SUCCESSFULLY PERFORMED**\n\nFor Juvenile & Intermediate:\n\n**ONCE PER SPIN (if executed in a different position)**\n\n* [Reference:\n1 Sp - C - 8 (i)\n2 CC - Juv &amp; Int - Sp ]*"}, {"id": "spins_fc_127", "category": "spins", "front": "*8 revolutions -*\n\nIf a skater executes 8 revolutions in a camel, layback, difficult variation of any basic position, and/or a difficult variation of non-basic position on both feet within the same spin, which foot is the feature awarded to?", "back": "*8 revolutions -*\n\nIf in a spin 8 revs are executed on both feet, **any one of these executions can be taken by the Technical Panel** **_IN FAVOR OF THE SKATER_**\n\n*_ [Reference:]_\n [Sp - C - 8 revs (i)]*"}, {"id": "spins_fc_128", "category": "spins", "front": "What is a simple change of foot?", "back": "A simple change of foot, e.g. a step or a small hop **_does not require significant strength and skill_** and ***does not increase the Level***\n\n* [Reference:\nSp - C - Simple \u00e2\u02c6\u2020 ft (i)]*"}, {"id": "spins_fc_129", "category": "spins", "front": "*Change of foot executed by jump -*\n\nSuch change of foot can be counted as a feature only if the skater reaches the **_?_** within the first **_?_** revolutions after the landing", "back": "*Change of foot executed by jump -*\n\nSuch change of foot can be counted as a feature only if the skater reaches the **_BASIC POSITION_** within the first **_TWO_** revolutions after the landing\n\n* [Reference:\nSp - C - CFJ (i)]*"}, {"id": "spins_fc_130", "category": "spins", "front": "*Change of foot executed by jump -*\n\nWhat are the requirements of the jump for this to be considered as a Level feature?", "back": "*Change of foot executed by jump -*\n\nThis jump has no requirements as to the air position, but there must be a **CLEAR JUMP**.\n\nThe jump is considered as a Level feature only when it **\"_REQUIRES SIGNIFICANT STRENGTH_\"**\n\n [*Reference:\nSp - C - CFJ (ii)*]"}, {"id": "spins_fc_131", "category": "spins", "front": "*Change of foot executed by jump -*\n\nIn which program(s) is the Toe Arabian allowed as a change of foot?", "back": "*Change of foot executed by jump -*\n\nToe Arabian as a change of foot is allowed, and will be considered as a change of foot executed by jump and will count as a feature both in **Short program** and in **Free Skating**\n\n [*Reference:\nSp - C - Toe arabian (i)*]"}, {"id": "spins_fc_132", "category": "spins", "front": "How is a spin with a second change of foot considered in the Short program and in Free Skating?", "back": "The second change of foot (if attempted) in a spin with change of foot is **_not allowed in Short Program (wrong element)_** and **_does not count as a feature for a higher Level in Free Skating_**\n\n [*Feature:\nSp - C - 2nd \u00e2\u02c6\u2020 of Ft (i)*]"}, {"id": "spins_fc_133", "category": "spins", "front": "If in a spin with a change of foot, there is a curve of exit after the first part and a curve of entry into the second part, what are the consequences in the Short Program and the Free Skate?", "back": "***SP:*** the spin is not fulfilling the requirements and **_NO VALUE_** will be given\n\n***FS:*** the **_SECOND PART OF THE SPIN WILL BE IGNORED_** and the element becomes a spin in one position with no change of foot or a spin combination with no change of foot\n\n* [Reference:\nSp - C - Two Spins (i)]*"}, {"id": "spins_fc_134", "category": "spins", "front": "If there is only a curve of exit after the first part OR the curve of entry into the second part, how is this considered?", "back": "This is only considered by Judges and will result in a GOE reduction for \"Change of foot poorly done\"\n\nThis reduction does not relate to change of foot together with change of foot together with change of direction\n\n* [Reference:\nSp - C - Two Spins (ii)]*"}, {"id": "spins_fc_135", "category": "spins", "front": "The maximum number of features that a skater can get on one foot in a spin with a change of foot is **_?_**", "back": "Maximum of **_TWO_** features per foot in a spin with a change of foot\n\n* [Reference:\nSp \u00e2\u20ac\u201c C \u00e2\u20ac\u201c Features/ft (i)]*"}, {"id": "spins_fc_136", "category": "spins", "front": "In spins with a change of foot, the features for difficult entry will be counted on which foot?", "back": "The features for difficult entry will be counted in the quota of the **_FOOT BEFORE THE CHANGE_**\n\n* [Reference:\nSp \u00e2\u20ac\u201c C \u00e2\u20ac\u201c Features/ft (ii)]*"}, {"id": "spins_fc_137", "category": "spins", "front": "In spins with a change of foot, the features \"change of foot executed by a jump\" and \"Spinning on both directions\" will be counted on which foot?", "back": "The features for difficult entry will be counted in the quota of the **_FOOT AFTER THE CHANGE_**\n\n* [Reference:\nSp \u00e2\u20ac\u201c C \u00e2\u20ac\u201c Features/ft (iii)]*"}, {"id": "spins_fc_138", "category": "spins", "front": "In spins with a change of foot, the feature \"All 3 basic positions on the second foot\" will be counted on which foot?", "back": "The features for difficult entry is only counted the **_SECOND FOOT_**\n\n* [Reference:\nSp \u00e2\u20ac\u201c C \u00e2\u20ac\u201c Features/ft (iii)]*"}, {"id": "spins_fc_139", "category": "spins", "front": "In spins with a change of foot, the feature for a Crossfoot spin will be counted on which foot?", "back": "The features for difficult entry is only counted in the quota of the **_FOOT ON WHICH THE CROSS POSITION WAS STARTED_**\n\n* [Reference:\nSp \u00e2\u20ac\u201c C \u00e2\u20ac\u201c Features/ft (iv)]*"}, {"id": "spins_fc_140", "category": "spins", "front": "If a spin in one position with change of foot is executed with a basic position with not less than 2 revolutions only and no basic position with not less than 2 revolutions on the other foot, it will receive:\n\n**_?_ in the SP**\n\n**_?_ in Free Skating**", "back": "***SP:*** **_NO VALUE_**\n\n***FS:*** It will be marked with a **\"_V_\"**\n\n* [Reference:\nSp - C - &lt;2 revs on 1ft (i)]*"}, {"id": "spins_fc_141", "category": "spins", "front": "What are the 4 situations a \"V\" signed can be awarded in?", "back": "*\"V\" sign can be awarded only in 4 situations:*\n\nIn Flying spin only: for stepping over and no clear visible jump\n\nIn Spin Combination: for only two basic positions\n\nIn any change foot spin with less than 3 revolutions on one foot (Free Skating only)\n\nIn Spin in one position with change of foot: less than 2 revolutions in a basic position on one foot (Free Skating only)\n\n* [Reference:\nSp - C - \"V\" (i)]*"}, {"id": "spins_fc_142", "category": "spins", "front": "Relevant considerations for a **_Flying Spin_** in the ***Short Program***", "back": "**_Flying Spin (SP):_**\n\n* No previous rotation on the ice before the take-off is permitted  [1,2]\n* Step-over must be considered by Tech panel adding \"V\" to reduce Base Value and by Judges in the GOE  [3,4]\n* The name of the flying spin corresponds to its landing position  [5]\n* Flying position may be different than the landing position  [6]\n* Rules require a minimum 8 revolutions in the landing position  [7], the lack of which is reflected by the Judges with the GOE  [8]\n* Required 8 revolutions can be executed in any variation of the landing position  [9]\n* Positions that are not basic are allowed, counted in the total number of revolutions required by the Rules, but are not valid for level features  [10]\n* Concluding upright position at the end of the spin (final wind-up) is not considered to be another position independent of the number of revolutions, as long as no additional feature is executed  [11]\n\n [*Reference:\n1 Sp - R - Gen (xv)\n2 Sp - R - SP - FSp (iv)\n3 Sp - R - Gen (xv)\n4 Sp - R - SP - FSp (ii)\n5 Sp - R - SP - FSp (i)\n6 Sp - R - SP - FSp (iii)\n7 Sp - R - SP - FSp (iii)\n8 ISU Communication #2334\n9 Sp - R - SP - FSp (iv)\n10 Sp - R - Gen (xiii)\n11 Sp - R - Gen (xiv)*]"}, {"id": "spins_fc_143", "category": "spins", "front": "Relevant considerations for a **_Spin in One Position WITH NO Change of Foot_** in the ***Women's Short Program***", "back": "**Spin in One Position With No Change of Foot (Women's SP):**\n\n* Minimum of 2 revolutions without interruption in a basic positoin  [1]\n* Spin cannot be commenced with a jump  [2]\n* Position must be different from the landing position of the Flying Spin  [3, 4, 5]\n* Spin cannot change foot  [6, 7]\n* Minimum number of revolutions required by the Rules is eight (8)  [7]\n* Positions that are not basic are allowed, counted in the total number of revolutions required by the Rules, but are not valid for Level features  [8]\n* The concluding upright spin at the end of the spin (final wind-up) is not considered to be another position independent of the number of revolutions, as long as in such a final windup no additional feature is executed (change of edge, variation of position, etc.)  [9]\n\n* [References:\n1 Sp - R - Gen (ii)\n2 Sp - R - SP (iv)\n3 Sp - R - SP (i)(B)(3) and (5)\n4 Sp - R - FSp Req (iii)\n5 Sp - R - FSp REP (i)\n6 Sp - R - SP (i)(B)(3)\n7 Sp - R - SP (ii)(A)\n8 Sp - R - Gen (xiii)\n9 Sp - R - Gen (xiv)]*"}, {"id": "spins_fc_144", "category": "spins", "front": "Relevant considerations for a **_Spin in One Position WITH Change of Foot_** in the ***Men's Short Program***", "back": "**Spin in One Position With Change of Foot (Men's SP):**\n\n* Minimum of 2 revolutions without interruption in a basic positoin  [1]\n* Spin cannot be commenced with a jump  [2]\n* Position must be different from the landing position of the Flying Spin  [3, 4, 5]\n* Change of foot in any spin must be preceded and followed by a spin position with at least three (3) revolutions. If this requirement is not fulfilled the spin will be \"No Value\" in SP  [6]\n* If the spinning centers (before and after the change of foot) are too far apart and the criteria of \"two spins\" is fulfilled, the spin is not fulfilling requirements and no value will be given  [7]\n* If a second change of foot is attempted, the spin is a wrong element and will receive \"No Value\"  [8]\n* Minimum number of revolutions on each foot as required by the Rules is six (6)  [9]\n* Positions that are not basic are allowed, counted in the total number of revolutions required by the Rules, but are not valid for Level features  [10]\n* The concluding upright spin at the end of the spin (final wind-up) is not considered to be another position independent of the number of revolutions, as long as in such a final windup no additional feature is executed (change of edge, variation of position, etc.)  [11]\n\n*  [References:\n1 Sp - R - Gen (ii)\n2 Sp - R - SP (iv)\n3 Sp - R - SP (i)(B)(3) and (5)\n4 Sp - R - FSp Req (iii)\n5 Sp - R - FSp REP (i)\n6 Sp - R - Gen (viii)\n7 Sp - C - Two Spins (i) (A)\n8 Sp - C - 2nd \u00e2\u02c6\u2020 of Ft (i)]*\n*  [9 Sp - R - SP (ii)(B)\n10 Sp - R - Gen (xiii)\n11 Sp - R - Gen (xiv)]*"}, {"id": "spins_fc_145", "category": "spins", "front": "Relevant considerations for a **_Spin Combination_** in the ***Short Program***", "back": "**Spin Combination (SP):**\n\n* Must include a minimum of two different basic positions with 2 revolutions in each of these positions anywhere within the spin (will receive a \"V\" to reduce base value)  [1]\n* To receive full value, a Spin combination must include all three basic positions  [1]\n* The number of revolutions in positions that are non-basic is counted in the total number of revolutions  [1]\n* Changing to a non-basic is not considered as a change of position  [1]\n* The change of foot is required in the SP  [2]\n* A change of foot may be executed in the form of a step-over or a jump  [3]\n* The change of foot and the change of position may be made at either at the same time or separately  [3]\n* The change of foot in any spin must be preceded and followed by a spin position with at least three (3) revolutions. If this requirement is not fulfilled the spin will be \"No Value\" in the Short Program  [4]\n* The second change of foot (if attempted) in a spin with change of foot is not allowed in Short Program (wrong element) and will be \"No Value\"  [5]\n* If, in a spin with change of foot, there is a curve of exit after the first part and a curve of entry into the second part, the spin is not fulfilling the requirements and no value will be given  [6]\n\n* [References:\n1 Sp - R - SP CCoSp (i)\n2 Sp - R - SP (iii)\n3 Sp - R - SP CCoSp (ii)\n4 Sp - R - Gen (viii)\n5 Sp - C - 2nd \u00e2\u02c6\u2020 of Ft (i)\n6 Sp - C - 2 Spins (i)]*"}, {"id": "spins_fc_146", "category": "spins", "front": "Key considerations when assessing the:\n\n***Camel Forward Difficult Variation***", "back": "***Camel Forward Difficult Variation***\n\n1. Is the free leg backwards with the knee higher than the hip level?  [1]\n2. Are the shoulder lines parallel to the ice?  [2]\n3. Does the position require more physical strength and does it have an effect on the main body core?  [3]\n4. Is the difficult position held for at least 2 revolutions?  [4]\n5. Is this the first time this DV is attempted?  [5]\n\n* [References:\n1 Sp - R - Gen (iii) (A)\n2 Sp - C - Var - DVs (i) (A) (1)\n3 Sp - C - Var - Difficult (i) \n4 Sp - C - Var - Difficult (ii)\n5 Sp - C - Var - Reps (i)]*"}, {"id": "steps_turns_fc_11", "category": "steps", "front": "Counters & Rockers definition", "back": "- enter on one lobe and exit on another lobe\n- the same edge is maintained throughout the turn"}, {"id": "steps_turns_fc_58", "category": "steps", "front": "Loops & Twizzles definition", "back": "- enter and exit on the same lobe like 3-turns and brackets\n- loops maintain the same edge throughout the turn like counters and rockers\n- twizzles are quickly rotated with a continuous (uninterrupted) action and are not on an edge during the actual turn"}, {"id": "steps_turns_fc_72", "category": "steps", "front": "3 Turns & Brackets definition", "back": "- enter and exit from the same lobe\n- the change of edge occurs at the top of the turn when the blade changes direction"}]};

// ─── FRAMEWORK CONTENT (condensed for AI system prompt) ──────────────────────
let FRAMEWORK_CONTENT = `
FIGURE SKATING TECHNICAL PANEL TRAINING FRAMEWORK
Complete Teaching Reference for AI-Powered Study Assistant

================================================================
TEACHING PHILOSOPHY
================================================================

Core principle: "Call what the skater ACTUALLY performs, not what is required or planned."

Teaching approach: When a candidate asks a learning question ("How do I...?", "Walk me through...", "I'm confused about..."), use the phase structure below as a decision tree. Guide them step by step. Ask checking questions. Don't just state rules — teach the decision process.

When a candidate asks a rule lookup question ("What is...?", "How many...?"), give the answer directly with a citation code.

================================================================
SPIN FRAMEWORK — PHASES 1-4
================================================================

PHASE 1: IS IT A SPIN? (Qualification)
- Must have 3+ continuous revolutions on the ice
- Must be continuous rotational movement on one skating foot
- If fewer than 3 revolutions → it is a "skating movement," not a spin — no box, no call
- A listed jump followed by rotation is NOT a spin — it is a jump (even if it looks like spinning)

PHASE 2: WHAT CODE? (Element Identification)
The spin code is built from prefixes and a position suffix:

Prefixes (stack in order):
- F = flying entry (took off from the ice into the spin)
- C = change of foot (spins on both feet during the element)

Position codes:
- USp = upright spin (skating leg extended or slightly bent, not camel)
- LSp = layback spin (back arched, head/shoulders behind hips)
- CSp = camel spin (free leg backward, knee higher than hip level)
- SSp = sit spin (upper part of skating leg at least parallel to ice)
- CoSp = combination spin (includes multiple basic positions)

Code building examples:
- FCSp = flying entry + camel position (no foot change)
- CCoSp = change of foot + combination spin (no flying entry)
- FCCoSp = flying entry + change of foot + combination spin

Key Phase 2 rules:
- The LANDING position after a flying entry determines the spin name (not the air position)
- Layback, Biellmann, and similar variations are classified as UPRIGHT spins despite their appearance
- The "final windup" (concluding upright at the end) is NOT considered a separate position as long as no additional feature is executed during it
- If a feature IS executed in the final windup (edge change, DV, etc.), it becomes a combination spin
- A spin with only non-basic positions (no C, S, U, or L with 2+ revolutions) has No Value

PHASE 3: DOES IT HAVE VALUE? (Basic Requirements)
Phase 3 has FIVE sub-topics that must ALL be covered when teaching. Do not skip any.

PHASE 3A — Revolution Minimums (All Spins):
- Every basic position requires a MINIMUM of 2 continuous revolutions without interruption
- If 2 revolutions are not achieved in a position, that position is NOT COUNTED
- Variations of head, arms, or free leg, and speed fluctuations ARE permitted within those 2 revolutions

PHASE 3B — Change-of-Foot Requirements:
- For ALL change-of-foot spins: the change of foot must be preceded AND followed by a spin position with at least 3 revolutions
- SHORT PROGRAM: If fewer than 3 revolutions on either foot → NO VALUE
- FREE SKATE: If fewer than 3 revolutions on either foot → marked with "V" (reduced base value, NOT no value)
- If spinning centers before and after change of foot are too far apart AND the "two spins" criteria is met (curve of exit after first part AND curve of entry into second part) → only the part before the change of foot is called
- If there is ONLY a curve of exit OR a curve of entry (not both) → judges reduce GOE for "change of foot poorly done" but the spin is still valid
- SP: Second change of foot attempted → wrong element → NO VALUE
- SP: One-position spin with CoF where one foot has no basic position with 2+ revolutions → NO VALUE
- FS: One-position spin with CoF where one foot has no basic position with 2+ revolutions → "V" flag

PHASE 3C — Combination Spin Requirements (CoSp):
- Must include a minimum of 2 different basic positions with 2 revolutions in each
- 3 basic positions required for FULL value; only 2 basic positions → "V" flag
- Changing to a non-basic position is NOT considered a change of position
- SP: CoSp with fewer than 2 basic positions → NO VALUE
- FS: Clear attempt at CoSp resulting in only 1 basic position → called as CoSp NO VALUE

PHASE 3D — Flying Spin Requirements:
- Must have a clear visible jump (flying entry)
- Step-over instead of true flying entry → "V" flag (reduced base value) and judges reduce GOE
- No previous rotation on the ice before take-off is permitted
- The name of the flying spin corresponds to its LANDING position (not the air position)
- The flying air position MAY be different from the landing position
- SP: Required 8 revolutions in the landing position (lack reflected by judges in GOE)
- The required revolutions can be in any variation of the landing position

PHASE 3E — V Flag and No Value Summary:
V Flag (reduced base value) — 4 scenarios:
1. Combination spin (CoSp) with only 2 basic positions instead of 3
2. Flying spin with a step-over instead of a true flying entry
3. Change-of-foot spin in FS where one foot has fewer than 3 revolutions
4. One-position change-of-foot spin in FS where one foot has no basic position with 2+ revolutions

No Value scenarios:
- Fewer than 3 total revolutions (not a spin at all — it is a skating movement)
- No basic position with 2 continuous revolutions
- SP: Change-of-foot spin without 3 revolutions on each foot
- SP: Second change of foot attempted (wrong element)
- SP: Spinning centers too far apart after change of foot ("two spins" criteria)
- SP: CoSp with fewer than 2 basic positions
- SP: One-position CoF spin with no basic position on one foot
- FS: Clear attempt at CoSp with only 1 basic position → CoSp No Value

PHASE 4: WHAT LEVEL? (Feature Assessment)
A spin's level is determined by the number of valid features achieved:
- Level Base = 0 features
- Level 1 = 1 feature
- Level 2 = 2 features
- Level 3 = 3 features
- Level 4 = 4+ features (BUT at least one must be a MANDATORY feature)

If the spin has 4+ features but NONE are mandatory → capped at Level 3.

Maximum of 4 features count toward the level.
Maximum of 2 features per foot in change-of-foot spins.

THE 14 SPIN LEVEL FEATURES:

Feature #1 — Difficult Variations (DV)
THE GATEWAY CONCEPT: A DV can ONLY be credited if the skater is INSIDE a basic position definition when performing the variation. This is the single most important concept for spin leveling.
- 11 DV categories: CF, CS, CU (camel), SF, SS, SB (sit), UF, US, UB, UL (upright), NBP (non-basic position)
- NBP is ONLY available in Combination Spins (CoSp types) because in a one-position spin, being outside the basic position means you've left the spin's defining position
- Requires 2+ continuous revolutions in the variation
- Maximum 2 DVs count toward the level per spin
- Each DV category can only be used ONCE per program (tracked as "used" even if more than 2 are performed)
- DVs from the same position group (e.g., two camel DVs) cannot both count
- A "failed" DV attempt still counts as a Non-Basic Position (NBP)
- "Used" means ATTEMPTED (except Feature #10 which is only used when ACHIEVED)

Feature #2 — Change of Foot by Jump (CFJ)
- Only available in spins that actually change feet
- Must be a clear jump with significant strength
- Must reach a basic position within 2 revolutions after landing
- NOT available in one-foot spins or CoSp/FCoSp (only in C-prefix and FC-prefix spins)

Feature #3 — Jump Within Spin (JW)
- Same foot take-off AND same foot landing (stays on the same foot)
- Must reach a basic position within 2 revolutions after landing
- Available in ALL spin types

Feature #4 — Difficult Change of Position (DCP) ★ MANDATORY
- ONLY available in Combination Spins (CoSp, FCoSp, CCoSp, FCCoSp)
- Requires 2+ revolutions BEFORE and AFTER the change
- Must be continuous movement (no stops)
- No NBP allowed during the transition
- Must change to a DIFFERENT basic position
- Neither the before nor after position can be in a used DV

Feature #5 — Difficult Entrance (DEn) ★ MANDATORY
- Must be on the first spinning foot
- Must reach intended position within 2 revolutions
- NOT available in flying spins (F-prefix) — the flying entry replaces it
- If both a difficult entrance AND a flying entry are performed, only the flying counts
- A backward entry is NOT automatically a difficult entry

Feature #6 — Difficult Exit (DEx) ★ MANDATORY
- Must start from a basic position (for one-position spins)
- Must be the first time attempted in the program
- Cannot be combined with DCP or Feature #12 (Difficult Blade Feature)
- CRITICAL: Cannot be awarded from an established final windup. If the notation shows the spin ending in basic upright U(3) followed by DEx, the DEx cannot be credited because the final windup was already established

Feature #7 — Change of Edge (ΔE) ★ MANDATORY
- Sit spin: ONLY BI→FO direction is valid (ü** restriction). FO→BI does NOT count
- Requires 2+ revolutions on EACH edge
- Position must be maintained throughout the edge change
- Cannot be in a used DV
- In Upright spins: only available in a DV, not basic upright (ü* restriction)

Feature #8 — Both Directions (BD) ★ MANDATORY
- ONLY available in Combination Spins (CoSp types)
- Requires 3+ revolutions in each direction
- Must maintain a basic position for 2+ revolutions in each direction
- Must be the same position type in both directions
- No weight transfer during the reversal

Feature #9 — Increase of Speed (IS) ★ MANDATORY
- Available in: camel, sit, layback, Biellmann, or upright DV positions
- NOT available in basic upright position (ü* restriction)
- Must be a clear, visible increase in rotational speed within the position
- Cannot be just "fast spinning" — must show acceleration

Feature #10 — Eight Revolutions (8Rev)
- Available in: camel, layback, or DV positions only
- Requires 8+ continuous revolutions without changes in position
- UNIQUE RULE: Only marked as "used" when ACHIEVED (not when attempted)
- All other features are marked "used" when attempted, even if failed
- In Upright spins: only available in a DV (ü* restriction)

Feature #11 — Difficult Flying Entry (DF) ★ MANDATORY
- Only available in flying spins (F-prefix)
- Must show a clear difficult flying position in the air
- Must reach a basic position within 2 revolutions after landing
- CAN be performed in a used DV (unlike most other features)

Feature #12 — Difficult Blade Feature (BF)
- Available in: camel, sit, layback, Biellmann, or upright DV positions
- Spinning must CONTINUE after the blade feature
- Cannot be combined with DCP or DEx
- In Upright spins: only available in a DV (ü* restriction)

Feature #13 — Side-to-Back Change (S/B)
- Only available in layback-type spins (LSp, CLSp, FLSp, FCLSp) and CoSp types
- Layback → sideways OR sideways → layback transition
- 2+ revolutions in each position
- Must maintain the arch throughout

Feature #14 — Biellmann After Layback (UB*)
- Same availability as Feature #13
- Must perform layback FIRST, then Biellmann for 2+ revolutions
- SP special rule: requires 8+ revolutions in layback before Biellmann

FEATURE AVAILABILITY RESTRICTIONS:
- ü (no asterisk) = feature available if performed correctly
- ü* (DV_ONLY) = feature can ONLY count if performed in a Difficult Variation, not basic position
- ü** (SPECIAL) = feature has a specific directional or contextual restriction (e.g., sit edge change only BI→FO)
- — (dash) = feature is structurally impossible for this spin type

WHY FEATURES ARE UNAVAILABLE (teaching the logic):
- Camel DVs only in spins with camel position (CSp, FCSp, CCSp, FCCSp, CoSp types)
- Sit DVs only in spins with sit position (SSp, FSSp, CSSp, FCSSp, CoSp types)
- Upright DVs only in spins with upright position (USp, FUSp, CUSp, FCUSp, CoSp types)
- NBP only in CoSp types (in a one-position spin, leaving the position = leaving the spin)
- CFJ only in spins that change feet (C-prefix and FC-prefix)
- DCP only in CoSp types (can't change position in a one-position spin)
- DEn not in flying spins (flying entry takes its place)
- BD only in CoSp types (needs room for both directions within multiple positions)
- DF only in flying spins (non-flying spins have no flying entry to make difficult)

COMMON SPIN LEVELING MISTAKES:
1. Awarding a DV outside of a basic position (violates gateway concept)
2. Counting 3+ DVs toward the level (max 2 per spin)
3. Awarding BD or DCP in a one-position spin (only in CoSp types)
4. Awarding IS or ΔE in basic upright (must be in a DV for upright spins)
5. Wrong edge direction in sit ΔE (only BI→FO counts)
6. Awarding DEx from an established final windup
7. Forgetting that Feature #10 (8Rev) is only "used" when achieved
8. Not tracking used features across the program
9. Awarding DEn in a flying spin (DF replaces it)
10. Not recognizing that a failed DV still counts as an NBP

================================================================
JUMP FRAMEWORK — PHASES 1-4
================================================================

PHASE 1: IS IT A LISTED JUMP? DOES IT FILL A BOX?

The 7 Listed Jumps:
- T (Toe Loop): back outside edge, toe pick assist
- S (Salchow): back inside edge
- Lo (Loop): back outside edge
- F (Flip): back inside edge, toe pick assist
- Lz (Lutz): back outside edge, toe pick assist
- A (Axel): forward outside edge (the only forward-facing takeoff)
- Eu (Euler): back outside edge — SPECIAL: only listed when between two other listed jumps

What counts as a jump attempt (fills a box with No Value):
- Clear preparation for takeoff without leaving ice
- Stepping to entry edge with visible intent
- Taking off without rotating (pop)
- Any clear attempt at a listed jump

When a jump does NOT fill a box:
- Inside ChSq with ≤2 revolutions: not called, ignored
- Inside StSq with ≤1 revolution in SP: not called, no box (but judges reduce GOE)
- Inside StSq in FS: listed jumps with more than half a revolution ARE identified and occupy boxes
- Euler performed solo (not between two listed jumps): not listed, no box
- ½ loop as connector in a jump sequence: part of sequence notation, no separate box
- Unlisted jumps anywhere (walley, split, ballet jump, falling leaf): never a box
- A Toe Walley is called and counted as a Toe Loop

Euler vs. Half-Loop (same physical jump, different name):
- Same jump: back outside edge takeoff, no toe pick, 1 revolution, lands on other foot
- Called "Euler" (listed) when between two listed jumps in a combination
- Called "half-loop" (unlisted) when solo or not between two listed jumps
- Can only be used once per free skate program
- Only assessed for downgrade (<<) — quarter (q) and under-rotation (<) do NOT apply

PHASE 2: WHAT CODE GOES IN THE BOX?

Take-off identification:
- Call by INTENDED take-off edge and method
- Number prefix = revolutions completed (2F = double flip)
- Over-rotation: if a jump is over-rotated more than a quarter, it is called as the higher revolution jump downgraded (e.g., 2T with over a quarter → called as 3T<<)
- Cheated take-off: clear forward takeoff (backward for Axel) = downgraded. Review in REAL SPEED only

Solo vs. Combination vs. Sequence:
- Combination: landing foot of one jump = takeoff foot of next jump (direct connection)
- Sequence: two listed jumps connected by a step, turn, or unlisted jump (with Axel-type as second)
- Touch-down rule: free foot touch without weight transfer + up to 2 three-turns = still a combination (judges reduce GOE)
- More than 1 full revolution on ice between jumps = the jumps performed prior + COMBO/SEQ + remaining jumps with *
- Inadvertent hop at end of a solo jump: Panel decision. TS1 says "review" if uncertain. Key question: does the hop look intentional and have the characteristics of a listed jump take-off?

Jump Combination Special Cases:
- Euler + three-turn case: Listed jump + 1Eu + three-turn on same foot + Axel-type jump = called as a jump combination. Example: 3F+1Eu+three-turn+2A = 3F+1Eu+2A. No GOE reduction for the intended three-turn.
- One intended turn, rocker, counter, or bracket between jumps keeps the element within the combination frame — no GOE reduction.
- Change of edge case: Listed jump + one intended change of edge + Listed jump in opposite rotational direction = called as a jump combination. Example: 3S+change of edge+2S (opposite direction) = 3S+2S. No GOE reduction for the intended change of edge.
- Key rule: if execution breaks the combination definition (e.g., weight transfer, >1 full revolution on ice), the element is called as +COMBO or +SEQ with asterisks per Phase 4 vetting rules.

Landing on another foot:
- Does not change the call
- Judges reflect in GOE
- In combinations, all jumps except the LAST may be landed on either foot

PHASE 3: MODIFIERS (Edge and Rotation)

Edge modifiers (Flip and Lutz only):
- e (edge): take-off edge is DEFINITELY wrong
- ! (attention): take-off edge is NOT CLEAR
- Review: may use SLOW MOTION for edge calls
- e reduces base value; ! does not reduce base value but judges reduce GOE

Rotation modifiers:
- (none): fully rotated (missing < ¼ revolution)
- q (quarter): missing exactly ¼ revolution — reduced GOE only, counts as intended jump
- < (under-rotated): missing > ¼ but < ½ revolution — reduced base value
- << (downgraded): missing ½+ revolutions — evaluated as one rotation less
- Take-off rotation: review in REAL TIME only
- Landing rotation: may use SLOW MOTION

ERB Order (Edge → Rotation → Bonus):
This is the order modifiers appear in the written code: edge first, then rotation, then bonus.
Examples: 3Fe< (wrong edge + under-rotated), 3F!q (attention + quarter), 3Ab1 (bonus)

Euler exception: Only << applies. No q or < modifiers for Euler.

PHASE 4: RULE VETTING

Asterisk (*) — No Value:
- Wrong element in SP (e.g., wrong jump type for required element)
- Extra elements beyond what the program allows
- Jumps that violate repetition rules (second occurrence beyond allowed)
- Marked with * on the protocol — element occupies a box but receives no base value

+REP — Repetition in Free Skate:
- A triple or quad jump repeated as a solo (neither in a combination/sequence) receives 70% base value
- Marked with +REP on the second solo occurrence
- Doubles can be repeated once at full value; second repetition = no value

+COMBO — Missing Combination in SP:
- SP requires one combination. If no combination is executed, the later jump gets +COMBO
- If there's no clear way to identify which was intended as the combo, the later jump gets it
- Example: 4T clean, 3Lz fall → 4T and 3Lz+COMBO
- Example: 4T fall, 3Lz clean → 4T+COMBO and 3Lz

Extra combinations in FS:
- Maximum 3 jump combinations/sequences allowed in FS
- If more than 3: only the first jump of the extra combo/sequence is counted
- That first jump gets +REP and receives 70% base value
- Example: 3Lo+3T*+REP

Juvenile 3-jump combination rule:
- One combination at Juvenile can have 3 jumps
- Maximum of 2 doubles and 1 single
- If a double axel or triple is part of the 3-jump combo, then 2 other doubles may be included

SP fall/step-out rule:
- If skater falls or steps out then immediately executes another jump: First Jump + COMBO + Second Jump*

Second half bonus:
- Elements in the second half of the program may be eligible for bonus
- Bonus procedure is a TC/DO workflow validated at readback

Jump Achievement Bonus (USFS domestic rule, not ISU):
- Specific bonus points for achieving certain jumps for the first time
- Purpose: incentivize skaters to attempt harder jumps during development. The +1.0 bonus intentionally exceeds fall deduction at lower levels, making the attempt mathematically worth the risk.
- Senior: No domestic jump achievement bonus. Senior aligns with ISU rules.

Bonus detail by level:
- Juvenile: Each 2A earns +1.0. First eligible triple earns +1.0 (once per program). Rotation eligibility: fully rotated, q, or < (under-rotated). Edge attention (!) IS eligible. Wrong edge (e) and downgraded (<<) are NOT eligible.
- Intermediate: Each different triple (max 2 different triples) earns +1.0. One combo/seq where double jump immediately followed by a triple earns +1.0 (once). One combo/seq with 2A or triple + single + triple earns +1.0 (once). Touch-down with one full revolution between double/triple with no weight transfer is still eligible. Rotation eligibility: fully rotated, q, or <. Edge attention (!) IS eligible.
- Novice: Each 3A earns +1.0. Each different triple-triple combo/seq (max 2) earns +1.0. Rotation eligibility: fully rotated or q ONLY — under-rotated (<) NOT eligible. Edge attention (!) IS eligible. Must be different triple-triple combinations.
- Junior: Each 3A earns +1.0. Each quad jump earns +1.0. Each different triple-triple combo/seq (max 2) earns +1.0. Same rotation rules as Novice.

Universal bonus rules (all levels):
- Maximum +1.0 per element regardless of how many bonus criteria are met
- Individual jump bonuses may apply to a jump in a combo only if the entire element is not eligible for a combo/seq bonus
- "Once per program" bonuses go to the first eligible element
- +REP does NOT block a bonus — an element can carry both +REP and a jump achievement bonus
- TC must manually verify when bonuses are applied — software repeat-rule checks may fail
- If any jump in a combination has a disqualifying error → entire combination not eligible

================================================================
CHOREOGRAPHIC SEQUENCE (ChSq) FRAMEWORK
================================================================

What is the ChSq?
- Required element in Novice, Junior, and Senior Free Skating (NOT just Senior)
- Must consist of at least 2 different skating movements (spirals, arabesques, spread eagles, Ina Bauers, hydroblading)
- Any pattern is allowed but must be visible and identifiable
- No time requirement for individual movements
- A spiral is NOT mandatory — any skating movements qualify

What gets called vs. ignored in ChSq:
- Jumps ≤2 revolutions: NOT called, do not occupy a box, sequence continues
- Listed jumps >2 revolutions (e.g., 3S, 2A): called, occupy a box, END the sequence
- 2A ends the ChSq because it is 2.5 revolutions in the air (more than 2)
- Spins: NOT called, do not occupy a box, sequence continues
- Falls: ALWAYS called, fall tag applies if within the sequence

ChSq vs. pChSq (Partial Choreographic Sequence):
- pChSq is for Pre-Juvenile and below
- CRITICAL DIFFERENCE: In pChSq, listed jumps AND spins of 3+ revolutions END the sequence and occupy a box
- Same physical jump (e.g., 2Lz) is IGNORED in ChSq but ENDS pChSq
- This is the single most common cross-level mistake officials make

No Value: if the sequence does not fulfill basic requirements
Verbal call: "Choreo Sequence No Value" (NOT "Zero" or "Not Confirmed")

The ChSq ends when:
- A listed jump >2 revolutions is performed (called, occupies a box)
- A leveled step sequence begins
- The skater stops the skating pattern
- The program ends

The ChSq does NOT end just because a spin is performed — spins are ignored within ChSq.

Practical note: The ChSq is confirmed after 2 skating movements are performed, but the element doesn't end until the preparation for the next element or end of program. A fall AFTER confirmation but before the element ends still requires a fall tag on the ChSq.

================================================================
STEP SEQUENCE (StSq) FRAMEWORK
================================================================

Level Determination — 4 Features:

Feature #1 — Variety of Turns and Steps (determines the CEILING):
- Level Base: fewer than 5 difficult turns/steps, or poor distribution
- Level 1 (Minimum Variety): at least 5 difficult turns/steps, none counted more than twice
- Level 2 (Simple Variety): at least 7 difficult turns/steps, none counted more than twice
- Level 3 (Variety): at least 9 difficult turns/steps, none counted more than twice
- Level 4 requirement (Complexity): at least 11 difficult turns/steps, none counted more than twice, AND 5 types executed in both directions

Feature #1 sets the MAXIMUM possible level. If you only have Simple Variety (7), the level CANNOT exceed 2 regardless of other features.

Feature #2 — Rotations in Both Directions:
- Skater must rotate CW for at least 1/3 of the pattern AND CCW for at least 1/3
- Must be full body rotations (half back and forth doesn't count)
- Can be continuous or non-continuous

Feature #3 — Use of Body Movements:
- Arms, head, torso, hips, legs that affect the main body core
- Must be present for at least 1/3 of the pattern
- "Affecting the main body core" = influencing balance on the blade

Feature #4 — Turn Combinations:
- Two different combinations of 3 difficult turns, one on each foot
- Only the FIRST combination attempted on each foot can be counted
- CRITICAL: A failed first combination attempt BLOCKS a second attempt on that foot
- Even if the first turn combination fails, TS2 should vocalize "Yes" or "No" on the second combination for the quality of notes
- Difficult turns eligible: rockers, counters, brackets, twizzles, loops
- NOT allowed in combinations: 3-turns, change of edge, jump/hop, change of foot
- Only one difficult turn may be repeated once across the two combinations
- At least one turn in each combination must be a different type than the others
- Exit edge of one turn = entry edge of next turn
- Free foot must not touch the ice (even incidentally)
- Must be executed with continuous flow

The level = minimum of (Feature #1 ceiling, total features achieved).
Example: 9 turns + rotation + body + combos = 4 features BUT Feature #1 caps at Level 3, so Level 3.

Feature 1 and Feature 4 Double Count:
- Turns counted for Feature 1 ALSO count toward Feature 4. This is a benefit, not a restriction.
- Common misconception: "Turns cannot count for both Feature 1 and Feature 4" — this is FALSE. The TP credits the same turn for both features.

General StSq rules:
- Must fully utilize the ice surface (failure = No Value)
- Must be visible and identifiable (failure = No Value)
- No longer a required pattern (straight line, serpentine, etc.) — pattern means pattern actually executed
- Turns and steps must be BALANCED in distribution throughout
- No long sections without turns/steps — if distribution fails, level capped at Base
- Both No Value (ice not utilized) and Base cap (distribution failure) are most likely when a skater falls during the step sequence and doesn't immediately resume

Difficult turns and steps: twizzles, brackets, loops, counters, rockers, choctaws
- Must be executed on clean edges
- Not counted if "jumped"

Jumps in Step Sequences:
- Unlisted jumps (any revolutions): May be included in StSq in BOTH SP and FS. No deduction, no GOE reduction. Does not count as a jump element. Can be used freely as connecting steps.
- Listed jumps > ½ revolution in SP: IGNORED as a jump element. Judges reduce GOE by one grade. Does NOT block a jumping box. TP does not call it as a jump. Common misconception: many trainees think listed jumps in the SP StSq block a jump box — they do NOT.
- Listed jumps > ½ revolution in FS: CAN be included — will be identified as a jump element. Counts toward jump repetition rules. SP rules do NOT apply in FS. Judges may reduce GOE.

Level Caps by Competition Level:
- Juvenile: Partially leveled, max StSq2. Only Feature 1 and Feature 2 are assessed. Features 3 and 4 are NOT assessed. DO enters one keypoint only (F2).
- Intermediate: Partially leveled, max StSq3. All features assessed but level hard-capped at 3. DO enters three keypoints.
- Novice, Junior, Senior: Fully leveled, max StSq4. All features assessed. Full leveling applies.

StSq Panel Roles and Verbalization Sequence:
- TS2: Pre-calls "Next: steps." Verbally confirms Feature 2 (rotation): yes/no. Must chime in before end of sequence.
- TC: Assesses body movements (Feature 3) throughout sequence. Verbally confirms F3 (body): yes/no. Must chime in before sequence ends.
- TS1: Tracks total difficult turns (F1). Assesses Feature 4 (turn combinations on each foot). Waits for TS2 and TC input, then verbalizes final call.
- DO: Enters keypoints based on TS2, TC, TS1 verbalizations. Keypoint order: Rotation (F2) → Body (F3) → Turn Combos (F4). Format: +YYY or +YNY etc.

Sample verbalization sequence: TS2 pre-calls "Next: steps" → TS1 calls "Step sequence" → TS2 says "Rotation, no" → TC says "Body, no" → TS1 says "Right, yes" then "Left, yes" → TS1 says "Level 3, 10 turns" → DO enters StSq3+YNY

================================================================
FALLS FRAMEWORK (Cross-Cutting Rule Set)
================================================================

PHASE 1: IS IT A FALL? (2-question decision tree)

Question 1: Does the skater have the majority of their body weight on a portion of their body OTHER than their blades?
Question 2: Did the skater have a LOSS OF CONTROL?

BOTH must be YES → Fall is called.

If loss of control but weight stays on blades → NOT a fall (stumble)
If weight off blades but no loss of control (e.g., controlled knee slide) → NOT a fall

Falls are ALWAYS called when seen. The TS1 must keep eyes on the ice at all times. State clearly: "Fall" or "Fall outside."
Falls can ONLY be reviewed in real speed. Never slow motion.

PHASE 2: WHERE DID IT OCCUR?

Fall within an element → "Fall" tag on the protocol, judges reflect in GOE
Fall between elements → "Fall outside" — same deduction amount, no tag on protocol

Element-specific intersections:

JUMPS + FALLS:
- Fall does NOT affect the rotation call (rotation is assessed independently)
- If skater falls then immediately attempts another jump: those jumps are called (may have no value) and shown as attempted
- SP: First Jump + COMBO + Second Jump* (after fall/step-out)
- FS: First Jump(s) + COMBO/SEQ + remaining jumps with *
- A fall on a zero-value post-fall jump STILL earns a fall deduction

SPINS + FALLS:
- A spin is not invalidated by a fall — if the spin met requirements before the fall, it counts
- Judges reflect the fall in GOE
- Practical note: Skaters often fall while attempting a difficult exit. If it's during a knee slide, the panel must determine if the exit meets the definition of "difficult" BEFORE the fall. The fall would be tagged on the element.

STEP SEQUENCES + FALLS:
- The step sequence CONTINUES after a fall — keep evaluating level features
- If a fall causes the skater to skip a large section of ice, the "distribution" requirement may fail → level capped at Base
- This is the most common instance where the distribution rule becomes relevant

ChSq + FALLS:
- Falls are ALWAYS called within the ChSq
- The ChSq is confirmed after 2 skating movements, but the element doesn't end until the preparation for the next element or end of program
- A fall AFTER confirmation but before the element ends still requires a fall tag on the ChSq

PHASE 3: DEDUCTIONS

Deduction tiers (USFS):
- Pre-Juvenile through Intermediate: 0.5 per fall
- Novice: 0.5 per fall
- Junior: 1.0 per fall
- Senior: GRADUATED scale — 1.0, 1.0, 2.0, 2.0, 3.0+ (escalates with each additional fall)

The Senior graduated scale is unique. The TC, DO, and Referee must track the fall count throughout the program. This is validated at readback.

Responsibility chain:
1. TS1 identifies the fall
2. Technical Panel decides by majority vote
3. TC applies the deduction

Extended interruptions: If skater is down for an extended period, no tech panel implication. The Referee may assess an interruption deduction (separate from fall deduction) — tech panel has no authority over this.

COMMON FALLS MISTAKES:
1. Missing a fall — eyes off the ice during a complex element
2. Reviewing a fall in slow motion — protocol is real speed only
3. Stopping step sequence evaluation at the fall — keep assessing features
4. Not calling post-fall jumps — they must be called (no value, but shown as attempted)
5. Not counting a fall deduction on a zero-value jump — a fall is a fall
6. Confusing "Fall" and "Fall outside" — within an element gets a tag; between elements does not
7. Assuming Senior falls are all flat — the graduated scale escalates

================================================================
GENERAL CALLING RULES
================================================================

KEY FOUNDATIONAL PRINCIPLES:
- Call what the skater ACTUALLY performs, not what is required or planned
- Elements not according to requirements receive an asterisk AFTER they have been fully evaluated and leveled (e.g., FCCoSp4V* in Senior SP)
- The role of the technical panel is to FIND features achieved by the skater. Do not be quick to take away features or entire elements.
- If a call is too close to determine, go with the skater.
- Establish and maintain a consistent, attainable standard — keep the playing field fair for all athletes
- Economy of language — everyone on the panel is knowledgeable, so be concise in making decisions

ACHIEVEMENT-BASED EVALUATION (not subtractive):
- Reviews verify earned features. Build the level UP from what is confirmed — not DOWN from an assumed level.
- INCORRECT (subtractive mindset): "CCoSp3 — Review" (starts from max, looks to take away)
- CORRECT (achievement-based): "CCoSp1V — Review" (starts from confirmed features, reviews to verify if more were earned)
- The review should add clarity by confirming what was earned — not be designed to take levels away

CRITERIA-BASED LANGUAGE:
Formula: Criterion + Observable outcome + Duration/quantity (if required)
- AVOID: "I don't have a camel" → USE: "Camel position not achieved for 2 revs"
- AVOID: "I don't have the cluster" → USE: "Cluster not achieved"
- AVOID: "I don't think that's difficult" → USE: "Position achieved does not require significant strength"
- When in doubt: replace "I think / I have" with Criterion + Observed Outcome

SETTING THE PANEL STANDARD:
1. Criteria-Based Standard: Define using published criteria, not personal preference. State in observable terms.
2. Calibrate Together: Align early on what "meets the criterion" before the event begins. Use borderline reviews to lock in a shared standard mid-event.
3. Keep It Achievable: Too stringent = if top-level skaters only achieve "body," recalibrate. Too loose = if every small change is "clear increase," tighten definitions. Goal: all awarded elements demonstrate the same level of strength and/or flexibility.

ECONOMY OF LANGUAGE:
Every unnecessary word on the headset costs the TS1 attention. Keep it concise, precise, and consistent.
- Repeated DVs/Features: Say "USED" (not "REPEAT"). Consistent with ISU protocol — signals the DV category cannot be counted again this program.
- Jump Combinations: Just call the jumps as attempted — no connective word needed. Say "triple Lutz, triple toe" not "triple Lutz PLUS triple toe."
- Calling Reviews: Just say "review." Exception: edge reviews say "review edge," takeoff issues say "review takeoff," falls say "review fall."
- Partial ChSq — Live Call: TS1 says "Choreo Sequence" (not "p" or "partial"). The "p" designation goes on the DO's readback only.
- ChSq Outcome: Exactly one of two calls: "CONFIRMED" or "NO VALUE." No in-between description.

WRONG ELEMENTS: marked with * (No Value) but still occupy a box
FALL IN ELEMENT: called as "Fall" — judges reflect in GOE, fall tag on protocol
TIME LIMIT: Elements started after required program time + 10 seconds = not identified, no value

REVIEW PROCEDURE:
1. TC leads the review and identifies the issue
2. DO plays the video clip. Slow motion available for rotation and edge reviews.
3. Panel focuses on the specific issue (reason for review). Be decisive — don't second-guess without new information.
4. TS1 and TS2 each weigh in. If they agree — call confirmed. If they disagree, TC breaks the tie. TC should always state their vote so it's known if decision was unanimous or split.
5. All decisions by majority vote of TS1, TS2, and TC. TC directs DO to update if call changes.
- If a call is too close to accurately determine — go with the skater. This is the consistent standard throughout all reviews.
- Falls can ONLY be reviewed in real speed. Never slow motion.
- Take-off rotation: review in REAL TIME only
- Landing rotation: may use SLOW MOTION
- Edge calls: may use SLOW MOTION

Used features tracking:
- Features are marked as "used" when ATTEMPTED (even if failed) — they cannot be counted again in later spins
- Exception: Feature #10 (Eight Revolutions) is only marked "used" when ACHIEVED
- This distinction is critical for program-level strategy and affects later spin levels

Level 4 requirement: At least one MANDATORY feature must be among the counted features.
The 6 mandatory features: DCP (#4), DEn (#5), DEx (#6), ΔE (#7), BD (#8), IS (#9), DF (#11)

Max 2 features per foot in change-of-foot spins.

================================================================
TECHNICAL PANEL ROLES AND PROCEDURES (Reference)
================================================================

WHO CAN BE A TECHNICAL PANEL OFFICIAL:
- Must be at least 18 years old
- Must be trained and certified by USFS TP Training & Management Subcommittees
- Must demonstrate the highest level of technical knowledge in their discipline
- Must work well in a team environment — the panel operates as a unit
- For qualifying competitions: must be retired from active competition for at least one year
- Must be free from conflicts of interest — or even the appearance of one
- Must adhere to the Technical Panel Code of Ethics & Conflict of Interest Policy, and Social Media Policy

THE OFFICIALS' CREED (DOR 2.01):
1. "I consider it an honor and a privilege to be an official for U.S. Figure Skating."
2. "I will make my judgment to the best of my ability with all humility and then will keep my own counsel unless questioned officially."
3. "I will free my mind of all former impressions, be cooperative and punctual, and do my best always to improve my knowledge and to uphold the dignity of the sport."

Additional rules: DOR 2.02 — No public statements/online comments about tests or competitions. DOR 2.03 — Must adhere to all USFS policies. DOR 2.04 — Judges may not communicate with each other or skaters while judging.

ETHICAL CONDUCT POLICY (DOR 2.03):
1. Comply with all USFS bylaws, rules, standards, codes, and policies
2. Demonstrate accountability, fairness, honesty, integrity, inclusion, respect, and truthfulness
3. Conduct yourself with independence and neutrality at all times
4. Show no favoritism for, or prejudice against, any individual
5. Conduct and feedback must generate confidence and trust
6. USFS properties, funds, services, and official identity may NOT be used for personal gain
7. All activities must comply with applicable federal, state, and local laws
8. Do not accept payments, favors, or benefits for participation — nominal gifts meeting IRS regulations only
Violations may result in suspension or permanent exclusion from all USFS activities. Report: usfigureskating.org/skatesafe

CONFLICT OF INTEREST — BY ROLE:
Key trigger: Any coaching payment accepted in past 12 months for a skater you may evaluate = conflict.

All Officials:
- Employing a coach for yourself/family does not auto-create conflict — but notify chief referee or test chair
- Coach/parent of competing skater: stay out of officials' room ≥1 hr before and ≥1 hr after their event
- Disclose to LOC (nonqualifying) or Domestic Selections Committee (qualifying) when accepting assignment

Technical Specialist / Data Op / Video Op:
- Conflict = coaching payment from competitor or family member in past 12 months
- Same qualifying event rule: conflict in any group = conflict for entire event
- At competition: notify TP Captain + TC + Chief Referee; Chief Referee makes final decision if disagreement
- Conducting a seminar = must disclose all participant names as conflicts for 12 months
- US Championships: Assigned TP officials may ONLY serve as officials — no coaching role for any event

Judge / Referee / TC / Accountant:
- Cannot officiate if coaching figure skating (except learn-to-skate group lessons for unskated skaters only)
- Cannot officiate in qualifying events if ANY conflict exists in ANY portion of that event

Coach Certified as Test Judge:
- May ONLY serve as 1-judge minority on a 3-judge panel — cannot be single judge
- Cannot judge competitions (except Compete USA)

FEEDBACK EMBARGO PERIODS:
- Test (in-person and virtual): 15 days prior. Applies within respective discipline only.
- Nonqualifying competition: 15 days prior. Feedback must be available to ALL skaters in event.
- Qualifying (incl. NQS events): 30 days prior. See NQS Handbook for particulars.
- Championship: 30 days prior. Do not advise on refinements/review improvement videos.
- Monitoring (ISP): Officials may monitor skaters/teams despite embargo if requested by the International Committee.
- Coach Connect: May participate despite embargo — EXCEPT for Sectional Finals, US Championships, US Synchronized Skating Championships.
- Technical Levels: Questions about levels must go to the TC only. Other panel members may not provide this information.

SOCIAL MEDIA POLICY:
Do NOT: Follow/friend minor athletes on social media (prohibited by SkateSafe). Comment or react to posts of skaters/teams you will officiate this season. Comment about officials, coaches, parents, skaters, clubs, or USFS decisions. Engage in negative or unprofessional commentary on results. Post articles, pictures, or videos of skaters/teams. Share clips of elements or TP/judge scores. "Like" posts by skaters you'll officiate.
DO: Congratulate a LOC on a well-run competition (general, not skater-specific). Post entire US delegation photos (as team leader/international official). Personal posts unrelated to your official role.
"As an official, you represent U.S. Figure Skating at all times. Act accordingly."
Report violations: usfigureskating.org/skatesafe. Anonymous reports accepted.

THE TECHNICAL PANEL TEAM:
The Calling Unit (makes all element identification and level decisions by majority vote):
- TS1 (Technical Specialist 1): Calls every element and level in real time — the primary voice on the headset. Determines correct level of difficulty. Identifies illegal elements and calls falls. Has first right to review. Attends pre-event meeting.
- TS2 (Technical Specialist 2): Pre-calls upcoming elements ("next, jump," "next, spin," "next, steps"). Participates in all decisions — has equal vote with TS1 and TC. Maintains written record. Confirms DO's readback with "I agree" before TC authorizes. Has second right to review.
- TC (Technical Controller): Supervises the panel, authorizes calls, breaks ties, is the spokesperson. Runs the pre-event meeting. Manages the headset (ensures communication is orderly, clear, dignified, efficient). Reviews calls when necessary — final call = majority vote. Confirms elements are correctly recorded and authorizes them. Authorizes or corrects: element deletions, bonuses, illegal elements, falls. Maintains written record.

Support Roles (do not vote on element calls):
- DO (Data Operator): Enters all called elements into the computer system using correct ISU codes. Records levels, bonuses, flags, falls as directed. Reads back all elements after reviews. Edits on TC instruction ONLY — never acts independently. Controls video replay during reviews. Calls WBP issues to TC's attention.
- Video Replay Operator: Captures video clips of every element for use during reviews.

Decisions are made by majority vote of TS1, TS2, and TC. The DO and Video Op support but do not vote.

PAPER AND PENCIL PROCEDURE:
- TS2 agrees → silence is agreement. No need to verbalize unless dispute.
- Disagreement → resolve immediately. If no time: call "Review, under" and verbalize. When in doubt — go with the skater.
- TC only + TS1 (no TS2): Split decision goes in favor of the skater.
- Referee or TC reads list to judges: includes edge calls and rotation errors. Does NOT include spin/StSq levels. Done BEFORE judges' marks collected.
- Accountant enters called elements and judge scores per the TC list. Event Referee cross-checks TC list.
- Officials' sheets collected: after each skater (1-per-sheet format) or after every 3rd skater (3-per-sheet format).

EVENT PROCEDURE:
Before the Event (Pre-Event Meeting): TC convenes and runs the meeting. Panel discusses gray areas and anticipated edge cases. Review basic element rules and well-balanced program requirements.
During the Event: Watch the warm-up to confirm gray zones. Keep dialogue to minimum — only necessary communication. TS1 requests assistance for certain level features from TS2 and TC. TS2 pre-calls each upcoming element. Allow TS1 time to review first, then TS2, then TC weighs in. Panel weighs in on assigned features for spins and steps. If a call is too close — go with the skater.

================================================================
CITATION CODES
================================================================

Format: [TPH-S §SECTION.TOPIC]
- TPH-S = ISU Technical Panel Handbook, Single Skating, 2025-2026
- Example: [TPH-S §SPIN.GEN] = General spin rules
- Example: [TPH-S §JUMP.CL.ATTEMPT] = Jump attempt definition
- Example: [TPH-S §STEPS.CL.DISTRIB] = Step sequence distribution requirement
- Example: [TPH-S §CHOREO.CL.JUMPS1] = Jumps in choreographic sequence

When citing rules, always reference the specific section so candidates can find the primary source.

`;

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "jumps",  label: "Jumps",   icon: "⬆", color: "#E8A838", desc: "Jump identification, codes, modifiers, rule vetting" },
  { id: "spins",  label: "Spins",   icon: "◉", color: "#0D7377", desc: "Spin calling phases, value, level features 1–14" },
  { id: "steps",  label: "Steps",   icon: "≋", color: "#6A1B9A", desc: "Step sequences, turns, leveling features" },
  { id: "choreo", label: "ChSq",    icon: "♫", color: "#C0392B", desc: "Choreographic sequence rules and confirmation" },
  { id: "general",label: "General", icon: "📋", color: "#1A6B8A", desc: "Calling procedure, falls, time limits, SP/FS rules" },
];

const MODES = [
  { id: "learn",     label: "Learn",     icon: "📖", desc: "Guided teaching with the framework" },
  { id: "quiz",      label: "Quiz",      icon: "❓", desc: "Test your knowledge" },
  { id: "flashcard", label: "Flashcards",icon: "🃏", desc: "Rapid-fire review" },
  { id: "reference", label: "Reference", icon: "🔍", desc: "Look up any rule" },
];

// ─── TPH CITATION INDEX ──────────────────────────────────────────────────────
const TPH_INDEX = [
  { section: "GENERAL", entries: [
    { code: "§GEN.CALLING", title: "Calling Procedure", page: "1–2", summary: "Verbal calling sequence, written abbreviations, order of modifiers for all elements" },
    { code: "§GEN.FALLS", title: "Falls", page: "3", summary: "Definition of a fall, when falls are called, deduction amounts by level" },
    { code: "§GEN.REVIEW", title: "Review Process", page: "4–5", summary: "When review is available, slow motion vs regular speed rules, majority vote procedures" },
    { code: "§GEN.TIMELIMIT", title: "Time Limits & Program Structure", page: "6–7", summary: "Maximum/minimum program times by level, bonus timing rules" },
    { code: "§GEN.ETHICS", title: "Code of Ethics & Conflict of Interest", page: "8", summary: "Technical Panel ethics policy, social media policy, conflict disclosure" },
  ]},
  { section: "JUMPS", entries: [
    { code: "§JUMP.DEF", title: "Jump Element Definitions", page: "9–10", summary: "Solo jumps, jump combinations, jump sequences — definitions and distinctions" },
    { code: "§JUMP.EULER", title: "Single Euler (1Eu)", page: "10", summary: "When Euler becomes a listed jump, downgrade/under-rotation rules for 1Eu" },
    { code: "§JUMP.SEQ", title: "Jump Sequences", page: "11", summary: "Definition: two jumps with Axel type, direct step from landing curve, 80% base value" },
    { code: "§JUMP.COMBO", title: "Jump Combinations", page: "11–12", summary: "Landing foot = takeoff foot, touch-down rules, three-turn allowance, +COMBO rules" },
    { code: "§JUMP.ROT", title: "Rotation Assessment", page: "13–14", summary: "Quarter (q), under-rotated (<), downgraded (<<), over-rotated rules" },
    { code: "§JUMP.EDGE", title: "Edge Calls (Flip/Lutz)", page: "14", summary: "Flip = backward inside, Lutz = backward outside, 'e' vs '!' signs, slow motion review" },
    { code: "§JUMP.POP", title: "Popped Jumps", page: "15", summary: "Popped listed jump counts as one element, decorative hops excluded" },
    { code: "§JUMP.ATTEMPT", title: "Jump Attempts", page: "15–16", summary: "What constitutes an attempt, blocking boxes, TP discretion" },
    { code: "§JUMP.SP", title: "Short Program Jump Rules", page: "16–18", summary: "Wrong element, no value, 3-jump combos, extra jumps, step-out +COMBO, missing combos" },
    { code: "§JUMP.FS.REP", title: "Free Skate Repetition Rules", page: "18–20", summary: "First repetition doubles (full value), triple/quad +REP (70%), second repetition (no value)" },
    { code: "§JUMP.FS.EXTRA", title: "Free Skate Extra Jumps & Combos", page: "20–21", summary: "Extra jump = no value + *, max 3 combos/sequences, 4th combo +REP 70%" },
    { code: "§JUMP.FS.COMBO", title: "FS Combo/Sequence Errors", page: "21–22", summary: "Fall/step-out in combo: +COMBO/+SEQ + *, not fulfilling definition rules" },
    { code: "§JUMP.BONUS", title: "Bonus Rules by Level", page: "22–24", summary: "First triple/quad bonus, repertoire bonus, triple-triple bonus, 3A bonus, level-specific rules" },
    { code: "§JUMP.VETTING", title: "Written Code & Vetting", page: "24–25", summary: "Edge → rotation → bonus order, protocol construction, no-value elements" },
  ]},
  { section: "SPINS", entries: [
    { code: "§SPIN.GEN", title: "Spin General Rules", page: "26–30", summary: "Minimum revolutions (3 for element, 2 for position), basic positions, NV conditions" },
    { code: "§SPIN.POSITIONS", title: "Basic Positions", page: "28", summary: "Camel (knee>hip), Sit (thigh≥parallel), Upright (leg extended/slightly bent)" },
    { code: "§SPIN.LAYBACK", title: "Layback & Sideways Leaning", page: "28–29", summary: "Head/shoulders back with arch, sideways variation, free leg optional" },
    { code: "§SPIN.COF", title: "Change of Foot Rules", page: "29", summary: "3 revolutions before/after, NV in SP if failed, V in FS, two-spins criteria" },
    { code: "§SPIN.COMBO", title: "Spin Combination Definition", page: "30", summary: "Min 2 basic positions with 2 revolutions each, non-basic ≠ position change" },
    { code: "§SPIN.FLYING", title: "Flying Spin Rules", page: "31", summary: "Landing position names the spin, no prior rotation, step-over = V, 8 revs minimum" },
    { code: "§SPIN.SP", title: "Short Program Spin Requirements", page: "32–34", summary: "Flying spin, spin in one position, combination — SP-specific rules by level" },
    { code: "§SPIN.LSP", title: "Layback Spin (Ladies SP)", page: "33", summary: "8 revs required before Biellmann, backwards-sideways feature, additional features" },
    { code: "§SPIN.FS", title: "Free Skate Spin Requirements", page: "34–35", summary: "3 spins max: combo + flying + one position, 6/6/10 rev minimums, abbreviation matching" },
    { code: "§SPIN.DV", title: "Difficult Variations", page: "36–39", summary: "11 categories (CF/CS/CU, SF/SS/SB, UF/US/UB, Layback, NBP), 2 rev hold required" },
    { code: "§SPIN.DV.CROSS", title: "Crossfoot Spin", page: "39", summary: "US category, both feet equal weight, no speed increase feature, awarded to foot before cross" },
    { code: "§SPIN.DV.BIELL", title: "Biellmann Position", page: "39", summary: "Free leg pulled from behind above head near spinning axis, UB category" },
    { code: "§SPIN.DV.WIND", title: "Windmill/Illusion", page: "40", summary: "NBP DV (3x), or entry/exit/change of position, 135° requirement, once per program" },
    { code: "§SPIN.DV.REPS", title: "DV Repetition Rules", page: "40", summary: "Once per program first attempt, same category blocks DV but not other features" },
    { code: "§SPIN.FEAT.CFJ", title: "Feature: Change of Foot by Jump", page: "41", summary: "Clear jump, significant strength, basic position within 2 revs, Toe Arabian allowed" },
    { code: "§SPIN.FEAT.JWS", title: "Feature: Jump Within Spin", page: "41", summary: "Same foot, clear jump, significant strength, basic position within 2 revs" },
    { code: "§SPIN.FEAT.DCP", title: "Feature: Difficult Change of Position", page: "42", summary: "Continuous movement, no jump, no NBP established, 2 revs before and after" },
    { code: "§SPIN.FEAT.ENT", title: "Feature: Difficult Entrance", page: "42–43", summary: "First spinning foot, significant impact, basic position within 2 revs, regular backward ≠ difficult" },
    { code: "§SPIN.FEAT.EXIT", title: "Feature: Difficult Exit", page: "43", summary: "Significant impact on balance/control, listed jump after spin ≠ exit" },
    { code: "§SPIN.FEAT.EDGE", title: "Feature: Clear Change of Edge", page: "44", summary: "Sit (BI→FO only), camel, layback, Biellmann, DV upright — 2 revs each edge" },
    { code: "§SPIN.FEAT.3P", title: "Feature: All 3 Positions 2nd Foot", page: "44", summary: "Second foot of combo spin, 2 revs each position, no interruption by COF" },
    { code: "§SPIN.FEAT.BD", title: "Feature: Both Directions", page: "45", summary: "Sit/camel, 3 revs each direction, 2 revs in basic position, no weight transfer" },
    { code: "§SPIN.FEAT.SPEED", title: "Feature: Clear Increase of Speed", page: "45", summary: "Camel/sit/layback/Biellmann/DV upright (not crossfoot), within established position" },
    { code: "§SPIN.FEAT.8REV", title: "Feature: 8 Revolutions", page: "46", summary: "No change in position/variation/foot/edge, camel/layback/DV of BP/DV of NBP" },
    { code: "§SPIN.FEAT.FLY", title: "Feature: Difficult Flying Entry", page: "46", summary: "Clear visible jump, difficult air position, basic position within 2 revs after landing" },
    { code: "§SPIN.FEAT.BS", title: "Feature: Backwards-Sideways", page: "47", summary: "Layback only, maintain arch, no upright, 2 revs each position" },
    { code: "§SPIN.FEAT.BIELL", title: "Feature: Biellmann after LSp", page: "47", summary: "SP: after 8 revs in layback, additional features in Biellmann" },
    { code: "§SPIN.V", title: "V Sign Rules", page: "48", summary: "4 situations: no visible jump (FSp), only 2 BP (CoSp), <3 revs COF (FS), <2 revs BP COF (FS)" },
    { code: "§SPIN.QUOTA", title: "Features Per Foot Quota", page: "48–49", summary: "Max 2 features per foot in COF spins, entry = first foot, CFJ/BD = second foot" },
    { code: "§SPIN.LEVELS", title: "Level Determination", page: "49–50", summary: "Features 1–14 list, mandatory features for L4, first attempt rule" },
  ]},
  { section: "STEPS", entries: [
    { code: "§STEP.PATTERN", title: "Step Sequence Pattern", page: "51", summary: "No required pattern, must fully utilize ice, visible and identifiable" },
    { code: "§STEP.DIST", title: "Distribution Requirement", page: "51", summary: "Turns and steps balanced throughout, no long empty sections, below = Base" },
    { code: "§STEP.TURNS", title: "Difficult Turns & Steps", page: "52", summary: "Twizzles, brackets, loops, counters, rockers, choctaws — clean edges required" },
    { code: "§STEP.FEAT1", title: "Feature 1: Variety/Complexity", page: "52–53", summary: "L1=5 turns, L2=7, L3=9, L4=11 with 5 types both directions" },
    { code: "§STEP.FEAT2", title: "Feature 2: Rotations Both Directions", page: "53", summary: "Full body rotation CW and CCW, each covering 1/3 of pattern" },
    { code: "§STEP.FEAT3", title: "Feature 3: Body Movements", page: "53", summary: "Arms, head, torso, hips, legs affecting main body core, 1/3 of pattern" },
    { code: "§STEP.FEAT4", title: "Feature 4: Turn Combinations", page: "54", summary: "Two 3-turn combos on each foot, continuous flow, first attempt counts, no 3-turns" },
    { code: "§STEP.JUMPS", title: "Jumps in Step Sequences", page: "55", summary: "Unlisted = allowed no deduction, listed in SP = ignored (GOE), listed in FS = called" },
    { code: "§STEP.LEVELS", title: "Level Caps by Competitive Level", page: "55", summary: "Juvenile/Intermediate max StSq2, Novice+ max StSq4" },
  ]},
  { section: "CHOREOGRAPHIC", entries: [
    { code: "§CHOREO.DEF", title: "ChSq Definition & Confirmation", page: "56", summary: "2+ different movements (spirals, arabesques, spread eagles, Ina Bauers, hydroblading)" },
    { code: "§CHOREO.JUMPS", title: "Jumps in ChSq", page: "56–57", summary: "Listed jumps ≤2 revolutions = not called, ≥2.5 revolutions ends ChSq and is called" },
    { code: "§CHOREO.ENDS", title: "ChSq Termination", page: "57", summary: "Ends at: spin commencement, ≥2.5 rev jump, or completion of pattern" },
    { code: "§CHOREO.LEVELS", title: "ChSq Levels & Requirements", page: "57", summary: "Senior FS only, no required order with StSq, fixed base value" },
  ]},
];

// ─── PROGRESS ANALYTICS COMPONENT ────────────────────────────────────────────
function ProgressAnalytics({ progress }) {
  const catData = CATEGORIES.map(cat => {
    const p = progress[cat.id] || {};
    const correct = p.correct || 0;
    const incorrect = p.incorrect || 0;
    const attempted = correct + incorrect;
    const pct = attempted > 0 ? Math.round(correct / attempted * 100) : null;
    const mcTotal = QUESTION_BANK.mc_questions.filter(q => q.category === cat.id).length;
    const fcTotal = QUESTION_BANK.flashcards.filter(f => f.category === cat.id).length;
    const seen = p.seen?.length || 0;
    const learnTopics = p.learnTopics?.length || 0;
    const flashcardsSeen = p.flashcardsSeen || 0;
    return { ...cat, correct, incorrect, attempted, pct, mcTotal, fcTotal, seen, learnTopics, flashcardsSeen };
  });

  const totalAttempted = catData.reduce((s, c) => s + c.attempted, 0);
  const totalCorrect = catData.reduce((s, c) => s + c.correct, 0);
  const totalQuestions = catData.reduce((s, c) => s + c.mcTotal, 0);
  const totalFlashcards = catData.reduce((s, c) => s + c.fcTotal, 0);
  const totalSeen = catData.reduce((s, c) => s + c.seen, 0);
  const totalFC = catData.reduce((s, c) => s + c.flashcardsSeen, 0);
  const totalLearn = catData.reduce((s, c) => s + c.learnTopics, 0);

  const masteryLevel = (pct) => {
    if (pct === null) return { label: "Not started", color: "#4A6080" };
    if (pct >= 90) return { label: "Mastery", color: "#1A7A4A" };
    if (pct >= 75) return { label: "Proficient", color: "#0D7377" };
    if (pct >= 60) return { label: "Developing", color: "#E8A838" };
    return { label: "Needs work", color: "#C0392B" };
  };

  return React.createElement("div", null,
    // Overall stats
    React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" } },
      [
        { num: totalAttempted, label: "Questions Answered" },
        { num: totalAttempted > 0 ? Math.round(totalCorrect/totalAttempted*100)+"%" : "—", label: "Overall Accuracy" },
        { num: totalSeen + "/" + totalQuestions, label: "Unique Questions Seen" },
        { num: totalFC, label: "Flashcards Reviewed" },
        { num: totalLearn, label: "Learn Topics Covered" },
      ].map((s, i) => React.createElement("div", { key: i, style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.75rem", textAlign: "center" } },
        React.createElement("div", { style: { fontSize: "1.4rem", color: "#A8D8EA" } }, s.num),
        React.createElement("div", { style: { fontSize: "0.65rem", color: "#6B8CAE", marginTop: "0.2rem" } }, s.label)
      ))
    ),
    // Per-category breakdown
    React.createElement("div", { style: { fontSize: "0.75rem", letterSpacing: "2px", textTransform: "uppercase", color: "#6B8CAE", marginBottom: "0.75rem" } }, "By Element"),
    ...catData.map(c => {
      const m = masteryLevel(c.pct);
      return React.createElement("div", { key: c.id, style: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "0.75rem", marginBottom: "0.5rem", borderLeft: "3px solid " + c.color } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" } },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" } },
            React.createElement("span", null, c.icon),
            React.createElement("span", { style: { fontWeight: "bold", fontSize: "0.9rem" } }, c.label)
          ),
          React.createElement("span", { style: { fontSize: "0.7rem", padding: "0.15rem 0.5rem", background: m.color + "33", color: m.color, borderRadius: "4px", border: "1px solid " + m.color + "55" } }, m.label)
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", fontSize: "0.75rem", color: "#8BA0B8" } },
          React.createElement("div", null,
            React.createElement("div", { style: { color: "#A8D8EA", fontSize: "1rem" } }, c.pct !== null ? c.pct + "%" : "—"),
            "Quiz accuracy (" + c.attempted + " answered)"
          ),
          React.createElement("div", null,
            React.createElement("div", { style: { color: "#A8D8EA", fontSize: "1rem" } }, c.seen + "/" + c.mcTotal),
            "Unique questions seen"
          ),
          React.createElement("div", null,
            React.createElement("div", { style: { color: "#A8D8EA", fontSize: "1rem" } }, c.flashcardsSeen),
            "Flashcards of " + c.fcTotal + " reviewed"
          )
        ),
        // Progress bar
        c.mcTotal > 0 ? React.createElement("div", { style: { marginTop: "0.5rem" } },
          React.createElement("div", { style: { fontSize: "0.65rem", color: "#4A6080", marginBottom: "0.2rem" } }, "Question coverage"),
          React.createElement("div", { style: { height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px" } },
            React.createElement("div", { style: { height: "100%", width: Math.min(100, Math.round(c.seen/c.mcTotal*100)) + "%", background: c.color, borderRadius: "2px" } })
          )
        ) : null
      );
    })
  );
}

// ─── TPH INDEX COMPONENT ─────────────────────────────────────────────────────
function TPHIndex() {
  const [expanded, setExpanded] = useState({});
  const [search, setSearch] = useState("");

  const toggle = (section) => setExpanded(prev => ({ ...prev, [section]: !prev[section] }));

  const filteredSections = TPH_INDEX.map(sec => {
    const entries = sec.entries.filter(e =>
      !search || e.code.toLowerCase().includes(search.toLowerCase()) ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.summary.toLowerCase().includes(search.toLowerCase())
    );
    return { ...sec, entries };
  }).filter(sec => sec.entries.length > 0);

  return React.createElement("div", null,
    React.createElement("div", { style: { marginBottom: "1rem", padding: "0.75rem", background: "rgba(168,216,234,0.08)", border: "1px solid rgba(168,216,234,0.2)", borderRadius: "8px", fontSize: "0.8rem", color: "#8BA0B8", lineHeight: 1.6 } },
      "This index maps to sections in the ", React.createElement("strong", { style: { color: "#A8D8EA" } }, "ISU Technical Panel Handbook, Singles (2025–2026)"),
      ". Use the citation codes (e.g. §SPIN.FEAT.CFJ) to find specific rules. Page numbers reference the official TPH-S document."
    ),
    // Search
    React.createElement("input", {
      type: "text", placeholder: "Search sections…", value: search,
      onChange: e => setSearch(e.target.value),
      style: { width: "100%", padding: "0.6rem 0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", color: "#C0D0E8", fontSize: "0.85rem", fontFamily: "inherit", outline: "none", marginBottom: "1rem", boxSizing: "border-box" }
    }),
    // Sections
    ...filteredSections.map(sec =>
      React.createElement("div", { key: sec.section, style: { marginBottom: "0.75rem" } },
        React.createElement("button", {
          onClick: () => toggle(sec.section),
          style: { width: "100%", padding: "0.6rem 0.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#A8D8EA", fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }
        },
          React.createElement("span", null, (expanded[sec.section] ? "▾ " : "▸ ") + sec.section + " (" + sec.entries.length + " sections)"),
          React.createElement("span", { style: { fontSize: "0.7rem", color: "#4A6080" } }, sec.entries[0]?.page?.split("–")[0] && "pp. " + sec.entries[0].page + "–" + sec.entries[sec.entries.length-1].page?.split("–").pop())
        ),
        expanded[sec.section] && React.createElement("div", { style: { padding: "0.25rem 0 0 0" } },
          ...sec.entries.map(entry =>
            React.createElement("div", { key: entry.code, style: { padding: "0.6rem 0.75rem", marginTop: "1px", background: "rgba(255,255,255,0.02)", borderLeft: "2px solid " + (CATEGORIES.find(c => sec.section.toLowerCase().startsWith(c.id.slice(0,4)))?.color || "#0D7377"), borderRadius: "0 6px 6px 0" } },
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" } },
                React.createElement("div", null,
                  React.createElement("code", { style: { fontSize: "0.7rem", color: "#0D7377", background: "rgba(13,115,119,0.15)", padding: "0.1rem 0.3rem", borderRadius: "3px" } }, entry.code),
                  React.createElement("span", { style: { marginLeft: "0.5rem", fontSize: "0.85rem", color: "#C0D0E8" } }, entry.title)
                ),
                React.createElement("span", { style: { fontSize: "0.7rem", color: "#4A6080", whiteSpace: "nowrap", marginLeft: "0.5rem" } }, "p. " + entry.page)
              ),
              React.createElement("div", { style: { fontSize: "0.75rem", color: "#6B8CAE", marginTop: "0.3rem", lineHeight: 1.5 } }, entry.summary)
            )
          )
        )
      )
    )
  );
}

// ─── STORAGE HELPERS (in-memory for artifact compatibility) ──────────────────

// ─── TPH PDF VIEWER COMPONENT ───────────────────────────────────────────────
function TPHViewer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showIndex, setShowIndex] = useState(false);
  const iframeRef = useRef(null);

  // Map TPH Index sections to their page numbers in the actual PDF
  const PAGE_MAP = [
    { label: "Calling Procedure", page: 2 },
    { label: "Step Sequences — Rules", page: 3 },
    { label: "Step Sequences — Level Features", page: 3 },
    { label: "Step Sequences — Clarifications", page: 3 },
    { label: "Turns & Steps Definitions", page: 4 },
    { label: "Variety / Complexity Requirements", page: 4 },
    { label: "Rotations & Body Movements", page: 4 },
    { label: "Turn Combinations (Feature 4)", page: 5 },
    { label: "Jumps in Step Sequences", page: 5 },
    { label: "Choreographic Sequence", page: 6 },
    { label: "Spins — General Rules", page: 7 },
    { label: "Spins — Short Program Requirements", page: 8 },
    { label: "Spins — SP Specific (Layback, Men CoF)", page: 8 },
    { label: "Spins — Free Skating Requirements", page: 9 },
    { label: "Spin Level Features (1–14)", page: 10 },
    { label: "Level 4 Mandatory Features", page: 11 },
    { label: "Spin Positions — Clarifications", page: 12 },
    { label: "Spin Entrance / Exit", page: 13 },
    { label: "Difficult Variations (11 Categories)", page: 14 },
    { label: "Windmill / Biellmann / Crossfoot", page: 14 },
    { label: "Repetitions & Attempts", page: 15 },
    { label: "Increase of Speed / Jump in Spin", page: 16 },
    { label: "Edges & Directions (Change of Edge, Both Dir.)", page: 17 },
    { label: "Change of Foot / 8 Revolutions", page: 17 },
    { label: "Difficult Blade Feature", page: 18 },
    { label: "V Sign Rules", page: 19 },
    { label: "Spin Position Photos", page: 19 },
    { label: "Jump Elements — Rules", page: 21 },
    { label: "Jump Combinations", page: 22 },
    { label: "Jump Sequences (FS)", page: 23 },
    { label: "Rotation: q, <, <<, Over-rotated", page: 23 },
    { label: "Edge Calls (Flip/Lutz)", page: 24 },
    { label: "Popped / Non-listed Jumps", page: 24 },
    { label: "Landing / Attempted Jump", page: 25 },
    { label: "Short Program — Jump Clarifications", page: 26 },
    { label: "Free Skating — Repetition Rules", page: 26 },
    { label: "FS Extra Combos / Sequences", page: 27 },
    { label: "Elements with No Value / Max Level Table", page: 28 },
  ];

  const TOTAL_PAGES = 28;

  // Build the PDF URL — works both in deployed mode and artifact mode
  const getPdfUrl = () => {
    // When deployed: served from /public/TP-Handbook-Singles-2025-26.pdf
    // The server should serve this file statically
    return "/TP-Handbook-Singles-2025-26.pdf#page=" + currentPage;
  };

  const goToPage = (page) => {
    const p = Math.max(1, Math.min(TOTAL_PAGES, page));
    setCurrentPage(p);
    // Update iframe src to jump to page
    if (iframeRef.current) {
      iframeRef.current.src = "/TP-Handbook-Singles-2025-26.pdf#page=" + p;
    }
  };

  const filteredPages = PAGE_MAP.filter(item =>
    !searchQuery || item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Header info */}
      <div style={{
        marginBottom: "1rem", padding: "0.75rem 1rem",
        background: "rgba(168,216,234,0.08)", border: "1px solid rgba(168,216,234,0.2)",
        borderRadius: "8px", fontSize: "0.8rem", color: "#8BA0B8", lineHeight: 1.6,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem",
      }}>
        <span>
          <strong style={{ color: "#A8D8EA" }}>ISU Technical Panel Handbook — Single Skating 2025–2026</strong>
          <span style={{ marginLeft: "0.5rem", fontSize: "0.7rem", color: "#4A6080" }}>({TOTAL_PAGES} pages)</span>
        </span>
        <button onClick={() => setShowIndex(!showIndex)} style={{
          background: showIndex ? "rgba(13,115,119,0.3)" : "rgba(255,255,255,0.05)",
          border: "1px solid " + (showIndex ? "#0D7377" : "rgba(255,255,255,0.15)"),
          color: showIndex ? "#A8D8EA" : "#6B8CAE",
          padding: "0.3rem 0.75rem", borderRadius: "6px", cursor: "pointer",
          fontSize: "0.75rem", fontFamily: "inherit",
        }}>
          {showIndex ? "▾ Hide Quick Nav" : "▸ Quick Nav"}
        </button>
      </div>

      {/* Quick Nav panel */}
      {showIndex && (
        <div style={{
          marginBottom: "1rem", background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px",
          padding: "0.75rem", maxHeight: "300px", overflowY: "auto",
        }}>
          <input
            type="text" placeholder="Filter sections…" value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: "100%", padding: "0.5rem 0.75rem", background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: "6px",
              color: "#C0D0E8", fontSize: "0.8rem", fontFamily: "inherit",
              outline: "none", marginBottom: "0.5rem", boxSizing: "border-box",
            }}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
            {filteredPages.map((item, i) => (
              <button key={i} onClick={() => { goToPage(item.page); setShowIndex(false); }} style={{
                padding: "0.4rem 0.6rem", background: currentPage === item.page ? "rgba(13,115,119,0.2)" : "transparent",
                border: "none", borderRadius: "4px", color: currentPage === item.page ? "#A8D8EA" : "#8BA0B8",
                fontSize: "0.73rem", cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                lineHeight: 1.3,
              }}
              onMouseEnter={e => { if (currentPage !== item.page) e.target.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={e => { if (currentPage !== item.page) e.target.style.background = "transparent"; }}
              >
                <span style={{ color: "#0D7377", marginRight: "0.3rem", fontSize: "0.65rem" }}>p.{item.page}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Page navigation controls */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
        marginBottom: "0.75rem", flexWrap: "wrap",
      }}>
        <button onClick={() => goToPage(1)} disabled={currentPage <= 1} style={{
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
          color: currentPage <= 1 ? "#2A3A5A" : "#A8D8EA", borderRadius: "6px",
          padding: "0.35rem 0.6rem", cursor: currentPage <= 1 ? "default" : "pointer",
          fontSize: "0.75rem", fontFamily: "inherit",
        }}>⏮ First</button>

        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1} style={{
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
          color: currentPage <= 1 ? "#2A3A5A" : "#A8D8EA", borderRadius: "6px",
          padding: "0.35rem 0.75rem", cursor: currentPage <= 1 ? "default" : "pointer",
          fontSize: "0.8rem", fontFamily: "inherit",
        }}>◂ Prev</button>

        <div style={{
          display: "flex", alignItems: "center", gap: "0.3rem",
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "6px", padding: "0.25rem 0.5rem",
        }}>
          <span style={{ color: "#6B8CAE", fontSize: "0.75rem" }}>Page</span>
          <input
            type="number" min={1} max={TOTAL_PAGES} value={currentPage}
            onChange={e => {
              const v = parseInt(e.target.value);
              if (!isNaN(v)) setCurrentPage(Math.max(1, Math.min(TOTAL_PAGES, v)));
            }}
            onBlur={() => goToPage(currentPage)}
            onKeyDown={e => e.key === "Enter" && goToPage(currentPage)}
            style={{
              width: "40px", background: "transparent", border: "none",
              color: "#A8D8EA", fontSize: "0.9rem", textAlign: "center",
              outline: "none", fontFamily: "inherit",
            }}
          />
          <span style={{ color: "#4A6080", fontSize: "0.75rem" }}>/ {TOTAL_PAGES}</span>
        </div>

        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= TOTAL_PAGES} style={{
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
          color: currentPage >= TOTAL_PAGES ? "#2A3A5A" : "#A8D8EA", borderRadius: "6px",
          padding: "0.35rem 0.75rem", cursor: currentPage >= TOTAL_PAGES ? "default" : "pointer",
          fontSize: "0.8rem", fontFamily: "inherit",
        }}>Next ▸</button>

        <button onClick={() => goToPage(TOTAL_PAGES)} disabled={currentPage >= TOTAL_PAGES} style={{
          background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
          color: currentPage >= TOTAL_PAGES ? "#2A3A5A" : "#A8D8EA", borderRadius: "6px",
          padding: "0.35rem 0.6rem", cursor: currentPage >= TOTAL_PAGES ? "default" : "pointer",
          fontSize: "0.75rem", fontFamily: "inherit",
        }}>Last ⏭</button>
      </div>

      {/* PDF Viewer iframe */}
      <div style={{
        background: "#1A2A4A", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "8px", overflow: "hidden",
      }}>
        <iframe
          ref={iframeRef}
          src={getPdfUrl()}
          title="ISU Technical Panel Handbook - Singles 2025-2026"
          style={{
            width: "100%", height: "75vh", border: "none",
            background: "#FFFFFF",
          }}
        />
      </div>

      {/* Download / open in new tab */}
      <div style={{
        display: "flex", justifyContent: "center", gap: "1rem",
        marginTop: "0.75rem",
      }}>
        <a href="/TP-Handbook-Singles-2025-26.pdf" target="_blank" rel="noopener noreferrer" style={{
          color: "#6B8CAE", fontSize: "0.75rem", textDecoration: "none",
        }}>↗ Open in new tab</a>
        <a href="/TP-Handbook-Singles-2025-26.pdf" download style={{
          color: "#6B8CAE", fontSize: "0.75rem", textDecoration: "none",
        }}>⬇ Download PDF</a>
      </div>
    </div>
  );
}
function loadProgress() { return {}; }

// Debounced save — waits 800ms after last update before POSTing to server
let _saveTimeout = null;
function saveProgress(progressData, username) {
  const isArtifact = typeof window !== "undefined" && window.location.hostname.includes("claude.ai");
  if (isArtifact || !username) return;
  clearTimeout(_saveTimeout);
  _saveTimeout = setTimeout(async () => {
    try {
      await fetch(`/api/progress/${encodeURIComponent(username)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress: progressData }),
      });
    } catch (e) { console.warn("Failed to save progress:", e); }
  }, 800);
}

async function fetchProgress(username) {
  const isArtifact = typeof window !== "undefined" && window.location.hostname.includes("claude.ai");
  if (isArtifact || !username) return {};
  try {
    const res = await fetch(`/api/progress/${encodeURIComponent(username)}`);
    const data = await res.json();
    return data.progress || {};
  } catch (e) { return {}; }
}

// ─── API HELPER ───────────────────────────────────────────────────────────────
async function callClaude(messages, systemExtra = "", appState = {}) {
  const username = appState.candidateName || "anonymous";
  const userApiKey = appState.apiKey || null;
  
  const systemPrompt = `You are a figure skating technical panel training assistant. You help candidates prepare for their technical specialist exam. You are encouraging but precise — skating rules have no room for vagueness.

Your knowledge base:
${FRAMEWORK_CONTENT}

${systemExtra}

Keep responses focused and clear. Use concrete examples. When explaining why an answer is wrong, reference the specific rule. Don't pad — candidates need to absorb a lot of information efficiently.`;

  // Determine endpoint: use backend proxy if available, fall back to direct API for artifact mode
  const isArtifact = typeof window !== "undefined" && window.location.hostname.includes("claude.ai");
  const endpoint = isArtifact ? "https://api.anthropic.com/v1/messages" : "/api/chat";
  
  const body = isArtifact ? {
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: systemPrompt,
    messages,
  } : {
    messages,
    system: systemPrompt,
    username,
    userApiKey,
  };

  const headers = { "Content-Type": "application/json" };

  const res = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify(body) });
  const data = await res.json();
  
  // Handle free limit reached (backend proxy only)
  if (data.error === "free_limit_reached") {
    return "⚠️ " + data.message;
  }
  if (data.error === "api_error") {
    return "API Error: " + data.message;
  }
  
  // Return usage info alongside response if available
  if (data._usage && appState.onUsageUpdate) {
    appState.onUsageUpdate(data._usage);
  }
  
  return data.content?.[0]?.text || "Error getting response.";
}

// ─── DISPUTE DETECTION ───────────────────────────────────────────────────────
const DISPUTE_PATTERNS = [
  /that'?s (?:not |in)?correct/i, /that'?s wrong/i, /you'?re wrong/i,
  /i don'?t think that'?s right/i, /actually[,\s]+(?:the|it|that)/i,
  /no[,\s]+the (?:rule|answer|correct)/i, /the (?:rule|handbook|tph) (?:says|states)/i,
  /i disagree/i, /that contradicts/i, /are you sure/i,
  /the correct answer is/i, /it should be/i, /that'?s not how/i,
];

function isDispute(text) {
  return DISPUTE_PATTERNS.some(p => p.test(text));
}

async function submitFeedback(data) {
  const isArtifact = typeof window !== "undefined" && window.location.hostname.includes("claude.ai");
  if (isArtifact) { console.log("[FEEDBACK]", data); return; }
  try {
    await fetch("/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  } catch (e) { console.error("Feedback submit failed:", e); }
}

async function submitDispute(data) {
  const isArtifact = typeof window !== "undefined" && window.location.hostname.includes("claude.ai");
  if (isArtifact) { console.log("[AUTO-DISPUTE]", data); return; }
  try {
    await fetch("/api/feedback/dispute", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  } catch (e) { console.error("Dispute submit failed:", e); }
}

// ─── FEEDBACK MODAL ──────────────────────────────────────────────────────────
function FeedbackModal({ aiResponse, onClose, onSubmit }) {
  const [issue, setIssue] = useState("");
  const [correction, setCorrection] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    onSubmit({ issue, correction, aiResponse });
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  if (submitted) {
    return (
      <div style={{
        position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex",
        alignItems:"center", justifyContent:"center", zIndex:100,
      }}>
        <div style={{
          background:"#1A2A4A", borderRadius:"16px", padding:"2rem", maxWidth:"400px", textAlign:"center",
        }}>
          <div style={{ fontSize:"2rem", marginBottom:"0.5rem" }}>✓</div>
          <div style={{ color:"#4ADE80", fontSize:"1rem" }}>Thank you — feedback submitted</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", display:"flex",
      alignItems:"center", justifyContent:"center", zIndex:100,
    }} onClick={onClose}>
      <div style={{
        background:"#0F1D35", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"16px",
        padding:"1.5rem", maxWidth:"500px", width:"90%",
      }} onClick={e => e.stopPropagation()}>
        <h3 style={{ color:"#A8D8EA", fontSize:"0.8rem", letterSpacing:"3px", textTransform:"uppercase", margin:"0 0 1rem" }}>
          Report an Issue
        </h3>

        <div style={{
          background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)",
          borderRadius:"8px", padding:"0.75rem", marginBottom:"1rem", maxHeight:"100px", overflow:"auto",
          fontSize:"0.8rem", color:"#6B8CAE", lineHeight:1.5,
        }}>
          {aiResponse?.slice(0, 300)}{aiResponse?.length > 300 ? "..." : ""}
        </div>

        <label style={{ display:"block", fontSize:"0.8rem", color:"#8BA0B8", marginBottom:"0.25rem" }}>
          What's wrong?
        </label>
        <textarea value={issue} onChange={e => setIssue(e.target.value)}
          placeholder="e.g., The rule about edge change direction in sit spins is incorrect"
          style={{
            width:"100%", minHeight:"60px", padding:"0.5rem", background:"rgba(255,255,255,0.06)",
            border:"1px solid rgba(255,255,255,0.15)", borderRadius:"8px", color:"#FFFFFF",
            fontSize:"0.85rem", resize:"vertical", outline:"none", fontFamily:"inherit",
            boxSizing:"border-box", marginBottom:"0.75rem",
          }} />

        <label style={{ display:"block", fontSize:"0.8rem", color:"#8BA0B8", marginBottom:"0.25rem" }}>
          What should it say? (optional)
        </label>
        <textarea value={correction} onChange={e => setCorrection(e.target.value)}
          placeholder="e.g., Only BI→FO is valid for sit spin edge change"
          style={{
            width:"100%", minHeight:"60px", padding:"0.5rem", background:"rgba(255,255,255,0.06)",
            border:"1px solid rgba(255,255,255,0.15)", borderRadius:"8px", color:"#FFFFFF",
            fontSize:"0.85rem", resize:"vertical", outline:"none", fontFamily:"inherit",
            boxSizing:"border-box", marginBottom:"1rem",
          }} />

        <div style={{ display:"flex", gap:"0.5rem", justifyContent:"flex-end" }}>
          <button onClick={onClose} style={{
            padding:"0.5rem 1rem", background:"none", border:"1px solid rgba(255,255,255,0.15)",
            borderRadius:"8px", color:"#6B8CAE", cursor:"pointer", fontFamily:"inherit",
          }}>Cancel</button>
          <button onClick={handleSubmit} disabled={!issue.trim()} style={{
            padding:"0.5rem 1rem", background: issue.trim() ? "#0D7377" : "#1A2A4A",
            border:"none", borderRadius:"8px", color: issue.trim() ? "#FFFFFF" : "#4A6080",
            cursor: issue.trim() ? "pointer" : "not-allowed", fontFamily:"inherit",
          }}>Submit</button>
        </div>
      </div>
    </div>
  );
}

// ─── NOTIFICATION & FEEDBACK HELPERS ──────────────────────────────────────────
async function fetchNotifications(username) {
  const isArtifact = typeof window !== "undefined" && window.location.hostname.includes("claude.ai");
  if (isArtifact || !username) return { notifications: [], unreadCount: 0 };
  try {
    const res = await fetch(`/api/notifications/${encodeURIComponent(username)}`);
    return await res.json();
  } catch (e) { return { notifications: [], unreadCount: 0 }; }
}

async function markNotificationsRead(username, notificationId) {
  const isArtifact = typeof window !== "undefined" && window.location.hostname.includes("claude.ai");
  if (isArtifact || !username) return;
  try {
    if (notificationId) {
      await fetch(`/api/notifications/${notificationId}/read`, { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }) });
    } else {
      await fetch("/api/notifications/read-all", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }) });
    }
  } catch (e) { /* silent */ }
}

async function fetchChangelog(limit = 20) {
  const isArtifact = typeof window !== "undefined" && window.location.hostname.includes("claude.ai");
  if (isArtifact) return { changelog: [] };
  try {
    const res = await fetch(`/api/changelog?limit=${limit}`);
    return await res.json();
  } catch (e) { return { changelog: [] }; }
}

// ─── NOTIFICATION BELL ────────────────────────────────────────────────────────
function NotificationBell({ username }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  const poll = useCallback(async () => {
    const data = await fetchNotifications(username);
    setNotifications(data.notifications || []);
    setUnreadCount(data.unreadCount || 0);
  }, [username]);

  useEffect(() => { poll(); const t = setInterval(poll, 30000); return () => clearInterval(t); }, [poll]);

  const handleOpen = async () => {
    setOpen(!open);
    if (!open && unreadCount > 0) {
      await markNotificationsRead(username);
      setUnreadCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, read: 1 })));
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button onClick={handleOpen} style={{
        background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "#6B8CAE",
        padding: "0.25rem 0.6rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem",
        fontFamily: "inherit", position: "relative",
      }}>
        🔔{unreadCount > 0 && (
          <span style={{
            position: "absolute", top: "-6px", right: "-6px", background: "#C0392B",
            color: "#FFF", borderRadius: "50%", width: "18px", height: "18px",
            fontSize: "0.65rem", display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "bold",
          }}>{unreadCount}</span>
        )}
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "110%", right: 0, width: "320px", maxHeight: "400px",
          overflow: "auto", background: "#0F1B2E", border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "10px", boxShadow: "0 8px 30px rgba(0,0,0,0.4)", zIndex: 100,
        }}>
          <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.08)",
            fontSize: "0.8rem", color: "#A8D8EA", fontWeight: "bold" }}>
            Notifications
          </div>
          {notifications.length === 0 ? (
            <div style={{ padding: "1.5rem", textAlign: "center", color: "#4A6080", fontSize: "0.8rem" }}>
              No notifications yet
            </div>
          ) : notifications.map(n => (
            <div key={n.id} style={{
              padding: "0.75rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.05)",
              background: n.read ? "transparent" : "rgba(13,115,119,0.08)",
            }}>
              <div style={{ fontSize: "0.8rem", fontWeight: n.read ? "normal" : "bold", color: "#D0D8EE" }}>
                {n.title}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6B8CAE", marginTop: "0.25rem", whiteSpace: "pre-wrap" }}>
                {n.message}
              </div>
              <div style={{ fontSize: "0.65rem", color: "#3A5070", marginTop: "0.25rem" }}>
                {new Date(n.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── GUIDE PANEL ─────────────────────────────────────────────────────────────
function GuidePanel() {
  var sec = {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px", padding: "1.5rem", marginBottom: "1.25rem"
  };
  var hd = {
    fontSize: "0.8rem", letterSpacing: "2px", textTransform: "uppercase",
    color: "#A8D8EA", marginBottom: "1rem"
  };
  var tx = { color: "#8BA0B8", fontSize: "0.9rem", lineHeight: 1.7 };
  var bul = { color: "#8BA0B8", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.5rem", paddingLeft: "0.5rem" };
  var lbl = { color: "#A8D8EA" };
  var warn = { color: "#F59E0B", fontWeight: "bold" };

  return React.createElement("div", null,
    React.createElement("div", { style: {
      background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
      borderRadius: "12px", padding: "1.25rem", marginBottom: "1.5rem", textAlign: "center"
    }},
      React.createElement("div", { style: { color: "#F59E0B", fontSize: "1rem", fontWeight: "bold", marginBottom: "0.5rem" } }, "This tool is currently in beta"),
      React.createElement("div", { style: { color: "#8BA0B8", fontSize: "0.85rem", lineHeight: 1.7 } },
        "Content is actively being reviewed and corrected. Do not treat any answer as authoritative. Always verify against the official TP Handbook."
      )
    ),

    React.createElement("div", { style: sec },
      React.createElement("div", { style: hd }, "What is this?"),
      React.createElement("p", { style: tx },
        "The TP Study Assistant is a web-based study tool built to help you prepare for the U.S. Figure Skating Technical Panel seminar. It covers singles rules from the 2025-26 TP Handbook across jumps, spins, choreographic sequences, and general/step sequence topics."
      )
    ),

    React.createElement("div", { style: sec },
      React.createElement("div", { style: hd }, "Study Modes"),
      React.createElement("div", { style: bul },
        React.createElement("span", { style: lbl }, "Quiz"), " - Multiple choice questions from a built-in question bank (120 questions). Test your knowledge and get instant feedback. ", React.createElement("span", { style: { color: "#0D7377" } }, "Always free, no limits.")
      ),
      React.createElement("div", { style: bul },
        React.createElement("span", { style: lbl }, "Flashcards"), " - Rapid-fire review cards (395 total) to reinforce key concepts. ", React.createElement("span", { style: { color: "#0D7377" } }, "Always free, no limits.")
      ),
      React.createElement("div", { style: bul },
        React.createElement("span", { style: lbl }, "Learn"), " - AI-guided, Socratic-style teaching that walks you through the framework topic by topic. Uses AI responses (limited - see below)."
      ),
      React.createElement("div", { style: bul },
        React.createElement("span", { style: lbl }, "Reference"), " - Ask the AI any rule question and get an answer with handbook citations. Uses AI responses (limited - see below)."
      )
    ),

    React.createElement("div", { style: sec },
      React.createElement("div", { style: hd }, "Other Tools"),
      React.createElement("div", { style: bul },
        React.createElement("span", { style: lbl }, "My Progress"), " - Track your accuracy, coverage, and mastery across categories"
      ),
      React.createElement("div", { style: bul },
        React.createElement("span", { style: lbl }, "TPH Index"), " - Searchable citation index mapped to handbook sections"
      ),
      React.createElement("div", { style: bul },
        React.createElement("span", { style: lbl }, "TPH Handbook"), " - Full embedded PDF of the 2025-26 TP Handbook for Singles"
      )
    ),

    React.createElement("div", { style: sec },
      React.createElement("div", { style: hd }, "AI Response Limits"),
      React.createElement("p", { style: tx },
        "Learn and Reference modes are powered by a live AI (Claude) and each response costs real money to run. Each user gets"
      ),
      React.createElement("p", { style: { color: "#A8D8EA", fontSize: "1.1rem", lineHeight: 1.7, textAlign: "center", margin: "1rem 0" } },
        "25 free AI responses"
      ),
      React.createElement("p", { style: tx },
        "Quiz and Flashcard modes are always unlimited and free. If you would like unlimited AI access, you can add your own API key (see below)."
      )
    ),

    React.createElement("div", { style: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.25rem", borderLeft: "3px solid #0D7377" } },
      React.createElement("div", { style: hd }, "How to Get Your Own API Key for Unlimited AI Access"),
      React.createElement("p", { style: { color: "#8BA0B8", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" } },
        "If you use up your 25 free responses and want to keep using Learn and Reference modes, you can add your own Anthropic API key:"
      ),
      React.createElement("ol", { style: { color: "#8BA0B8", fontSize: "0.9rem", lineHeight: 1.7, paddingLeft: "1.5rem" } },
        React.createElement("li", { style: { marginBottom: "0.5rem" } },
          "Go to ", React.createElement("span", { style: lbl }, "console.anthropic.com"), " and click ", React.createElement("strong", null, "Sign up")
        ),
        React.createElement("li", { style: { marginBottom: "0.5rem" } },
          "Create an account with your email (Google sign-in also works)"
        ),
        React.createElement("li", { style: { marginBottom: "0.5rem" } },
          "Once logged in, go to ", React.createElement("strong", { style: lbl }, "Settings > API Keys")
        ),
        React.createElement("li", { style: { marginBottom: "0.5rem" } },
          "Click ", React.createElement("strong", null, "Create Key"), ", give it any name (e.g. 'skating study'), and copy the key - it starts with ", React.createElement("code", { style: { background: "rgba(255,255,255,0.08)", padding: "0.15rem 0.4rem", borderRadius: "4px", fontSize: "0.85rem" } }, "sk-ant-")
        ),
        React.createElement("li", { style: { marginBottom: "0.5rem" } },
          "Back in this app, go to ", React.createElement("strong", { style: lbl }, "Settings"), " (gear icon) and paste your key into the API key field"
        )
      ),
      React.createElement("div", { style: {
        background: "rgba(13,115,119,0.15)", borderRadius: "8px", padding: "1rem", marginTop: "1rem"
      }},
        React.createElement("div", { style: { color: "#8BA0B8", fontSize: "0.85rem", lineHeight: 1.7 } },
          React.createElement("strong", { style: lbl }, "How much does it cost? "),
          "Anthropic uses prepaid credits. Add a minimum of $5 in credits (Settings > Billing > Add Credits). Each AI response costs roughly $0.10, so $5 gets you about 50 additional responses. You only pay for what you use - no subscription or recurring charge."
        )
      )
    ),

    React.createElement("div", { style: sec },
      React.createElement("div", { style: hd }, "Please Be Critical"),
      React.createElement("p", { style: { color: "#8BA0B8", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.75rem" } },
        "The question bank, flashcard content, and AI responses are all works in progress. ", React.createElement("span", { style: warn }, "Do not treat any answer as authoritative."), " Always verify against the official TP Handbook."
      ),
      React.createElement("div", { style: bul }, "- Use the flag/report button if you spot an error"),
      React.createElement("div", { style: bul }, "- The AI can and will make mistakes - especially on nuanced edge-call scenarios, bonus calculations, and level-counting"),
      React.createElement("div", { style: bul }, "- We are actively reviewing and correcting the question bank")
    ),

    React.createElement("div", { style: sec },
      React.createElement("div", { style: hd }, "Privacy and Anonymity"),
      React.createElement("p", { style: tx },
        "Your usage is ", React.createElement("strong", { style: lbl }, "completely anonymous"),
        ". The username you enter is only used to save your study progress so you can pick up where you left off. It is not linked to your identity, your seminar registration, or your results at the seminar in any way. This tool has no connection to U.S. Figure Skating's evaluation process. It is only a study aid."
      )
    )
  );
}

// ─── CHANGELOG PANEL ──────────────────────────────────────────────────────────
function ChangelogPanel() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await fetchChangelog(30);
      setEntries(data.changelog || []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <LoadingState color="#0D7377" text="Loading changelog..." />;

  const typeColors = { fix: "#E8A838", improvement: "#0D7377", new: "#1A7A4A" };

  return (
    <div>
      <p style={{ fontSize: "0.8rem", color: "#6B8CAE", marginBottom: "1rem" }}>
        Content updates made based on candidate and faculty feedback. Your reports make this tool better for everyone.
      </p>
      {entries.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#4A6080" }}>
          No changelog entries yet — submit feedback to help improve the content!
        </div>
      ) : entries.map(e => (
        <div key={e.id} style={{
          padding: "0.75rem 1rem", borderLeft: `3px solid ${typeColors[e.change_type] || "#6B8CAE"}`,
          background: "rgba(255,255,255,0.03)", borderRadius: "0 8px 8px 0",
          marginBottom: "0.5rem",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", fontSize: "0.85rem" }}>{e.title}</span>
            <span style={{
              fontSize: "0.65rem", padding: "0.15rem 0.5rem", borderRadius: "4px",
              background: (typeColors[e.change_type] || "#6B8CAE") + "33",
              color: typeColors[e.change_type] || "#6B8CAE", textTransform: "uppercase",
            }}>{e.change_type}</span>
          </div>
          {e.description && <p style={{ margin: "0.25rem 0 0", fontSize: "0.8rem", color: "#8BA0B8" }}>{e.description}</p>}
          <div style={{ fontSize: "0.65rem", color: "#3A5070", marginTop: "0.25rem" }}>
            {new Date(e.created_at).toLocaleDateString()}
            {e.category && <span> · {e.category}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
function AdminDashboard({ name }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("pending");
  const [statusCounts, setStatusCounts] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    status: "accepted", reviewerNotes: "",
    addToChangelog: false, changelogTitle: "", changelogDescription: "", changeType: "fix",
  });

  const login = async () => {
    try {
      const res = await fetch("/api/admin/feedback?limit=1", { headers: { "x-admin-password": password } });
      if (res.ok) { setAuthenticated(true); loadFeedback(); loadStats(); }
      else alert("Invalid password");
    } catch { alert("Connection error"); }
  };

  const loadFeedback = async () => {
    try {
      const url = filter === "all" ? "/api/admin/feedback?limit=100" : `/api/admin/feedback?status=${filter}`;
      const res = await fetch(url, { headers: { "x-admin-password": password } });
      const data = await res.json();
      setFeedback(data.feedback || []);
      setStatusCounts(data.statusCounts || {});
    } catch { /* silent */ }
  };

  const loadStats = async () => {
    try {
      const res = await fetch("/api/admin/stats", { headers: { "x-admin-password": password } });
      setStats(await res.json());
    } catch { /* silent */ }
  };

  const submitReview = async (id) => {
    try {
      await fetch(`/api/admin/feedback/${id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({ ...reviewForm, reviewedBy: name || "admin" }),
      });
      setReviewForm({ status: "accepted", reviewerNotes: "", addToChangelog: false, changelogTitle: "", changelogDescription: "", changeType: "fix" });
      setExpandedId(null);
      loadFeedback();
      loadStats();
    } catch { alert("Failed to submit review"); }
  };

  useEffect(() => { if (authenticated) loadFeedback(); }, [filter, authenticated]);

  if (!authenticated) {
    return (
      <div style={{ textAlign: "center", paddingTop: "3rem" }}>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔐</div>
        <p style={{ color: "#6B8CAE", marginBottom: "1rem" }}>
          Admin Access Required
        </p>
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", maxWidth: "300px", margin: "0 auto" }}>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password"
            onKeyDown={e => e.key === "Enter" && login()} placeholder="Enter admin password"
            style={{
              flex: 1, padding: "0.5rem 0.75rem", background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px",
              color: "#FFFFFF", fontSize: "0.85rem", outline: "none", fontFamily: "inherit",
            }} />
          <button onClick={login} style={{
            padding: "0.5rem 1rem", background: "#0D7377", border: "none", borderRadius: "8px",
            color: "#FFFFFF", cursor: "pointer", fontFamily: "inherit",
          }}>Login</button>
        </div>
      </div>
    );
  }

  // ─ Admin view ─
  const filters = ["pending", "accepted", "rejected", "deferred", "all"];

  return (
    <div>
      {/* Filter bar */}
      <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: "0.35rem 0.75rem", background: filter === f ? "#0D7377" : "rgba(255,255,255,0.05)",
            border: filter === f ? "1px solid #0D7377" : "1px solid rgba(255,255,255,0.1)",
            borderRadius: "6px", color: filter === f ? "#FFFFFF" : "#6B8CAE",
            cursor: "pointer", fontFamily: "inherit", fontSize: "0.8rem",
          }}>
            {f} {statusCounts[f] != null ? `(${statusCounts[f]})` : ""}
          </button>
        ))}
      </div>

      {/* Stats summary */}
      {stats && stats.byCategory && (
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "10px", padding: "1rem", marginBottom: "1.25rem", fontSize: "0.8rem",
        }}>
          <div style={{ color: "#6B8CAE", marginBottom: "0.5rem", fontWeight: "bold" }}>Feedback by Category</div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {stats.byCategory.map(s => (
              <span key={s.category} style={{ color: "#A8D8EA" }}>
                {s.category || "general"}: {s.total} ({s.pending} pending)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Feedback list */}
      {feedback.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#4A6080" }}>
          No {filter} feedback items
        </div>
      ) : feedback.map(f => (
        <div key={f.id} style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "10px", padding: "1rem", marginBottom: "0.75rem",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
            <div>
              <span style={{
                fontSize: "0.65rem", padding: "0.1rem 0.4rem", borderRadius: "3px",
                background: f.status === "pending" ? "rgba(232,168,56,0.2)" : f.status === "accepted" ? "rgba(26,122,74,0.2)" : "rgba(192,57,43,0.2)",
                color: f.status === "pending" ? "#E8A838" : f.status === "accepted" ? "#1A7A4A" : "#C0392B",
              }}>{f.feedback_type || "report"}</span>
              <span style={{ fontSize: "0.75rem", color: "#6B8CAE", marginLeft: "0.5rem" }}>
                {f.username} · {f.category || "general"} · {f.mode || "—"}
              </span>
            </div>
            <span style={{ fontSize: "0.65rem", color: "#3A5070" }}>{new Date(f.created_at).toLocaleString()}</span>
          </div>

          <p style={{ margin: "0 0 0.5rem", fontSize: "0.85rem", lineHeight: 1.5 }}>{f.issue}</p>

          {f.correction && (
            <p style={{ margin: "0 0 0.5rem", fontSize: "0.8rem", color: "#8BA0B8", fontStyle: "italic" }}>
              Suggested: {f.correction}
            </p>
          )}

          {f.ai_response && (
            <button onClick={() => setExpandedId(expandedId === f.id ? null : f.id)}
              style={{ background: "none", border: "none", color: "#4A6080", fontSize: "0.75rem",
                cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: "0.5rem" }}>
              {expandedId === f.id ? "▾ Hide AI context" : "▸ Show AI context"}
            </button>
          )}
          {expandedId === f.id && f.ai_response && (
            <div style={{
              background: "rgba(0,0,0,0.2)", borderRadius: "6px", padding: "0.75rem",
              fontSize: "0.75rem", color: "#6B8CAE", marginBottom: "0.75rem", maxHeight: "200px", overflow: "auto",
            }}>{f.ai_response}</div>
          )}

          {/* Review controls */}
          {f.status === "pending" && (
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.75rem", marginTop: "0.5rem" }}>
              <div style={{ display: "flex", gap: "0.3rem", marginBottom: "0.5rem" }}>
                {["accepted", "rejected", "deferred"].map(s => (
                  <button key={s} onClick={() => setReviewForm(prev => ({ ...prev, status: s }))}
                    style={{
                      padding: "0.3rem 0.6rem", fontSize: "0.75rem", borderRadius: "5px",
                      border: reviewForm.status === s ? "1px solid #0D7377" : "1px solid rgba(255,255,255,0.1)",
                      background: reviewForm.status === s ? "rgba(13,115,119,0.2)" : "transparent",
                      color: reviewForm.status === s ? "#A8D8EA" : "#6B8CAE",
                      cursor: "pointer", fontFamily: "inherit",
                    }}>{s === "accepted" ? "✅ Accept" : s === "rejected" ? "❌ Reject" : "⏳ Defer"}</button>
                ))}
              </div>
              <textarea value={reviewForm.reviewerNotes}
                onChange={e => setReviewForm(prev => ({ ...prev, reviewerNotes: e.target.value }))}
                placeholder="Reviewer notes (visible to candidate)..."
                style={{
                  width: "100%", minHeight: "40px", padding: "0.4rem", background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#FFFFFF",
                  fontSize: "0.8rem", fontFamily: "inherit", resize: "vertical", outline: "none",
                  boxSizing: "border-box", marginBottom: "0.5rem",
                }} />
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#6B8CAE", marginBottom: "0.5rem" }}>
                <input type="checkbox" checked={reviewForm.addToChangelog}
                  onChange={e => setReviewForm(prev => ({ ...prev, addToChangelog: e.target.checked }))} />
                Add to public changelog
              </label>
              {reviewForm.addToChangelog && (
                <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.5rem" }}>
                  <input value={reviewForm.changelogTitle}
                    onChange={e => setReviewForm(prev => ({ ...prev, changelogTitle: e.target.value }))}
                    placeholder="Changelog title" style={{
                      flex: 1, padding: "0.35rem 0.5rem", background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)", borderRadius: "5px",
                      color: "#FFFFFF", fontSize: "0.75rem", fontFamily: "inherit", outline: "none",
                    }} />
                  <select value={reviewForm.changeType}
                    onChange={e => setReviewForm(prev => ({ ...prev, changeType: e.target.value }))}
                    style={{
                      padding: "0.35rem", background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)", borderRadius: "5px",
                      color: "#FFFFFF", fontSize: "0.75rem", fontFamily: "inherit",
                    }}>
                    <option value="fix">Fix</option>
                    <option value="improvement">Improvement</option>
                    <option value="new">New</option>
                  </select>
                </div>
              )}
              <button onClick={() => submitReview(f.id)} style={{
                padding: "0.4rem 1rem", background: "#0D7377", border: "none", borderRadius: "6px",
                color: "#FFFFFF", cursor: "pointer", fontFamily: "inherit", fontSize: "0.8rem",
              }}>Submit Review</button>
            </div>
          )}

          {/* Show reviewer notes if already reviewed */}
          {f.status !== "pending" && f.reviewer_notes && (
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "0.5rem", marginTop: "0.5rem",
              fontSize: "0.8rem", color: "#8BA0B8" }}>
              <strong>Review:</strong> {f.reviewer_notes}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home"); // home | dashboard | mode | settings
  const [candidateName, setCandidateName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeMode, setActiveMode] = useState(null);
  const [progress, setProgress] = useState(loadProgress);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [appSettings, setAppSettings] = useState({ apiKey: "", usage: null, freeLimitReached: false });
  const [contentReady, setContentReady] = useState(false);

  // Load content overrides from server on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/content/overrides");
        const data = await res.json();
        if (data.overrides && Object.keys(data.overrides).length > 0) {
          for (const [id, override] of Object.entries(data.overrides)) {
            const mcIdx = QUESTION_BANK.mc_questions.findIndex(q => q.id === id);
            if (mcIdx >= 0) { QUESTION_BANK.mc_questions[mcIdx] = override; }
            const fcIdx = QUESTION_BANK.flashcards.findIndex(f => f.id === id);
            if (fcIdx >= 0) { QUESTION_BANK.flashcards[fcIdx] = override; }
          }
        }
        if (data.framework) { FRAMEWORK_CONTENT = data.framework; }
      } catch (e) { console.warn("Failed to load content overrides:", e); }
      setContentReady(true);
    })();
  }, []);

  // Load progress from server when candidate logs in
  useEffect(() => {
    if (!candidateName) return;
    let cancelled = false;
    (async () => {
      const serverProgress = await fetchProgress(candidateName);
      if (!cancelled && serverProgress && Object.keys(serverProgress).length > 0) {
        setProgress(serverProgress);
      }
      if (!cancelled) setProgressLoaded(true);
    })();
    return () => { cancelled = true; };
  }, [candidateName]);

  const updateProgress = useCallback((cat, result, meta = {}) => {
    setProgress(prev => {
      const next = { ...prev };
      if (!next[cat]) next[cat] = { correct: 0, incorrect: 0, seen: [], learnTopics: [], flashcardsSeen: 0 };
      if (result === "correct") next[cat].correct++;
      else if (result === "incorrect") next[cat].incorrect++;
      if (meta.questionId && !next[cat].seen.includes(meta.questionId)) {
        next[cat].seen.push(meta.questionId);
      }
      if (meta.learnTopic && !next[cat].learnTopics.includes(meta.learnTopic)) {
        next[cat].learnTopics.push(meta.learnTopic);
      }
      if (meta.flashcard) {
        next[cat].flashcardsSeen = (next[cat].flashcardsSeen || 0) + 1;
      }
      saveProgress(next, candidateName);
      return next;
    });
  }, [candidateName]);

  const startMode = (cat, mode) => {
    setActiveCategory(cat);
    setActiveMode(mode);
    setScreen("mode");
  };

  if (screen === "home") {
    return <HomeScreen onStart={(name) => { setCandidateName(name); setScreen("dashboard"); }}
      nameInput={nameInput} setNameInput={setNameInput} />;
  }
  if (screen === "dashboard") {
    return <Dashboard name={candidateName} progress={progress}
      onSelectMode={startMode} onHome={() => setScreen("home")} 
      onSettings={() => setScreen("settings")} appSettings={appSettings} />;
  }
  if (screen === "settings") {
    return <SettingsScreen name={candidateName} appSettings={appSettings} 
      setAppSettings={setAppSettings} onBack={() => setScreen("dashboard")} />;
  }
  if (screen === "mode") {
    return <ModeScreen category={activeCategory} mode={activeMode}
      name={candidateName} progress={progress} updateProgress={updateProgress}
      onBack={() => setScreen("dashboard")} appSettings={appSettings} 
      setAppSettings={setAppSettings} />;
  }
  return null;
}

// ─── SETTINGS SCREEN ─────────────────────────────────────────────────────────
function SettingsScreen({ name, appSettings, setAppSettings, onBack }) {
  const [keyInput, setKeyInput] = useState(appSettings.apiKey || "");
  const [saved, setSaved] = useState(false);
  const usage = appSettings.usage;

  const saveKey = () => {
    setAppSettings(prev => ({ ...prev, apiKey: keyInput.trim(), freeLimitReached: false }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const clearKey = () => {
    setKeyInput("");
    setAppSettings(prev => ({ ...prev, apiKey: "" }));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", fontFamily: "'Georgia', serif", color: "#FFFFFF" }}>
      <div style={{
        background: "rgba(26,42,74,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#6B8CAE", textTransform: "uppercase" }}>Settings</div>
          <div style={{ fontSize: "1.1rem", color: "#FFFFFF" }}>{name}</div>
        </div>
        <button onClick={onBack} style={{
          background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "#6B8CAE",
          padding: "0.25rem 0.75rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem", fontFamily: "inherit",
        }}>← Back</button>
      </div>

      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
        {/* Usage info */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem",
        }}>
          <h3 style={{ fontSize: "0.8rem", letterSpacing: "3px", textTransform: "uppercase", color: "#A8D8EA", margin: "0 0 1rem" }}>
            AI Usage
          </h3>
          {appSettings.apiKey ? (
            <div style={{ color: "#4ADE80", fontSize: "0.9rem" }}>
              ✓ Using your own API key — unlimited AI responses
            </div>
          ) : usage ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#8BA0B8" }}>Free responses used</span>
                <span style={{ color: usage.remaining <= 5 ? "#F59E0B" : "#A8D8EA" }}>
                  {usage.used} / {usage.limit}
                </span>
              </div>
              <div style={{
                background: "rgba(255,255,255,0.1)", borderRadius: "4px", height: "6px", overflow: "hidden",
              }}>
                <div style={{
                  width: `${(usage.used / usage.limit) * 100}%`, height: "100%",
                  background: usage.remaining <= 5 ? "#F59E0B" : "#0D7377",
                  borderRadius: "4px", transition: "width 0.3s",
                }} />
              </div>
              {usage.remaining <= 5 && (
                <div style={{ color: "#F59E0B", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                  {usage.remaining} free responses remaining. Add your API key below for unlimited access.
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: "#8BA0B8", fontSize: "0.9rem" }}>
              AI modes include {25} free responses. Quiz and Flashcard modes are always free.
            </div>
          )}
        </div>

        {/* API Key */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem",
        }}>
          <h3 style={{ fontSize: "0.8rem", letterSpacing: "3px", textTransform: "uppercase", color: "#A8D8EA", margin: "0 0 0.5rem" }}>
            Anthropic API Key
          </h3>
          <p style={{ color: "#6B8CAE", fontSize: "0.8rem", margin: "0 0 1rem", lineHeight: 1.5 }}>
            For unlimited AI-powered learning, enter your own Anthropic API key. 
            Your key is stored only in this browser session and sent directly to Anthropic — never saved on our server.
            Get a key at <span style={{ color: "#A8D8EA" }}>console.anthropic.com</span>
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              value={keyInput}
              onChange={e => setKeyInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && keyInput.trim() && saveKey()}
              placeholder="sk-ant-..."
              type="password"
              style={{
                flex: 1, padding: "0.75rem", background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px",
                color: "#FFFFFF", fontSize: "0.9rem", outline: "none", fontFamily: "monospace",
              }}
            />
            <button onClick={saveKey} style={{
              padding: "0.75rem 1.25rem", background: "#0D7377", border: "none", borderRadius: "8px",
              color: "#FFFFFF", cursor: "pointer", fontSize: "0.85rem", fontFamily: "inherit",
            }}>{saved ? "✓ Saved" : "Save"}</button>
          </div>
          {appSettings.apiKey && (
            <button onClick={clearKey} style={{
              background: "none", border: "none", color: "#F59E0B", cursor: "pointer",
              fontSize: "0.8rem", marginTop: "0.5rem", padding: 0, fontFamily: "inherit",
            }}>Remove saved key</button>
          )}
        </div>

        {/* Info about modes */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px", padding: "1.5rem",
        }}>
          <h3 style={{ fontSize: "0.8rem", letterSpacing: "3px", textTransform: "uppercase", color: "#A8D8EA", margin: "0 0 1rem" }}>
            Mode Guide
          </h3>
          <div style={{ color: "#8BA0B8", fontSize: "0.85rem", lineHeight: 1.6 }}>
            <div style={{ marginBottom: "0.75rem" }}>
              <span style={{ color: "#A8D8EA" }}>Quiz & Flashcard modes</span> — Always free. Use the built-in question bank (120 MC questions, 395 flashcards). No API needed.
            </div>
            <div style={{ marginBottom: "0.75rem" }}>
              <span style={{ color: "#A8D8EA" }}>Learn mode</span> — AI-guided teaching through the framework phases. Uses API.
            </div>
            <div>
              <span style={{ color: "#A8D8EA" }}>Reference mode</span> — AI-powered rule lookup with citations. Uses API.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ onStart, nameInput, setNameInput }) {
  const [animIn, setAnimIn] = useState(false);
  useEffect(() => { setTimeout(() => setAnimIn(true), 50); }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "#0A1628",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "2rem",
      fontFamily: "'Georgia', serif",
    }}>
      {/* Ice crystal background */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: `${20 + i * 15}px`, height: `${20 + i * 15}px`,
            border: "1px solid rgba(202,220,252,0.08)",
            borderRadius: "2px",
            left: `${(i * 137) % 100}%`, top: `${(i * 89) % 100}%`,
            transform: `rotate(${i * 30}deg)`,
          }} />
        ))}
      </div>

      <div style={{
        maxWidth: "480px", width: "100%", textAlign: "center",
        opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.6s ease",
      }}>
        {/* Logo mark */}
        <div style={{
          width: "72px", height: "72px", margin: "0 auto 1.5rem",
          background: "linear-gradient(135deg, #0D7377, #1A2A4A)",
          borderRadius: "16px", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "32px",
          boxShadow: "0 0 40px rgba(13,115,119,0.4)",
        }}>◉</div>

        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#A8D8EA",
          textTransform: "uppercase", marginBottom: "0.5rem" }}>
          U.S. Figure Skating
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: "normal", color: "#FFFFFF",
          margin: "0 0 0.5rem", letterSpacing: "-0.5px", lineHeight: 1.3 }}>
          2026 National Technical Panel Seminar
        </h1>
        <h2 style={{ fontSize: "0.95rem", fontWeight: "normal", color: "#6B8CAE",
          margin: "0 0 2.5rem", letterSpacing: "0.5px" }}>
          Singles Study Assistant (2025–2026 Season)
        </h2>

        <p style={{ color: "#8BA0B8", fontSize: "0.9rem", marginBottom: "2rem", lineHeight: 1.6 }}>
          Prepare for your technical specialist exam with guided learning, 
          quizzes, and instant reference — covering spins, jumps, steps, and more.
        </p>

        <div style={{
          background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem",
        }}>
          <label style={{ display: "block", fontSize: "0.8rem", letterSpacing: "2px",
            color: "#A8D8EA", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Enter your name to begin
          </label>
          <input
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && nameInput.trim() && onStart(nameInput.trim())}
            placeholder="Your name"
            style={{
              width: "100%", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px",
              color: "#FFFFFF", fontSize: "1rem", outline: "none", boxSizing: "border-box",
              fontFamily: "inherit",
            }}
          />
        </div>

        <button
          onClick={() => nameInput.trim() && onStart(nameInput.trim())}
          disabled={!nameInput.trim()}
          style={{
            width: "100%", padding: "0.875rem", background: nameInput.trim() ? "#0D7377" : "#1A2A4A",
            border: "none", borderRadius: "8px", color: nameInput.trim() ? "#FFFFFF" : "#4A6080",
            fontSize: "0.95rem", letterSpacing: "1px", textTransform: "uppercase",
            cursor: nameInput.trim() ? "pointer" : "not-allowed",
            transition: "all 0.2s", fontFamily: "inherit",
          }}
        >
          Start Studying
        </button>

        <p style={{ color: "#3A5070", fontSize: "0.75rem", marginTop: "1.5rem" }}>
          Progress is saved in your browser for this session
        </p>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ name, progress, onSelectMode, onHome, onSettings, appSettings }) {
  const totalCorrect = Object.values(progress).reduce((s, p) => s + (p.correct || 0), 0);
  const totalAttempted = Object.values(progress).reduce((s, p) => s + (p.correct || 0) + (p.incorrect || 0), 0);
  const [dashTab, setDashTab] = useState("study");

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", fontFamily: "'Georgia', serif", color: "#FFFFFF" }}>
      {/* Header */}
      <div style={{
        background: "rgba(26,42,74,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div>
          <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#6B8CAE", textTransform: "uppercase" }}>
            TP Singles Study Assistant
          </div>
          <div style={{ fontSize: "1.1rem", color: "#FFFFFF" }}>Welcome, {name}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          {totalAttempted > 0 && (
            <div style={{ fontSize: "0.85rem", color: "#A8D8EA" }}>
              {totalCorrect}/{totalAttempted} correct overall
            </div>
          )}
          <button onClick={onHome} style={{
            background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "#6B8CAE",
            padding: "0.25rem 0.75rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem",
            fontFamily: "inherit", marginTop: "0.25rem",
          }}>← Change Name</button>
          <button onClick={onSettings} style={{
            background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "#6B8CAE",
            padding: "0.25rem 0.75rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem",
            fontFamily: "inherit", marginTop: "0.25rem", marginLeft: "0.5rem",
          }}>⚙ Settings</button>
          <NotificationBell username={name} />
        </div>
      </div>

      {/* Dashboard tabs */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", maxWidth: "1000px", margin: "0 auto", padding: "0 2rem" }}>
        {[
          { id: "study", label: "📖 Study" },
          { id: "progress", label: "📊 My Progress" },
          { id: "tph", label: "📑 TPH Index" },
          { id: "handbook", label: "📄 TPH Handbook" },
          { id: "guide", label: "📋 Guide" },
          { id: "changelog", label: "📝 Changelog" },
          { id: "admin", label: "🔧 Admin" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setDashTab(tab.id)} style={{
            padding: "0.7rem 1.25rem", background: "none", border: "none",
            borderBottom: dashTab === tab.id ? "2px solid #0D7377" : "2px solid transparent",
            color: dashTab === tab.id ? "#A8D8EA" : "#6B8CAE",
            fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit",
            transition: "all 0.15s",
          }}>{tab.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}>
        {dashTab === "study" && (
          <div>
            {/* Category cards */}
            <h2 style={{ fontSize: "0.8rem", letterSpacing: "3px", textTransform: "uppercase",
              color: "#6B8CAE", marginBottom: "1.25rem" }}>Choose a Category</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {CATEGORIES.map(cat => {
            const p = progress[cat.id] || {};
            const attempted = (p.correct || 0) + (p.incorrect || 0);
            const pct = attempted > 0 ? Math.round((p.correct || 0) / attempted * 100) : null;

            return (
              <div key={cat.id} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px", padding: "1.25rem", borderLeft: `3px solid ${cat.color}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "1.4rem" }}>{cat.icon}</span>
                  <div>
                    <div style={{ fontWeight: "bold", letterSpacing: "1px" }}>{cat.label}</div>
                    <div style={{ fontSize: "0.75rem", color: "#6B8CAE" }}>{cat.desc}</div>
                  </div>
                </div>

                {/* Progress bar */}
                {attempted > 0 && (
                  <div style={{ marginBottom: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between",
                      fontSize: "0.7rem", color: "#6B8CAE", marginBottom: "0.25rem" }}>
                      <span>{attempted} questions attempted</span>
                      <span style={{ color: pct >= 80 ? "#1A7A4A" : pct >= 60 ? "#E8A838" : "#C0392B" }}>
                        {pct}%
                      </span>
                    </div>
                    <div style={{ height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }}>
                      <div style={{
                        height: "100%", borderRadius: "2px",
                        width: `${pct}%`,
                        background: pct >= 80 ? "#1A7A4A" : pct >= 60 ? "#E8A838" : "#C0392B",
                        transition: "width 0.5s ease",
                      }} />
                    </div>
                  </div>
                )}

                {/* Mode buttons */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                  {MODES.map(mode => (
                    <button key={mode.id} onClick={() => onSelectMode(cat.id, mode.id)} style={{
                      padding: "0.4rem 0.5rem", background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px",
                      color: "#A8D8EA", fontSize: "0.75rem", cursor: "pointer",
                      fontFamily: "inherit", textAlign: "center", transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { e.target.style.background = cat.color + "33"; e.target.style.borderColor = cat.color; }}
                    onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
                    >
                      {mode.icon} {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Weak areas callout */}
        {totalAttempted >= 10 && (
          <WeakAreasPanel progress={progress} onSelectMode={onSelectMode} />
        )}
          </div>
        )}
        {dashTab === "progress" && <ProgressAnalytics progress={progress} />}
        {dashTab === "tph" && <TPHIndex />}
        {dashTab === "handbook" && <TPHViewer />}
        {dashTab === "guide" && <GuidePanel />}
        {dashTab === "changelog" && <ChangelogPanel />}
        {dashTab === "admin" && <AdminDashboard name={name} />}
      </div>
    </div>
  );
}

function WeakAreasPanel({ progress, onSelectMode }) {
  const weak = CATEGORIES
    .map(cat => {
      const p = progress[cat.id] || {};
      const attempted = (p.correct || 0) + (p.incorrect || 0);
      if (attempted < 3) return null;
      const pct = Math.round((p.correct || 0) / attempted * 100);
      return { ...cat, pct, attempted };
    })
    .filter(Boolean)
    .filter(c => c.pct < 75)
    .sort((a, b) => a.pct - b.pct);

  if (!weak.length) return null;

  return (
    <div style={{
      marginTop: "2rem", background: "rgba(192,57,43,0.1)",
      border: "1px solid rgba(192,57,43,0.3)", borderRadius: "12px", padding: "1.25rem",
    }}>
      <div style={{ fontSize: "0.8rem", letterSpacing: "2px", color: "#C0392B",
        textTransform: "uppercase", marginBottom: "0.75rem" }}>📊 Focus Areas</div>
      <p style={{ color: "#8BA0B8", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
        Based on your quiz results, these areas need more practice:
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {weak.map(cat => (
          <button key={cat.id} onClick={() => onSelectMode(cat.id, "learn")} style={{
            padding: "0.4rem 0.75rem", background: "rgba(192,57,43,0.15)",
            border: "1px solid rgba(192,57,43,0.4)", borderRadius: "6px",
            color: "#E8A0A0", fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit",
          }}>
            {cat.icon} {cat.label} — {cat.pct}%
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MODE SCREEN ROUTER ───────────────────────────────────────────────────────
function ModeScreen({ category, mode, name, progress, updateProgress, onBack, appSettings, setAppSettings }) {
  const cat = CATEGORIES.find(c => c.id === category);

  return (
    <div style={{ minHeight: "100vh", background: "#0A1628", fontFamily: "'Georgia', serif", color: "#FFFFFF" }}>
      {/* Mode header */}
      <div style={{
        background: "rgba(26,42,74,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "0.875rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <button onClick={onBack} style={{
          background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "#A8D8EA",
          padding: "0.3rem 0.75rem", borderRadius: "6px", cursor: "pointer",
          fontSize: "0.8rem", fontFamily: "inherit",
        }}>← Dashboard</button>
        <div style={{ height: "20px", width: "1px", background: "rgba(255,255,255,0.1)" }} />
        <span style={{ color: cat.color, fontSize: "1.1rem" }}>{cat.icon}</span>
        <span style={{ fontWeight: "bold", letterSpacing: "0.5px" }}>{cat.label}</span>
        <span style={{ color: "#6B8CAE", fontSize: "0.8rem" }}>
          {MODES.find(m => m.id === mode)?.icon} {MODES.find(m => m.id === mode)?.label}
        </span>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem" }}>
        {mode === "learn"     && <LearnMode     category={category} cat={cat} name={name} updateProgress={updateProgress} appSettings={appSettings} setAppSettings={setAppSettings} />}
        {mode === "quiz"      && <QuizMode      category={category} cat={cat} name={name} updateProgress={updateProgress} appSettings={appSettings} setAppSettings={setAppSettings} />}
        {mode === "flashcard" && <FlashcardMode category={category} cat={cat} updateProgress={updateProgress} />}
        {mode === "reference" && <ReferenceMode category={category} cat={cat} name={name} appSettings={appSettings} setAppSettings={setAppSettings} />}
      </div>
    </div>
  );
}

// ─── LEARN MODE ───────────────────────────────────────────────────────────────
function LearnMode({ category, cat, name, updateProgress, appSettings, setAppSettings }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [feedbackTarget, setFeedbackTarget] = useState(null);
  const [topicCount, setTopicCount] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const systemExtra = `You are in LEARN MODE for: ${cat.label.toUpperCase()}.
The candidate's name is ${name}. 
Your job: Guide them through the ${cat.label} framework step by step, phase by phase, sub-topic by sub-topic.

MANDATORY COVERAGE RULES — CRITICAL, DO NOT SKIP:
- You MUST cover EVERY sub-topic within a phase before moving to the next phase.
- For spins, Phase 3 has five sub-topics you MUST cover in order: 3A (revolution minimums), 3B (change-of-foot requirements including SP vs FS differences), 3C (CoSp position requirements), 3D (flying spin requirements), 3E (V flag and No Value summary).
- When you finish a sub-topic, explicitly name the next one: "Now let's move to Phase 3B — change-of-foot requirements."
- Do NOT jump from any sub-topic directly to the next Phase. If the candidate tries to skip ahead, say "Good enthusiasm! But we still need to cover [remaining sub-topics] first."
- At the END of each complete phase, give a brief summary: "Phase 3 complete! You covered: [list sub-topics]. Ready for Phase 4?"
- Do NOT move to Phase 2 until Phase 1 is solid. Do NOT move to Phase 3 until Phase 2 is solid. And so on.

TEACHING APPROACH:
- Present one concept at a time
- Ask a checking question after each concept
- If they get it right, confirm why and advance to the NEXT sub-topic (not the next phase)
- If they get it wrong, explain the rule, give a concrete example, then re-ask differently
- Use concrete skating scenarios with notation when helpful (e.g. "A skater performs CCoSp with 5 revs on foot 1, 2 revs on foot 2...")
- Reference phase numbers, sub-topic letters, and citation codes
- NEVER give a blank or vague response. NEVER say just "think through the framework." Always give them something concrete to react to.
- Every response must end with either a checking question OR a clear statement of what comes next.
Keep responses under 250 words unless explaining a complex concept.`;

  const aiState = { candidateName: name, apiKey: appSettings?.apiKey, onUsageUpdate: (u) => setAppSettings?.(p => ({ ...p, usage: u })) };

  const startLesson = async () => {
    setStarted(true);
    setLoading(true);
    const intro = await callClaude([{
      role: "user",
      content: `Start a guided lesson on ${cat.label}. My name is ${name}. Begin at the very beginning — Phase 1 basics. Give me the first concept and a simple checking question.`
    }], systemExtra, aiState);
    setMessages([{ role: "assistant", content: intro }]);
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    
    // Auto-detect disputes
    if (isDispute(userMsg)) {
      submitDispute({ username: name, category, mode: "learn", triggerMessage: userMsg,
        conversation: newMessages.slice(-4).map(m => `${m.role}: ${m.content.slice(0, 200)}`).join("\n") });
    }
    
    const reply = await callClaude(newMessages, systemExtra, aiState);
    setMessages([...newMessages, { role: "assistant", content: reply }]);
    setTopicCount(c => c + 1);
    // Track learn progress: every 2 exchanges ≈ 1 topic covered
    if (topicCount % 2 === 0 && updateProgress) {
      updateProgress(category, null, { learnTopic: `${cat.label}_exchange_${topicCount}` });
    }
    setLoading(false);
  };

  if (!started) {
    return (
      <div style={{ textAlign: "center", paddingTop: "3rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{cat.icon}</div>
        <h2 style={{ fontSize: "1.4rem", fontWeight: "normal", color: "#FFFFFF", marginBottom: "0.5rem" }}>
          {cat.label} — Guided Learning
        </h2>
        <p style={{ color: "#6B8CAE", marginBottom: "2rem", maxWidth: "400px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
          Your instructor will walk you through the {cat.label.toLowerCase()} framework phase by phase, 
          checking your understanding at each step.
        </p>
        <button onClick={startLesson} style={{
          padding: "0.75rem 2rem", background: cat.color, border: "none",
          borderRadius: "8px", color: "#FFFFFF", fontSize: "1rem",
          cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.5px",
        }}>Begin Lesson</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 100px)" }}>
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: "1rem" }}>
        {messages.map((msg, i) => (
          <ChatBubble key={i} role={msg.role} content={msg.content} color={cat.color} 
            onReport={msg.role === "assistant" ? (resp) => setFeedbackTarget(resp) : undefined} />
        ))}
        {loading && <ChatBubble role="assistant" content="..." color={cat.color} loading />}
        <div ref={bottomRef} />
      </div>
      <ChatInput value={input} onChange={setInput} onSend={sendMessage} loading={loading} color={cat.color} />
      {feedbackTarget && <FeedbackModal aiResponse={feedbackTarget} onClose={() => setFeedbackTarget(null)}
        onSubmit={({ issue, correction, aiResponse }) => {
          submitFeedback({ username: name, category, mode: "learn", issue, correction, aiResponse: aiResponse?.slice(0, 500) });
        }} />}
    </div>
  );
}

// ─── QUIZ MODE ────────────────────────────────────────────────────────────────
function QuizMode({ category, cat, name, updateProgress, appSettings, setAppSettings }) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [aiExplanation, setAiExplanation] = useState("");
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [sessionDone, setSessionDone] = useState(false);
  const [feedbackTarget, setFeedbackTarget] = useState(null);
  const allQ = QUESTION_BANK.mc_questions.filter(q => q.category === category);
  // Shuffle once
  const [shuffled] = useState(() => [...allQ].sort(() => Math.random() - 0.5));
  const q = shuffled[qIndex];

  const isCorrect = () => {
    if (!q) return false;
    const correct = q.correct.map(c => c.toUpperCase());
    const sel = selected.map(s => s.toUpperCase());
    return correct.length === sel.length && correct.every(c => sel.includes(c));
  };

  const submit = async () => {
    if (selected.length === 0) return;
    setSubmitted(true);
    const correct = isCorrect();
    updateProgress(category, correct ? "correct" : "incorrect", { questionId: q.id });
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));

    if (!correct || !q.feedback) {
      setLoadingExplanation(true);
      const explanation = await callClaude([{
        role: "user",
        content: `Quiz question: ${q.question}
Options: ${Object.entries(q.options).map(([k,v]) => `${k}: ${v}`).join(" | ")}
Correct answer(s): ${q.correct.join(", ")}
Candidate selected: ${selected.join(", ")}
${q.feedback ? `Existing feedback: ${q.feedback}` : ""}
${correct ? "Candidate got this right. Give a brief confirmation (1-2 sentences) explaining WHY this is correct — reinforce the rule." : "Explain why the correct answer is right and why the candidate's choice was wrong. Reference the specific rule. Keep it under 100 words."}`
      }], `You are explaining quiz answers for ${cat.label} to candidate ${name}.`, { candidateName: name, apiKey: appSettings?.apiKey, onUsageUpdate: (u) => setAppSettings?.(p => ({ ...p, usage: u })) });
      setAiExplanation(explanation);
      setLoadingExplanation(false);
    }
  };

  const next = () => {
    if (qIndex + 1 >= shuffled.length) {
      setSessionDone(true);
    } else {
      setQIndex(i => i + 1);
      setSelected([]);
      setSubmitted(false);
      setAiExplanation("");
    }
  };

  if (!allQ.length) {
    return <AIGeneratedQuiz category={category} cat={cat} name={name} updateProgress={updateProgress} appSettings={appSettings} setAppSettings={setAppSettings} />;
  }

  if (sessionDone) {
    const pct = Math.round(score.correct / score.total * 100);
    return (
      <div style={{ textAlign: "center", paddingTop: "3rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          {pct >= 80 ? "🎯" : pct >= 60 ? "📈" : "📚"}
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "normal" }}>Session Complete</h2>
        <div style={{
          fontSize: "3rem", fontWeight: "bold", margin: "1rem 0",
          color: pct >= 80 ? "#1A7A4A" : pct >= 60 ? "#E8A838" : "#C0392B",
        }}>{pct}%</div>
        <p style={{ color: "#6B8CAE", marginBottom: "0.5rem" }}>{score.correct} of {score.total} correct</p>
        <p style={{ color: "#8BA0B8", fontSize: "0.85rem", maxWidth: "360px", margin: "0 auto 2rem" }}>
          {pct >= 80 ? `Strong work, ${name}. You're ready to move on.`
            : pct >= 60 ? `Good start, ${name}. Review the concepts you missed in Learn mode.`
            : `Keep studying, ${name}. Try Learn mode to work through the framework step by step.`}
        </p>
        <button onClick={() => { setQIndex(0); setSelected([]); setSubmitted(false); setAiExplanation(""); setScore({correct:0,total:0}); setSessionDone(false); }}
          style={{ padding: "0.6rem 1.5rem", background: cat.color, border: "none",
            borderRadius: "8px", color: "#FFFFFF", cursor: "pointer", fontFamily: "inherit", fontSize: "0.9rem" }}>
          Try Again
        </button>
      </div>
    );
  }

  if (!q) return null;
  const correct = isCorrect();
  const isMulti = q.type === "multi_select";

  return (
    <div>
      {/* Progress */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <span style={{ fontSize: "0.8rem", color: "#6B8CAE" }}>
          Question {qIndex + 1} of {shuffled.length}
        </span>
        <span style={{ fontSize: "0.8rem", color: "#A8D8EA" }}>
          {score.correct}/{score.total} correct
        </span>
      </div>
      <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", marginBottom: "1.5rem" }}>
        <div style={{ height: "100%", background: cat.color, borderRadius: "2px",
          width: `${((qIndex) / shuffled.length) * 100}%`, transition: "width 0.3s" }} />
      </div>

      {/* Question */}
      <div style={{
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px", padding: "1.25rem", marginBottom: "1rem",
      }}>
        {q.video_url && (
          <div style={{ marginBottom: "0.75rem" }}>
            <a href={q.video_url} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              padding: "0.4rem 0.75rem", background: "rgba(13,115,119,0.2)",
              border: "1px solid rgba(13,115,119,0.4)", borderRadius: "6px",
              color: "#A8D8EA", textDecoration: "none", fontSize: "0.8rem",
            }}>▶ Watch Video</a>
          </div>
        )}
        <p style={{ margin: 0, lineHeight: 1.7, fontSize: "0.95rem" }}>
          {q.question}
        </p>
        {isMulti && (
          <p style={{ margin: "0.5rem 0 0", fontSize: "0.75rem", color: "#E8A838", fontStyle: "italic" }}>
            Select all that apply
          </p>
        )}
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
        {Object.entries(q.options).map(([key, val]) => {
          const isSel = selected.includes(key);
          const isRight = q.correct.includes(key);
          let bg = "rgba(255,255,255,0.04)";
          let border = "rgba(255,255,255,0.1)";
          let color = "#D0D8EE";
          if (submitted) {
            if (isRight) { bg = "rgba(26,122,74,0.25)"; border = "#1A7A4A"; color = "#A0E8B8"; }
            else if (isSel && !isRight) { bg = "rgba(192,57,43,0.25)"; border = "#C0392B"; color = "#F0A0A0"; }
          } else if (isSel) {
            bg = cat.color + "33"; border = cat.color; color = "#FFFFFF";
          }

          return (
            <button key={key} onClick={() => {
              if (submitted) return;
              if (isMulti) {
                setSelected(s => s.includes(key) ? s.filter(x => x !== key) : [...s, key]);
              } else {
                setSelected([key]);
              }
            }} style={{
              padding: "0.75rem 1rem", background: bg, border: `1px solid ${border}`,
              borderRadius: "8px", color, textAlign: "left", cursor: submitted ? "default" : "pointer",
              fontFamily: "inherit", fontSize: "0.9rem", transition: "all 0.15s",
              display: "flex", gap: "0.75rem", alignItems: "flex-start",
            }}>
              <span style={{
                width: "22px", height: "22px", border: `1px solid ${border}`,
                borderRadius: isMulti ? "4px" : "50%", display: "inline-flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
                background: isSel ? (submitted ? (isRight ? "#1A7A4A" : "#C0392B") : cat.color) : "transparent",
                fontSize: "0.7rem", fontWeight: "bold",
              }}>
                {isSel && (submitted ? (isRight ? "✓" : "✗") : key)}
                {!isSel && submitted && isRight ? "✓" : ""}
                {!isSel && !submitted ? key : ""}
              </span>
              <span style={{ lineHeight: 1.5 }}>{val}</span>
            </button>
          );
        })}
      </div>

      {/* Submit / Next */}
      {!submitted ? (
        <button onClick={submit} disabled={selected.length === 0} style={{
          width: "100%", padding: "0.75rem", background: selected.length > 0 ? cat.color : "#1A2A4A",
          border: "none", borderRadius: "8px", color: selected.length > 0 ? "#FFFFFF" : "#4A6080",
          cursor: selected.length > 0 ? "pointer" : "not-allowed", fontFamily: "inherit", fontSize: "0.95rem",
        }}>Submit Answer</button>
      ) : (
        <div>
          {/* Result */}
          <div style={{
            padding: "0.75rem 1rem", background: correct ? "rgba(26,122,74,0.2)" : "rgba(192,57,43,0.15)",
            border: `1px solid ${correct ? "#1A7A4A" : "#C0392B"}`, borderRadius: "8px",
            marginBottom: "0.75rem",
          }}>
            <div style={{ fontWeight: "bold", color: correct ? "#A0E8B8" : "#F0A0A0", marginBottom: "0.25rem" }}>
              {correct ? "✓ Correct" : "✗ Incorrect"}
            </div>
            {q.feedback && <p style={{ margin: 0, color: "#C0D0E0", fontSize: "0.85rem", lineHeight: 1.6 }}>{q.feedback}</p>}
            {loadingExplanation && <p style={{ color: "#6B8CAE", fontSize: "0.85rem", fontStyle: "italic" }}>Getting explanation...</p>}
            {aiExplanation && <p style={{ margin: q.feedback ? "0.5rem 0 0" : 0, color: "#C0D0E0", fontSize: "0.85rem", lineHeight: 1.6 }}>{aiExplanation}</p>}
          </div>
          <button onClick={next} style={{
            width: "100%", padding: "0.75rem", background: cat.color, border: "none",
            borderRadius: "8px", color: "#FFFFFF", cursor: "pointer", fontFamily: "inherit", fontSize: "0.95rem",
          }}>{qIndex + 1 >= shuffled.length ? "See Results" : "Next Question →"}</button>
          <button onClick={() => setFeedbackTarget(
            "Question: " + q.question + "
Correct: " + q.correct.join(", ") + "
Selected: " + selected.join(", ") + (aiExplanation ? "
AI Explanation: " + aiExplanation : "")
          )} style={{
            padding: "0.5rem 0.75rem", background: "none", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px", color: "#6B8CAE", cursor: "pointer", fontFamily: "inherit", fontSize: "0.8rem", marginTop: "0.5rem",
          }}>⚑ Report issue with this question</button>
        </div>
      )}
      {feedbackTarget && <FeedbackModal aiResponse={feedbackTarget} onClose={() => setFeedbackTarget(null)}
        onSubmit={({ issue, correction, aiResponse }) => {
          submitFeedback({ username: name, category, mode: "quiz", issue, correction, aiResponse: aiResponse?.slice(0, 500), type: "report" });
        }} />}
    </div>
  );
}

// AI-generated quiz for categories without a question bank
function AIGeneratedQuiz({ category, cat, name, updateProgress, appSettings, setAppSettings }) {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(true);
  const [qCount, setQCount] = useState(0);

  const generateQuestion = useCallback(async () => {
    setLoading(true);
    setSelected(null);
    setSubmitted(false);
    setExplanation("");
    const text = await callClaude([{
      role: "user",
      content: `Generate a multiple choice quiz question about ${cat.label} for a figure skating technical panel candidate exam. 
Return ONLY valid JSON in this exact format:
{"question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"correct":"A","explanation":"..."}
Make it test actual rule knowledge, not just definitions. Focus on edge cases and common mistakes. Vary the difficulty.`
    }], `You are generating exam questions about ${cat.label} for ${name}.`, { candidateName: name, apiKey: appSettings?.apiKey, onUsageUpdate: (u) => setAppSettings?.(p => ({ ...p, usage: u })) });
    try {
      const clean = text.replace(/```json|```/g, "").trim();
      const q = JSON.parse(clean);
      setQuestion(q);
    } catch {
      setQuestion({ question: "Error generating question. Try again.", options: { A: "Retry" }, correct: "A", explanation: "" });
    }
    setLoading(false);
  }, [category, cat.label, name]);

  useEffect(() => { generateQuestion(); }, []);

  const submit = async () => {
    if (!selected) return;
    setSubmitted(true);
    const correct = selected === question.correct;
    updateProgress(category, correct ? "correct" : "incorrect", { questionId: "ai_" + Date.now() });
    setExplanation(question.explanation || "");
  };

  if (loading) return <LoadingState color={cat.color} text="Generating question..." />;

  return (
    <div>
      <div style={{ marginBottom: "1rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontSize: "0.8rem", color: "#6B8CAE" }}>AI-Generated • Question {qCount + 1}</span>
        <span style={{ fontSize: "0.75rem", color: "#6B8CAE", fontStyle:"italic" }}>No question bank yet for {cat.label} — using AI</span>
      </div>

      <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
        borderRadius:"12px", padding:"1.25rem", marginBottom:"1rem" }}>
        <p style={{ margin:0, lineHeight:1.7 }}>{question?.question}</p>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem", marginBottom:"1rem" }}>
        {question && Object.entries(question.options).map(([key, val]) => {
          const isSel = selected === key;
          const isRight = key === question.correct;
          let bg = "rgba(255,255,255,0.04)", border = "rgba(255,255,255,0.1)", color = "#D0D8EE";
          if (submitted) {
            if (isRight) { bg = "rgba(26,122,74,0.25)"; border = "#1A7A4A"; color = "#A0E8B8"; }
            else if (isSel) { bg = "rgba(192,57,43,0.25)"; border = "#C0392B"; color = "#F0A0A0"; }
          } else if (isSel) { bg = cat.color + "33"; border = cat.color; color = "#FFFFFF"; }

          return (
            <button key={key} onClick={() => !submitted && setSelected(key)} style={{
              padding:"0.75rem 1rem", background:bg, border:`1px solid ${border}`,
              borderRadius:"8px", color, textAlign:"left", cursor:submitted?"default":"pointer",
              fontFamily:"inherit", fontSize:"0.9rem", transition:"all 0.15s",
            }}><span style={{fontWeight:"bold",marginRight:"0.5rem"}}>{key}.</span>{val}</button>
          );
        })}
      </div>

      {!submitted ? (
        <button onClick={submit} disabled={!selected} style={{
          width:"100%", padding:"0.75rem", background:selected ? cat.color : "#1A2A4A",
          border:"none", borderRadius:"8px", color:selected ? "#FFFFFF" : "#4A6080",
          cursor:selected?"pointer":"not-allowed", fontFamily:"inherit", fontSize:"0.95rem",
        }}>Submit</button>
      ) : (
        <div>
          <div style={{ padding:"0.75rem 1rem",
            background:selected===question.correct?"rgba(26,122,74,0.2)":"rgba(192,57,43,0.15)",
            border:`1px solid ${selected===question.correct?"#1A7A4A":"#C0392B"}`,
            borderRadius:"8px", marginBottom:"0.75rem", fontSize:"0.85rem", lineHeight:1.6, color:"#C0D0E0"
          }}>
            <strong style={{color:selected===question.correct?"#A0E8B8":"#F0A0A0"}}>
              {selected===question.correct ? "✓ Correct" : "✗ Incorrect"}&nbsp;
            </strong>
            {explanation}
          </div>
          <button onClick={() => { setQCount(c=>c+1); generateQuestion(); }} style={{
            width:"100%", padding:"0.75rem", background:cat.color, border:"none",
            borderRadius:"8px", color:"#FFFFFF", cursor:"pointer", fontFamily:"inherit", fontSize:"0.95rem",
          }}>Next Question →</button>
        </div>
      )}
    </div>
  );
}

// ─── FLASHCARD MODE ───────────────────────────────────────────────────────────
function FlashcardMode({ category, cat, updateProgress }) {
  const allCards = QUESTION_BANK.flashcards.filter(f => f.category === category);
  const [cards] = useState(() => [...allCards].sort(() => Math.random() - 0.5));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [ratings, setRatings] = useState({}); // id → "know" | "unsure" | "learn"
  const [done, setDone] = useState(false);

  const card = cards[index];

  if (!allCards.length) {
    return (
      <div style={{ textAlign: "center", paddingTop: "3rem", color: "#6B8CAE" }}>
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🃏</div>
        <p>No flashcards available for {cat.label} yet.</p>
        <p style={{ fontSize: "0.85rem" }}>Try Learn or Quiz mode instead.</p>
      </div>
    );
  }

  if (done) {
    const know = Object.values(ratings).filter(r => r === "know").length;
    const unsure = Object.values(ratings).filter(r => r === "unsure").length;
    const learn = Object.values(ratings).filter(r => r === "learn").length;
    return (
      <div style={{ textAlign: "center", paddingTop: "3rem" }}>
        <h2 style={{ fontWeight: "normal" }}>Round Complete</h2>
        <div style={{ display:"flex", justifyContent:"center", gap:"2rem", margin:"2rem 0" }}>
          <div><div style={{fontSize:"2rem",color:"#1A7A4A"}}>{know}</div><div style={{fontSize:"0.75rem",color:"#6B8CAE"}}>Got it</div></div>
          <div><div style={{fontSize:"2rem",color:"#E8A838"}}>{unsure}</div><div style={{fontSize:"0.75rem",color:"#6B8CAE"}}>Unsure</div></div>
          <div><div style={{fontSize:"2rem",color:"#C0392B"}}>{learn}</div><div style={{fontSize:"0.75rem",color:"#6B8CAE"}}>Need work</div></div>
        </div>
        {learn + unsure > 0 && (
          <p style={{ color:"#8BA0B8", fontSize:"0.85rem", marginBottom:"1.5rem" }}>
            {learn + unsure} card{learn+unsure>1?"s":""} to review again
          </p>
        )}
        <button onClick={() => { setIndex(0); setFlipped(false); setRatings({}); setDone(false); }} style={{
          padding:"0.6rem 1.5rem", background:cat.color, border:"none",
          borderRadius:"8px", color:"#FFFFFF", cursor:"pointer", fontFamily:"inherit",
        }}>Go Again</button>
      </div>
    );
  }

  const rate = (r) => {
    setRatings(prev => ({...prev, [card.id]: r}));
    if (updateProgress) updateProgress(category, null, { flashcard: true });
    if (index + 1 >= cards.length) setDone(true);
    else { setIndex(i => i+1); setFlipped(false); }
  };

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto" }}>
      {/* Progress */}
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.8rem",
        color:"#6B8CAE", marginBottom:"0.5rem" }}>
        <span>{index + 1} / {cards.length}</span>
        <span>{Object.values(ratings).filter(r=>r==="know").length} known</span>
      </div>
      <div style={{ height:"3px", background:"rgba(255,255,255,0.08)", borderRadius:"2px", marginBottom:"1.5rem" }}>
        <div style={{ height:"100%", background:cat.color, width:`${(index/cards.length)*100}%`, transition:"width 0.3s", borderRadius:"2px" }} />
      </div>

      {/* Card */}
      <div onClick={() => setFlipped(f => !f)} style={{
        minHeight: "220px", background: flipped ? "rgba(26,42,74,0.8)" : "rgba(255,255,255,0.05)",
        border: `2px solid ${flipped ? cat.color : "rgba(255,255,255,0.12)"}`,
        borderRadius: "16px", padding: "2rem", cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", transition: "all 0.25s", position: "relative",
      }}>
        <div style={{ position:"absolute", top:"0.75rem", right:"1rem",
          fontSize:"0.7rem", color:"#3A5070", letterSpacing:"1px", textTransform:"uppercase" }}>
          {flipped ? "Answer" : "Question — tap to reveal"}
        </div>
        <p style={{ fontSize: flipped ? "0.9rem" : "1rem", lineHeight: 1.7,
          color: flipped ? "#A8D8EA" : "#FFFFFF", margin: 0, whiteSpace:"pre-wrap" }}>
          {flipped ? card.back : card.front}
        </p>
      </div>

      {/* Rating buttons */}
      {flipped && (
        <div style={{ display:"flex", gap:"0.5rem", marginTop:"1rem" }}>
          <button onClick={() => rate("learn")} style={{
            flex:1, padding:"0.6rem", background:"rgba(192,57,43,0.15)",
            border:"1px solid rgba(192,57,43,0.4)", borderRadius:"8px",
            color:"#F0A0A0", cursor:"pointer", fontFamily:"inherit", fontSize:"0.85rem",
          }}>✗ Need to review</button>
          <button onClick={() => rate("unsure")} style={{
            flex:1, padding:"0.6rem", background:"rgba(232,168,56,0.15)",
            border:"1px solid rgba(232,168,56,0.4)", borderRadius:"8px",
            color:"#F0D080", cursor:"pointer", fontFamily:"inherit", fontSize:"0.85rem",
          }}>~ Unsure</button>
          <button onClick={() => rate("know")} style={{
            flex:1, padding:"0.6rem", background:"rgba(26,122,74,0.2)",
            border:"1px solid rgba(26,122,74,0.4)", borderRadius:"8px",
            color:"#A0E8B8", cursor:"pointer", fontFamily:"inherit", fontSize:"0.85rem",
          }}>✓ Got it</button>
        </div>
      )}
      {!flipped && (
        <p style={{ textAlign:"center", color:"#3A5070", fontSize:"0.75rem", marginTop:"0.75rem" }}>
          Tap card to reveal answer
        </p>
      )}
    </div>
  );
}

// ─── REFERENCE MODE ───────────────────────────────────────────────────────────
function ReferenceMode({ category, cat, name, appSettings, setAppSettings }) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedbackTarget, setFeedbackTarget] = useState(null);
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const systemExtra = `You are in REFERENCE MODE for ${cat.label}.
The candidate is looking up a specific rule or concept.
- Find the relevant rule in the framework
- State the rule clearly and concisely
- Give the TPH citation code if available (format: [TPH-S §SECTION.TOPIC])
- Give ONE concrete example that illustrates the rule
- If the rule has common exceptions or traps, note them briefly
- Keep responses focused — no more than 200 words unless the rule is genuinely complex`;

  const search = async () => {
    if (!query.trim() || loading) return;
    const q = query.trim();
    setQuery("");
    const newMessages = [...messages, { role: "user", content: q }];
    setMessages(newMessages);
    setLoading(true);
    
    // Auto-detect disputes
    if (isDispute(q)) {
      submitDispute({ username: name, category, mode: "reference", triggerMessage: q,
        conversation: newMessages.slice(-4).map(m => `${m.role}: ${m.content.slice(0, 200)}`).join("\n") });
    }
    
    const reply = await callClaude(newMessages, systemExtra, { candidateName: "user", apiKey: appSettings?.apiKey, onUsageUpdate: (u) => setAppSettings?.(p => ({ ...p, usage: u })) });
    setMessages([...newMessages, { role: "assistant", content: reply }]);
    setLoading(false);
  };

  const suggestions = {
    jumps:   ["What is the Euler rule?", "How does edge modifier order work?", "When does a jump not fill a box?"],
    spins:   ["What is the gateway concept for DVs?", "When does a spin have no value?", "What makes Feature #9 fail?"],
    steps:   ["What counts as a difficult turn?", "When is a step sequence capped at basic?", "How does distribution work?"],
    choreo:  ["When is a ChSq confirmed?", "Do jumps in ChSq occupy a box?", "When does ChSq end?"],
    general: ["What constitutes a fall?", "How does wrong element work?", "When does an element get no value?"],
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"calc(100vh - 120px)" }}>
      {!messages.length && (
        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <div style={{ textAlign:"center", marginBottom:"2rem" }}>
            <div style={{ fontSize:"2.5rem", marginBottom:"0.5rem" }}>🔍</div>
            <h2 style={{ fontWeight:"normal", fontSize:"1.2rem", marginBottom:"0.5rem" }}>
              {cat.label} Reference
            </h2>
            <p style={{ color:"#6B8CAE", fontSize:"0.85rem" }}>
              Ask about any rule, concept, or citation
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.4rem", marginBottom:"1.5rem" }}>
            <p style={{ fontSize:"0.75rem", color:"#4A6080", letterSpacing:"1px",
              textTransform:"uppercase", marginBottom:"0.25rem" }}>Quick lookups</p>
            {(suggestions[category] || suggestions.general).map(s => (
              <button key={s} onClick={() => { setQuery(s); }} style={{
                padding:"0.6rem 0.875rem", background:"rgba(255,255,255,0.04)",
                border:"1px solid rgba(255,255,255,0.08)", borderRadius:"8px",
                color:"#A8D8EA", textAlign:"left", cursor:"pointer",
                fontFamily:"inherit", fontSize:"0.85rem",
              }}>{s}</button>
            ))}
          </div>
        </div>
      )}

      {messages.length > 0 && (
        <div style={{ flex:1, overflowY:"auto", paddingBottom:"1rem" }}>
          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} content={msg.content} color={cat.color}
              onReport={msg.role === "assistant" ? (resp) => setFeedbackTarget(resp) : undefined} />
          ))}
          {loading && <ChatBubble role="assistant" content="Looking up..." color={cat.color} loading />}
          <div ref={bottomRef} />
        </div>
      )}

      <ChatInput value={query} onChange={setQuery} onSend={search} loading={loading}
        color={cat.color} placeholder={`Ask about any ${cat.label.toLowerCase()} rule...`} />
      {feedbackTarget && <FeedbackModal aiResponse={feedbackTarget} onClose={() => setFeedbackTarget(null)}
        onSubmit={({ issue, correction, aiResponse }) => {
          submitFeedback({ username: name, category, mode: "reference", issue, correction, aiResponse: aiResponse?.slice(0, 500) });
        }} />}
    </div>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function ChatBubble({ role, content, color, loading, onReport }) {
  const isAI = role === "assistant";
  return (
    <div style={{
      display:"flex", justifyContent: isAI ? "flex-start" : "flex-end",
      marginBottom:"0.75rem",
    }}>
      <div style={{ maxWidth:"85%" }}>
        <div style={{
          padding:"0.75rem 1rem",
          background: isAI ? "rgba(255,255,255,0.05)" : (color + "22"),
          border: `1px solid ${isAI ? "rgba(255,255,255,0.1)" : (color + "55")}`,
          borderRadius: isAI ? "4px 12px 12px 12px" : "12px 4px 12px 12px",
          fontSize:"0.9rem", lineHeight:1.7, color: isAI ? "#C0D0E8" : "#FFFFFF",
          whiteSpace:"pre-wrap",
        }}>
          {loading ? <span style={{color:"#4A6080",fontStyle:"italic"}}>···</span> : content}
        </div>
        {isAI && !loading && onReport && (
          <button onClick={() => onReport(content)} style={{
            background:"none", border:"none", color:"#4A6080", fontSize:"0.7rem",
            cursor:"pointer", padding:"0.25rem 0", fontFamily:"inherit",
          }}>⚑ Report issue</button>
        )}
      </div>
    </div>
  );
}

function ChatInput({ value, onChange, onSend, loading, color, placeholder }) {
  return (
    <div style={{
      display:"flex", gap:"0.5rem",
      borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:"1rem",
    }}>
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === "Enter" && !e.shiftKey && onSend()}
        placeholder={placeholder || "Type your response..."}
        disabled={loading}
        style={{
          flex:1, padding:"0.75rem 1rem",
          background:"rgba(255,255,255,0.06)",
          border:"1px solid rgba(255,255,255,0.12)",
          borderRadius:"8px", color:"#FFFFFF",
          fontSize:"0.9rem", outline:"none", fontFamily:"inherit",
        }}
      />
      <button onClick={onSend} disabled={loading || !value.trim()} style={{
        padding:"0.75rem 1.25rem", background: value.trim() && !loading ? color : "#1A2A4A",
        border:"none", borderRadius:"8px", color: value.trim() && !loading ? "#FFFFFF" : "#4A6080",
        cursor: value.trim() && !loading ? "pointer" : "not-allowed",
        fontFamily:"inherit", fontSize:"0.9rem", transition:"all 0.2s",
      }}>Send</button>
    </div>
  );
}

function LoadingState({ color, text }) {
  return (
    <div style={{ textAlign:"center", paddingTop:"3rem", color:"#6B8CAE" }}>
      <div style={{ fontSize:"1.5rem", marginBottom:"0.75rem", color }}>◉</div>
      <p style={{ fontStyle:"italic" }}>{text || "Loading..."}</p>
    </div>
  );
}
