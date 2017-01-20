'use strict'
angular.module('kiddsapp.services', [])
.factory('newsFactory', [function(){
    var news = [
        {  
            id:3,
           title: 'Some interesting news 1',
            author: 'Roman Pashkovsky',
            position: 'Admin',
            date: '01.12.2013',
            photo: 'assets/news/news1.jpg',
            text: 'У повісті «Гуси-лебеді летять» Михайло Стельмах знайомить нас з роками свого дитинства. На початку 20 сторіччя він був маленьким хлопчиком Михайликом. Автор розповідає нам про своє дитинство, рідне село, а також про родину.Одним з головних у творі виступає образ батька - Панаса Дем’яновича, хоч і з’являється він наживо лише наприкінці твору. Проте про нього постійно згадують інші члени родини, він у думках хлопця, хоч той його вже погано пам’ятає. Панаса Дем’яновича у родині люблять, поважають, покладаються. Батько Михайлика – справжній трудівник. Він любить рідну землю і сина вчить поважати працю хлібороба.'
            
        },
        {   
            id:2,
           title: 'Some interesting news 2',
            author: 'Kate Ivasenko',
            position: 'Teacher of English',
            date: '03.12.2013',
            photo: 'assets/news/news1.jpg',
            text: '«Маленький принц» по праву вважається одним із шедеврів світової літератури. Антуан де Сент-Екзюпері, автор цієї дивовижної філософської притчі, одягненої у форму казки, майстерно передав ідеї універсальних людських істин, ще раз нагадавши про людяність, добро та любов. Свій задум автор зумів втілити через образ головного героя – Маленького принца. Не випадковим стало зображення головного героя дитиною, бо саме дитяче сприйняття світу, на думку автора, є найбільш природним та таким, що відображає Всесвіт найбільш правдиво. Дитина, якій невідомі багато речей, тим не менш, зазвичай володіє глибшою мудрістю та прозорливістю, ніж більшість дорослих людей. Цю ідею автор підкреслює часто повторюваними висловлюваннями Маленького принца «Дорослі – дивний народ»'
            
        },
        {
            id:1,
           title: 'Some interesting news 3',
            author: 'Peter Petrenko',
            position: 'Student, 6th grade',
            date: '08.12.2014',
            photo: 'assets/news/news1.jpg',
            text: 'За горами й лісами було колись одне королівство. Тут жили найкращі в світі столяри, кухарі, будівельники, шевці та майстри усіх інших ремесел. У цьому королівстві і його король вмів шити, кувати залізо, ремонтувати годинники - був майстром на всі руки. І лише у малого королевича все валилося з рук. Навіть цвяха забити не міг, неодмінно влучав по пальцю. - Ой болить! Не хочу більше! - лунало в палаці, лиш тільки йому давали якийсь інструмент. А терпіння, аби по справжньому навчитися якійсь справі, королевич не мав. - Хочу одразу все вміти, - казав батькові, надувши ображено щоки.- Так не буває, - намагався пояснити король. - Треба багато мозолів натерти, та гуль набити доки оволодієш ремеслом.'
        },
        {   
            id:0,
           title: 'Some interesting news 4',
            author: 'Ivanna Ivanchenko',
            position: 'Student, 8th grade',
            date: '09.04.2015',
            photo: 'assets/news/news1.jpg',
            text: 'Коли я був маленький, то дуже дивувався, чому не розмовляють наша кішка та наш собака. Я вважав це несправедливістю: чому це вони не мають дару розмовляти, а ми маємо? Вони ж від нас не гірші... Потім я вирішив, що не може бути в природі такого, щоб звірі не говорили. Мабуть, вони розмовляють тільки між собою, потайки, щоб люди не чули, думав я. Я вважав, що звірі та птахи образилися на людей за те, що ми їх винищуємо та їмо, тому й перемовляються так, щоб ми їх не зрозуміли. Шифруються, тобто.'
        }
        
    ]
    
    return {
        news : news,
        getNewsById: function(newsId){
            for (var i = 0; i < news.length; i++){
                if (news[i].id == newsId) return news[i];
            }
        },
        deleteNews: function(id) {
            for (var i = 0; i < news.length; i++){
                if (news[i].id == id) news.splice(i, 1);
            }
        },
        addNews: function(newsToAdd){
            var id = news.length > 0 ? news[0].id+1 : 0;
            newsToAdd.id = id;
            news.unshift(newsToAdd);
        },
        changeNews: function(id, newNews) {
            for (var i = 0; i < news.length; i++){
                if (news[i].id == id) {news.splice(i, 1, newNews); return}
            }
        },
        logNews : function(){
            console.log(news);
        }
    }
}])

.factory('teachersFactory', [function(){
    var teachers = [
        {
      "id": 0,
      "firstName": "Катерина Володимирівна",
      "lastName": "ІВАСЕНКО",
      "position": 'Викладач англійської та німецької мов',
      "photo": "assets/photo_Kate.jpg",
      "description": "Викладач англійської і німецької мов у мовній школі KIDS. З відзнакою закінчила Вінницький державний педагогічний університет ім. Михайла Коцюбинського, інститут іноземних мов за спеціальністю англійська мова, німецька мова і зарубіжна література. Має сертифікат BRITISH COUNCIL за проходження курсу Professional Practices for English Language Teaching (Професійні методики викладання англійської мови) у 2016 році. Також у жовтні 2010 року пройшла сертифікацію на знання німецької мови на рівні B2 у Центрі тестування німецької мови як іноземної.  Прихильниця збалансованого підходу, де всі аспекти мови отримують достатньо уваги: говоріння, читання, слухання і письмо."
    },
    {
      "id": 1,
      "firstName": "Дмитро Юрійович",
      "lastName": "БІЛОУС",
      "position": 'Викладач англійської мови, організатор подій',
      "photo": "assets/photo_Dima.jpg",
      "description": "Викладає англійську мову у KIDS.  Випускник Вінницького державного педагогічного університету ім. Михайла Коцюбинського. Має сертифікат BRITISH COUNCIL за проходження курсу Professional \nPractices for English Language Teaching (Професійні методики викладання \nанглійської мови) у 2016 році. Чудово організовує навчальний процес: на уроці просто неможливо занудьгувати, а мова вчиться \"наче саме\" (як сказав один учень)."
    },
    {
      "id": 2,
      "firstName": "Інна Ігорівна",
      "lastName": "БРОДСЬКА",
      "position": 'Викладач англійської мови',
      "photo": "assets/photo_Inna.jpg",
      "description": "Викладає англійську мову у KIDS. Випускниця Тернопільського національного економічного університету ім. Гнатюка. Має досвід роботи у США і викладання у Хмельницькій національній прикордонній академії. Чудовий комунікатор, вона одразу робить акцент на спілкуванні англійською, що стрімко покращує якість усного мовлення в учнів."
    }
    ]
    return {
        teachers: teachers,
        replaceTeachers: function(newTeachers) {
            var l = teachers.length;
            for (var i = 0; i <= l; i++) {
                teachers.pop();
            }
            for (var i = 0; i < newTeachers.length; i++) {
                teachers.push(newTeachers[i]);
            }
        },
        getTeacherById: function(teacherId){
            for (var i = 0; i < teachers.length; i++) {
                if (teachers[i].id == teacherId) {
                    return teachers[i];
                }
            }
        },
        deleteTeacher: function(teacherId){
            for (var i = 0; i < teachers.length; i++) {
                if (teachers[i].id == teacherId) {
                    teachers.splice(i, 1);
                }
            }
        }
    }
}])
.factory('galleryFactory', [function(){
    var gallery = [
        {
            id: 3,
            name: 'Halloween',
            date: '30.10.2014',
            photos: [
                {
                    id: 0,
                    ref: 'assets/photo1.png'
                },
                {
                    id: 1,
                    ref: 'assets/photo2.png'
                },
                {
                    id: 2,
                    ref: 'assets/photo3.png'
                },
                {
                    id: 3,
                    ref: 'assets/photo1.png'
                }
            ]
        },
        {
            id: 2,
            name: 'New Year',
            date: '01.01.2015',
            photos: [
                {
                    id: 0,
                    ref: 'assets/photo1.png'
                },
                {
                    id: 1,
                    ref: 'assets/photo2.png'
                },
                {
                    id: 2,
                    ref: 'assets/photo3.png'
                },
                {
                    id: 3,
                    ref: 'assets/photo1.png'
                },
                {
                    id: 4,
                    ref: 'assets/photo4.png'
                },
                {
                    id: 5,
                    ref: 'assets/photo5.png'
                },
                {
                    id: 6,
                    ref: 'assets/photo6.png'
                },
                {
                    id: 7,
                    ref: 'assets/photo7.png'
                },
                {
                    id: 8,
                    ref: 'assets/photo1.png'
                },
                {
                    id: 9,
                    ref: 'assets/photo2.png'
                },
                {
                    id: 10,
                    ref: 'assets/photo5.png'
                }
            ]
        },
        {
            id: 1,
            name: 'Speaking Club with John Woo',
            date: '02.03.2015',
            photos: [
                {
                    id: 0,
                    ref: 'assets/photo1.png'
                },
                {
                    id: 1,
                    ref: 'assets/photo2.png'
                },
                {
                    id: 2,
                    ref: 'assets/photo3.png'
                },
                {
                    id: 3,
                    ref: 'assets/photo1.png'
                }
            ]
        },
        {
            id: 0,
            name: 'Movie session',
            date: '04.04.2015',
            photos: [
                {
                    id: 0,
                    ref: 'assets/photo1.png'
                },
                {
                    id: 1,
                    ref: 'assets/photo2.png'
                },
                {
                    id: 2,
                    ref: 'assets/photo3.png'
                },
                {
                    id: 3,
                    ref: 'assets/photo1.png'
                }
            ]
        }
    ]  
    return {
        getGallery: function(){
            return gallery;
        },
        addEvent: function(event) {
            var id = gallery[gallery.length - 1].id+1;
            event.id = id;
            gallery.unshift(event);
        },
        removeEvent: function(eventId){
            for(var i = 0; i < gallery.length; i++){
                if (gallery[i].id == eventId) {
                    gallery.splice(i, 1);
                    return true;
                }
            }
            return false;
        },
        addPhotoToEvent: function(eventId, photo){
            for(var i = 0; i < gallery.length; i++){
                if (gallery[i].id == eventId) {
                    var event = gallery[i];
                    var id = event.photos[event.photos.length-1].id+1;
                    photo.id = id;
                    event.photos.push(photo);
                    return true;
                }
            }
            return false;
        },
        removePhotoFromEvent: function(eventId, photoId) {
            for(var i = 0; i < gallery.length; i++){
                if (gallery[i].id == eventId) {
                    var event = gallery[i];
                    for (var g = 0; g < event.photos.length; g++) {
                        if (event.photos[g] == photoId) {
                            event.photos.splice(g, 1);
                            return true;
                        }
                    }
                }
            }
            return false;
        },
        getEventById: function(eventId){
            for(var i = 0; i < gallery.length; i++){
                if (gallery[i].id == eventId) {
                    return gallery[i];
                }
            }
            return {};
        },
        getPhotoInfo: function(eventId, photoId){
            for(var i = 0; i < gallery.length; i++){
                if (gallery[i].id == eventId) {
                    var event = gallery[i];
                    for (var j = 0; j < event.photos.length; j++) {
                        if (event.photos[j].id == photoId)
                            return {
                            currentPhoto: event.photos[j],
                            currentEvent: event,
                            photoIndex: j,
                            eventIndex: i  
                        }
                        
                    }
                }
            }
            return false;
        }
    }
}])
.factory('userFactory', ['$window', '$localStorage', function($window, $localStorage){
    var currentUser = {};
    var adminCode = 'KIDS';
    var isLogged = false;
    var users = [
        {
            id: 0,
            username: 'Roman',
            email: 'petrodzher@gmail.com',
            password: 'roma',
            admin: true
        },
        {
            id: 1,
            username: 'Kate',
            email: 'kate_ivasenko5@i.ua',
            password: 'kate',
            admin: true
        },
        {
            id: 2,
            username: 'John',
            email: '',
            password: 'john',
            admin: false
        }
        
    ];
    
    
    
    
    
    
    return {
        addUser: function(newUser) {
            var id = users.length > 0 ? users[users.length-1].id+1 : 0;
            newUser.id = id;
            users.push(newUser);  
        },
        userNameExists: function(username){
            for(var i = 0; i<users.length; i++) {
                if (username == users[i].username) return true;
            }
            return false;
        },
        emailExists: function(email){
            for(var i = 0; i<users.length; i++) {
                if (email == users[i].email) return true;
            }
            return false;
        },
        checkAdminCode: function(code){
            if (code == adminCode) return true
            else return false;
        },
        getUserById: function(userId) {
            for(var i = 0; i<users.length; i++) {
                if (userId == users[i].id) return users[i];
            }
            return false;
        },
        loginUser: function(user){
            var input = user.input;
            var password = user.password;
            if(input.indexOf('@') > 0) {
                for(var i = 0; i < users.length; i++){
                    if (input == users[i].email) {
                        if (password == users[i].password) {
                            isLogged = true;
                            currentUser.username = users[i].username;
                            currentUser.email = users[i].email;
                            currentUser.admin = users[i].admin;
                            $localStorage.storeObject('currentUser', currentUser);
                            return {status: 'Успішно', loggedIn: true}
                        } else {
                            return {status: 'Неправильний пароль!', loggedIn: false}
                        }
                    }
                }
                return {status: 'Користувач із такою поштою не існує', loggedIn: false}
            } else {
                for(var i = 0; i < users.length; i++){
                    if (input == users[i].username) {
                        if (password == users[i].password) {
                            isLogged = true;
                            currentUser.username = users[i].username;
                            currentUser.email = users[i].email;
                            currentUser.admin = users[i].admin;
                            $localStorage.storeObject('currentUser', currentUser);
                            return {status: 'Успішно', loggedIn: true}
                        } else {
                            return {status: 'Неправильний пароль!', loggedIn: false}
                        }
                    }
                }
                return {status: 'Користувач із таким іменем не існує', loggedIn: false}
            }
        },
        updateCurrentUser: function(){
            var storedUser = $localStorage.getObject('currentUser', '{}');
            if (storedUser.username != '') {
                isLogged = true;
                currentUser.username = storedUser.username;
                currentUser.email = storedUser.email;
                currentUser.admin = storedUser.admin; 
            }
            
        },
        currentUser: currentUser,
        logoutUser: function(){
            isLogged = false;
            currentUser.username = '',
                currentUser.email = '',
                currentUser.admin = false;
            $localStorage.replaceObject('currentUser', currentUser);
        },
        printCurrentUser: function(){
            console.log('Current user:');
            console.log(currentUser);
        },
        isLogged: isLogged,
        printAllUsers: function() {
            for(var i = 0; i < users.length; i++){
                console.log(users[i]);
            }
        }
    }
    
}])

.factory('$localStorage', ['$window', function($window){
            return {
                store: function(key, value){
                    $window.localStorage[key] = value;
                },
                
                get: function(key, defaultValue){
                    return $window.localStorage[key] || defaultValue;
                },
                
                storeObject: function(key, value) {
                    $window.localStorage[key] = JSON.stringify(value);
                },
                
                getObject: function(key, defaultValue){
                    return JSON.parse($window.localStorage[key] || defaultValue);
                },
                
                replaceObject: function (key, newObject){
                    $window.localStorage.setItem(key, JSON.stringify(newObject));
                }
                
            }
        }])
.factory('passTestFactory', [function(){
    var englishPlacementTest = {
            name: 'Визначення рівня англійської мови - комплексний текст',
            alias: 'placement_English',
            levels: [
                        {
                        grammar: [
                    [
                        {
                        id: 0,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: '_______ books look familiar to me.',
                        q: [
                            {id: 0, statement: 'That', add: false},
                            {id: 1, statement: 'So', add: false},
                            {id: 2, statement: 'Those', add: false},
                            {id: 3, statement: 'Although', add: false},
                            {id: 4, statement: 'These', add: false}
                        ],
                        c: [2, 4],
                        ref: [
                            'https://learnenglish.britishcouncil.org/en/english-grammar/pronouns/that-these-and-those'
                        ]
                    },
                    {
                        id: 1,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'Could you pass me _______ cups. I can\'t reach them.',
                        q: [
                            {id: 0, statement: 'those', add: false},
                            {id: 1, statement: 'over', add: false},
                            {id: 2, statement: 'much', add: false},
                            {id: 3, statement: 'these', add: false},
                            {id: 4, statement: 'please', add: false}
                           ],
                        c: [0, 3],
                        ref: [
                            'https://learnenglish.britishcouncil.org/en/english-grammar/pronouns/that-these-and-those'
                        ]
                    },
                    {
                        id: 2,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: '_______ buildings over there belong to Lord McCartney.',
                        q: [
                            {id: 0, statement: 'The', add: false},
                            {id: 1, statement: 'Tall', add: false},
                            {id: 2, statement: 'Those', add: false},
                            {id: 3, statement: 'Any', add: false},
                            {id: 4, statement: 'These', add: false}
                        ],
                        c: [0, 2 ],
                        ref: [
                            'https://learnenglish.britishcouncil.org/en/english-grammar/pronouns/that-these-and-those',
                            'https://learnenglish.britishcouncil.org/en/english-grammar/determiners-and-quantifiers/definite-article'
                        ]
                    }
                ],
                [
                    {
                        id: 3,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'We went shopping and _______ we went to the cinema and saw a film.',
                        q: [
                           {id: 0, statement: 'after', add: false},
                            {id: 1, statement: 'then', add: false},
                            {id: 2, statement: 'soon', add: false},
                            {id: 3, statement: 'lately', add: false},
                            {id: 4, statement: 'late', add: false}
                        ],
                        c: [1],
                        ref: ['https://www.businessenglish.com/grammar/sequence-adverbs.html?lang=eng']
                    },
                    {
                        id: 4,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'When you cook tomatoes, you should wash them _______.',
                        q: [
                            {id: 0, statement: 'up', add: false},
                            {id: 1, statement: 'off', add: false},
                            {id: 2, statement: 'often', add: false},
                            {id: 3, statement: 'not', add: false},
                            {id: 4, statement: 'first', add: false}

                        ],
                        c: [4],
                        ref: ['https://www.businessenglish.com/grammar/sequence-adverbs.html?lang=eng']
                    },
                    {
                        id: 5,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'He _______ helps me about the house.',
                        q: [
                            {id: 0, statement: 'often', add: false},
                            {id: 1, statement: 'lately', add: false},
                            {id: 2, statement: 'always', add: false},
                            {id: 3, statement: 'never', add: false},
                            {id: 4, statement: 'occasionally', add: false}
                        ],
                        c: [
                            0, 2, 3, 4
                           ],
                        ref: ['http://learnenglishteens.britishcouncil.org/grammar-vocabulary/grammar-videos/adverbs-frequency']
                    }
                ],
                [
                    {
                        id: 6,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'My sister is much _______ than me.',
                        q: [
                            {id: 0, statement: 'high', add: false},
                            {id: 1, statement: 'taller', add: false},
                            {id: 2, statement: 'smartest', add: false},
                            {id: 3, statement: 'smarter', add: false},
                            {id: 4, statement: 'more tall', add: false}
                        ],
                        c: [
                            1, 3
                        ],
                        ref: [
                            'http://esl.fis.edu/grammar/rules/comp.htm'
                        ]
                    },
                    {
                        id: 7,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'I think that Uma Thurman is _______ than Jennifer Lopez.',
                        q: [
                            {id: 0, statement: 'beautifuler', add: false},
                            {id: 1, statement: 'prettier', add: false},
                            {id: 2, statement: 'beautifully', add: false},
                            {id: 3, statement: 'more beautiful', add: false},
                            {id: 4, statement: 'pretty', add: false}
                        ],
                        c: [
                           1, 3
                        ],
                        ref: [
                            'http://esl.fis.edu/grammar/rules/comp.htm'
                        ]
                    },
                    {
                        id: 8,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'Mount Everest is _______ mountain in the world.',
                        q: [
                            {id: 0, statement: 'taller', add: false},
                            {id: 1, statement: 'higher', add: false},
                            {id: 2, statement: 'high', add: false},
                            {id: 3, statement: 'highest', add: false},
                            {id: 4, statement: 'the highest', add: false}
                        ],
                        c: [
                            4
                        ],
                        ref: [
                           'http://esl.fis.edu/grammar/rules/comp.htm' 
                        ]
                    },
                    {
                        id: 9,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'The weather in Africa is _______ than the weather in Europe.',
                        q: [
                            {id: 0, statement: 'warmer', add: false},
                            {id: 1, statement: 'the warmer', add: false},
                            {id: 2, statement: 'warmest', add: false},
                            {id: 3, statement: 'hoter', add: false},
                            {id: 4, statement: 'hotter', add: false}
                        ],
                        c: [
                            0, 4
                        ],
                        ref: [
                            'http://esl.fis.edu/grammar/rules/comp.htm' 
                        ]
                    },
                    {
                        id: 10,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'This is _______ issue.',
                        q: [
                            {id: 0, statement: 'importantest', add: false},
                            {id: 1, statement: 'importanter', add: false},
                            {id: 2, statement: 'the most important', add: false},
                            {id: 3, statement: 'most important', add: false},
                            {id: 4, statement: 'an important', add: false}
                        ],
                        c: [
                            2, 4
                        ],
                        ref: [
                            'http://esl.fis.edu/grammar/rules/comp.htm'
                        ]
                    }


                ],
                [
                   {
                       id: 11,
                       type: 'multipleChoiceGrammar',
                       target: 'Grammar',
                       task: 'Choose correct options to insert in the sentence.',
                       sentence: '_______ she going to get married?',
                       q: [
                           {id: 0, statement: 'Will', add: false},
                            {id: 1, statement: 'Does', add: false},
                            {id: 2, statement: 'Do', add: false},
                            {id: 3, statement: 'Is', add: false},
                            {id: 4, statement: 'Am', add: false}
                       ],
                       c: [
                           3
                       ],
                       ref: [
                           'http://dictionary.cambridge.org/grammar/british-grammar/future/future-be-going-to-i-am-going-to-work'
                       ]
                   },
                    {
                        id: 12,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'I am going _______ a job next month.',
                        q: [
                            {id: 0, statement: 'to look for', add: false},
                            {id: 1, statement: 'looking for', add: false},
                            {id: 2, statement: 'look for', add: false},
                            {id: 3, statement: 'will look for', add: false},
                            {id: 4, statement: 'not look for', add: false}
                        ],
                        c: [
                            0
                        ]
                    },
                    {
                        id: 13,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'He _______ going to talk to me about it.',
                        q: [
                            {id: 0, statement: 'doesn\'t', add: false},
                            {id: 1, statement: 'will', add: false},
                            {id: 2, statement: 'is', add: false},
                            {id: 3, statement: 'isn\'t', add: false},
                            {id: 4, statement: 'shouldn\'t', add: false}
                        ],
                        c: [
                             2, 3
                        ]
                    }
                ],
                [
                    {
                        id: 14,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'How _______ apples are there in your bag?',
                        q: [
                           {id: 0, statement: 'much', add: false},
                            {id: 1, statement: 'no', add: false},
                            {id: 2, statement: 'often', add: false},
                            {id: 3, statement: 'anything', add: false},
                            {id: 4, statement: 'many', add: false}
                        ],
                        c: [
                            4
                        ],
                        ref: [
                            'http://www.grammar.cl/english/how-much-how-many.htm'
                        ]
                    },
                    {
                        id: 15,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'I know _______ people.',
                        q: [
                            {id: 0, statement: 'much', add: false},
                            {id: 1, statement: 'nothing', add: false},
                            {id: 2, statement: 'anything', add: false},
                            {id: 3, statement: 'many', add: false},
                            {id: 4, statement: 'at least', add: false}
                        ],
                        c: [
                            3
                        ],
                        ref: [
                            'http://dictionary.cambridge.org/grammar/british-grammar/quantifiers/much-many-a-lot-of-lots-of-quantifiers'
                        ]
                    },
                    {
                        id: 16,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'I don\'t eat _______ fish.',
                        q: [
                            {id: 0, statement: 'many', add: false},
                            {id: 1, statement: 'much', add: false},
                            {id: 2, statement: 'no', add: false},
                            {id: 3, statement: 'nothing', add: false}
                        ],
                        c: [
                            1
                        ],
                        ref: [
                            'http://www.grammar-quizzes.com/agr_muchmany.html'
                        ]
                    },
                    {
                        id: 17,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'The fruit _______ delicious.',
                        q: [
                           {id: 0, statement: 'will', add: false},
                            {id: 1, statement: 'is', add: false},
                            {id: 2, statement: 'are', add: false},
                            {id: 3, statement: 'very', add: false},
                            {id: 4, statement: 'should', add: false}
                        ],
                        c: [
                            1
                        ],
                        ref: [
                            'http://www.ef.com/english-resources/english-grammar/countable-and-uncountable-nouns/'
                        ]
                    }  
                ],
                [
                    {
                        id: 18,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'I\'d like _______ longer, but I need to go.',
                        q: [
                           {id: 0, statement: 'stay', add: false},
                            {id: 1, statement: 'staying', add: false},
                            {id: 2, statement: 'to stay', add: false},
                            {id: 3, statement: 'will stay', add: false}
                        ],
                        c: [
                            2
                        ]
                    },
                    {
                        id: 19,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'I\'d really like _______ to the cinema with you, but I have much work.',
                        q: [
                           {id: 0, statement: 'to go', add: false},
                            {id: 1, statement: 'going', add: false},
                            {id: 2, statement: 'go', add: false},
                            {id: 3, statement: 'will go', add: false},
                            {id: 4, statement: 'went', add: false}
                        ],
                        c: [
                            0
                        ]

                    }
                ],
                [
                    {
                        id: 20,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'He can _______ football very well.',
                        q: [
                            {id: 0, statement: 'played', add: false},
                            {id: 1, statement: 'playing', add: false},
                            {id: 2, statement: 'play', add: false},
                            {id: 3, statement: 'to play', add: false},
                            {id: 4, statement: 'will play', add: false}
                        ],
                        c: [
                            2
                        ],
                        ref: [
                            'http://www.perfect-english-grammar.com/modal-verbs.html'
                        ]
                    },
                    {
                        id: 21,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'I\'m sorry, but I _______ go.',
                        q: [
                            {id: 0, statement: 'needing', add: false},
                            {id: 1, statement: 'must to', add: false},
                            {id: 2, statement: 'need to', add: false},
                            {id: 3, statement: 'let\'s', add: false},
                            {id: 4, statement: 'must', add: false}
                        ],
                        c: [
                            2, 4
                        ],
                        ref: [
                            'http://esl.fis.edu/grammar/rules/modal.htm'
                        ]
                    },
                    {
                        id: 22,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'Should I _______ to my mom\'s advice?',
                        q: [
                            {id: 0, statement: 'to listen', add: false},
                            {id: 1, statement: 'listen', add: false},
                            {id: 2, statement: 'listening', add: false},
                            {id: 3, statement: 'will listen', add: false},
                            {id: 4, statement: 'listened', add: false}
                        ],
                        c: [
                            1
                        ],
                        ref: [
                            'http://esl.fis.edu/grammar/rules/modal.htm'
                        ]
                    }
                ],
                [
                    {
                        id: 23,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'I know you! You _______ at Jim\'s party yesterday!',
                        q: [
                            {id: 0, statement: 'were', add: false},
                            {id: 1, statement: 'was', add: false},
                            {id: 2, statement: 'been', add: false},
                            {id: 3, statement: 'did', add: false},
                            {id: 4, statement: 'are', add: false}
                        ],
                        c: [
                            0
                        ],
                        ref: [
                            'http://www.perfect-english-grammar.com/past-simple.html'
                        ]
                    },
                    {
                        id: 24,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'Are you sure that those shoes _______ in that shop last week?',
                        q: [
                            {id: 0, statement: 'are', add: false},
                            {id: 1, statement: 'to be', add: false},
                            {id: 2, statement: 'were', add: false},
                            {id: 3, statement: 'was', add: false},
                            {id: 4, statement: 'be', add: false}
                        ],
                        c: [
                            2
                        ],
                        ref: [
                            'http://www.perfect-english-grammar.com/past-simple.html'
                        ]
                    },
                    {
                        id: 25,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'I didn\'t see him, because I _______ at school yesterday.',
                        q: [
                            {id: 0, statement: 'didn\'t be', add: false},
                            {id: 1, statement: 'were not been', add: false},
                            {id: 2, statement: 'weren\'t', add: false},
                            {id: 3, statement: 'wasn\'t', add: false},
                            {id: 4, statement: 'was not', add: false}
                        ],
                        c: [
                            3, 4
                        ],
                        ref: [
                            'http://www.perfect-english-grammar.com/past-simple.html'
                        ]
                    }
                ],
                [
                    {
                        id: 26,
                        type: 'multipleChoiceGrammar',
                        target: 'Grammar',
                        task: 'Choose correct options to insert in the sentence.',
                        sentence: 'I didn\'t _______ any sports last year.',
                        q: [
                            {id: 0, statement: 'doing', add: false},
                            {id: 1, statement: 'did', add: false},
                            {id: 2, statement: 'do', add: false},
                            {id: 3, statement: 'have', add: false},
                            {id: 4, statement: 'was', add: false}
                        ],
                        c: [
                            2
                        ],
                        ref: [
                            'http://www.englishpage.com/verbpage/simplepast.html'
                        ]
                    }
                ]
            ],

                            grammar_Topics : [
                {
                    id: 0,
                    name: 'Common and demonstrative adjectives'   
                },
                {
                    id: 1,
                    name: 'Adverbs of frequency'
                },
                {
                    id: 2,
                    name: 'Comparatives and superlatives'
                },
                {
                    id: 3,
                    name: 'Going to'
                },
                {
                    id: 4,
                    name: 'How much/How many'
                },
                {
                    id: 5,
                    name: 'Would like...'
                },
                {
                    id: 6,
                    name: 'Modals'
                },
                {
                    id: 7,
                    name: 'Past Simple of to be'
                },
                {
                    id: 8,
                    name: 'Past Simple'
                }

            ],
                            matchQuestions: [
                {
                    id: 0,
                    type: 'match',
                    target: 'Lexis',
                    task: 'Match words in left column with their antonyms in the right column',
                    left: [
                        'pretty',
                        'tall',
                        'kind',
                        'smooth',
                        'good'
                    ],
                    right: [
                        'evil',
                        'rough',
                        'bad',
                        'ugly',
                        'short'
                    ],
                    c: [
                        [
                           'good',
                            'pretty',
                            'kind',
                            'tall',
                            'smooth'
                        ],
                        [
                           'bad',
                            'ugly',
                            'evil',
                            'short',
                            'rough'
                        ]
                    ],
                    userInput: [
                        [],
                        []
                    ],
                    result: 0
                },
                {
                    id: 1,
                    type: 'match',
                    target: 'Lexis',
                    task: 'Match words in left column with their antonyms in the right column',
                    left: [
                        'cold',
                        'high',
                        'wide',
                        'close',
                        'strong'
                    ],
                    right: [
                        'narrow',
                        'warm',
                        'weak',
                        'far',
                        'low'
                    ],
                    c: [
                        [
                           'cold',
                            'high',
                            'wide',
                            'close',
                            'strong'
                        ],
                        [
                           'warm',
                            'low',
                            'narrow',
                            'far',
                            'weak'
                        ]
                    ],
                    userInput: [
                        [],
                        []
                    ],
                    result: 0
                }
            ],
            
                            textTrueOrFalseQuestions: [
                {
                    id: 1,
                    type: 'textTrueOrFalse',
                    target: 'Reading',
                    task: 'Read the text and mark the statements below that are TRUE.',
                    text: 'Brian sat down for dinner. He sat down in the chair. He sat down at the table. He looked at his white plate. He looked at his silver fork. He looked at his silver spoon. His dad said, "Pass me your plate, Brian." His dad put white rice on the plate. His dad put yellow corn on the plate. His dad put green peas on the plate. He gave the plate back to Brian. "This looks delicious," Brian said. "It is delicious," his dad said. Brian wondered why corn was yellow. He wondered why peas were green. He wondered if there were yellow peas and green corn.',
                    q: [
                        {id: 0, statement: 'Brian uses a spoon, a knife and a fork for eating.', add: false},
                        {id: 1, statement: 'Brian didn\'t like his food.', add: false},
                        {id: 2, statement: 'Brian wasn\'t going to eat alone.', add: false},
                        {id: 3, statement: 'Brian\'s spoon was made of the same metal as his fork.', add: false},
                        {id: 4, statement: 'Brian is most likely an adult.', add: false},
                       ],
                    c: [2, 3],
                    a: [],
                    result: 0
                }
            ],
            
                            listeningTrueOrFalseQuestions: [
                {
                    id: 1,
                    type: 'listeningTrueOrFalse',
                    target: 'Listening',
                    task: 'Listen to the audio and mark only TRUE statements below.',
                    audio: 'assets/audio/test.mp3',
                    q: [
                        {id: 0, statement: 'This might be a conversation between a father and a daughter.', add: false},
                        {id: 1, statement: 'The girl went to the cinema last night.', add: false},
                        {id: 2, statement: 'The girl was about to go to school, when the conversation happened.', add: false},
                        {id: 3, statement: 'The man asked the girl, if she wanted anything to eat.', add: false},
                        {id: 4, statement: 'The girl didn\'t want any coffee as of the moment of the conversation.', add: false}

                    ],
                    c: [0, 2, 3, 4],
                    a: [],
                    result: 0
                }
            ],
                
                            oddWordOutQuestions: [
                {
                    id: 1,
                    type: 'oddWordOut',
                    target: 'Lexis',
                    task: 'Select the word that doesn\'t fit with the other words.',
                    wordlist: [
                        'dog',
                        'cat',
                        'squirrel',
                        'rat',
                        'wolf',
                        'spaghetti'
                    ],
                    odd: 'spaghetti',
                    a: '',
                    result: 0
                }
            ]
            
        
                
                        }, //end of level 1
                        {   //level 2
                            grammar: [
                                [
                                    {
                                        id: 0,
                                        type: 'multipleChoiceGrammar',
                                        target: 'Grammar',
                                        task: 'Choose correct options to insert in the sentence.',
                                        sentence: 'She looked _______ than usual.',
                                        q: [
                                            {id: 0, statement: 'more happy', add: false},
                                            {id: 1, statement: 'happier', add: false},
                                            {id: 2, statement: 'happyer', add: false},
                                            {id: 3, statement: 'as happy', add: false},
                                            {id: 4, statement: 'happy', add: false}
                                        ],
                                        c: [1],
                                        ref: [
                                            'http://www.ef.com/english-resources/english-grammar/comparative-and-superlative/'
                                        ]
                                    },
                                    {
                                        id: 1,
                                        type: 'multipleChoiceGrammar',
                                        target: 'Grammar',
                                        task: 'Choose correct options to insert in the sentence.',
                                        sentence: 'She plays tennis every _______.',
                                        q: [
                                            {id: 0, statement: 'day', add: false},
                                            {id: 1, statement: 'week', add: false},
                                            {id: 2, statement: 'Sundays', add: false},
                                            {id: 3, statement: 'after', add: false},
                                            {id: 4, statement: 'again', add: false}
                                        ],
                                        c: [0, 1],
                                        ref: [
                                            'http://www.grammar.cl/Basic/Adverbs_Frequency.htm'
                                        ]
                                    }
                                ]
                            ], //end of grammar
                            grammar_Topics : [
                                
                            ],
                            matchQuestions: [],//end of match
                            textTrueOrFalseQuestions: [],//end of textTrueOrFalse
                            listeningTrueOrFalseQuestions: [], //end of Listening
                            oddWordOutQuestions: [] //end of OddWordOut
                            
                        }, //end of level 2
                        {
                            grammar: [], //end of grammar
                            matchQuestions: [],//end of match
                            textTrueOrFalseQuestions: [],//end of textTrueOrFalse
                            listeningTrueOrFalseQuestions: [], //end of Listening
                            oddWordOutQuestions: [] //end of OddWordOut
                        } //end of level 3
                    ] //end of levels
    }
    
    //TODO: Add other tests
    
    var tests = [
        englishPlacementTest
    ]
    return {
        getTests: function(){
            return tests;
        },
        superReplace: function(){
            for (var j = 0; j < englishPlacementTest.levelOne.grammar.length; j++) {
                var topic = englishPlacementTest.levelOne.grammar[j];
                for (var k = 0; k < topic.length; k++) {
                    var question = topic[k];
                    var correct = [];
                    console.log('Question: ' + question.sentence);
                    console.log('Options:');
                    for (var n = 0; n < question.q.length; n++) {
                        var newOption = "{id: "+ n+", statement: \'"+question.q[n]+"\', add: false}"
                        if (n != question.q.length-1) newOption += ","
                        console.log(newOption);
                        if (question.c.indexOf(question.q[n]) != -1) correct.push(n);
                    }
                    console.log('Correct:');
                    console.log(correct);
                    
                }
            }
            
        }
    }    
    
}])