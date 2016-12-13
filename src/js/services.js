'use strict'
angular.module('kiddsapp.services', [])
.factory('newsFactory', [function(){
    var news = [
        {
           title: 'Some interesting news 1',
            date: '01.12.2013',
            photo: 'assets/news/news1.jpg',
            text: 'У повісті «Гуси-лебеді летять» Михайло Стельмах знайомить нас з роками свого дитинства. На початку 20 сторіччя він був маленьким хлопчиком Михайликом. Автор розповідає нам про своє дитинство, рідне село, а також про родину.Одним з головних у творі виступає образ батька - Панаса Дем’яновича, хоч і з’являється він наживо лише наприкінці твору. Проте про нього постійно згадують інші члени родини, він у думках хлопця, хоч той його вже погано пам’ятає. Панаса Дем’яновича у родині люблять, поважають, покладаються. Батько Михайлика – справжній трудівник. Він любить рідну землю і сина вчить поважати працю хлібороба.'
            
        },
        {
           title: 'Some interesting news 2',
            date: '03.12.2013',
            photo: 'assets/news/news1.jpg',
            text: '«Маленький принц» по праву вважається одним із шедеврів світової літератури. Антуан де Сент-Екзюпері, автор цієї дивовижної філософської притчі, одягненої у форму казки, майстерно передав ідеї універсальних людських істин, ще раз нагадавши про людяність, добро та любов. Свій задум автор зумів втілити через образ головного героя – Маленького принца. Не випадковим стало зображення головного героя дитиною, бо саме дитяче сприйняття світу, на думку автора, є найбільш природним та таким, що відображає Всесвіт найбільш правдиво. Дитина, якій невідомі багато речей, тим не менш, зазвичай володіє глибшою мудрістю та прозорливістю, ніж більшість дорослих людей. Цю ідею автор підкреслює часто повторюваними висловлюваннями Маленького принца «Дорослі – дивний народ»'
            
        },
        {
           title: 'Some interesting news 3',
            date: '08.12.2014',
            photo: 'assets/news/news1.jpg',
            text: 'За горами й лісами було колись одне королівство. Тут жили найкращі в світі столяри, кухарі, будівельники, шевці та майстри усіх інших ремесел. У цьому королівстві і його король вмів шити, кувати залізо, ремонтувати годинники - був майстром на всі руки. І лише у малого королевича все валилося з рук. Навіть цвяха забити не міг, неодмінно влучав по пальцю. - Ой болить! Не хочу більше! - лунало в палаці, лиш тільки йому давали якийсь інструмент. А терпіння, аби по справжньому навчитися якійсь справі, королевич не мав. - Хочу одразу все вміти, - казав батькові, надувши ображено щоки.- Так не буває, - намагався пояснити король. - Треба багато мозолів натерти, та гуль набити доки оволодієш ремеслом.'
        },
        {
           title: 'Some interesting news 4',
            date: '09.04.2015',
            photo: 'assets/news/news1.jpg',
            text: 'Коли я був маленький, то дуже дивувався, чому не розмовляють наша кішка та наш собака. Я вважав це несправедливістю: чому це вони не мають дару розмовляти, а ми маємо? Вони ж від нас не гірші... Потім я вирішив, що не може бути в природі такого, щоб звірі не говорили. Мабуть, вони розмовляють тільки між собою, потайки, щоб люди не чули, думав я. Я вважав, що звірі та птахи образилися на людей за те, що ми їх винищуємо та їмо, тому й перемовляються так, щоб ми їх не зрозуміли. Шифруються, тобто.'
        }
        
    ]
    
    return {
        news : news,
        deleteNews: function(id) {
            news.splice(id, 1);
        },
        addNews: function(newsToAdd){
            news.unshift(newsToAdd);
        },
        changeNews: function(id, newNews) {
            news.splice(id, 1, newNews)
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
        getTeacherById: function(teacherId){
            for (var i = 0; i < teachers.length; i++) {
                if (teachers[i].id == teacherId) {
                    return teachers[i];
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
        }
    }
}])