/* ============================================================================
 * Observer
 * ============================================================================
 * Danilov Anatoly, 2012
 * danilovonline@gmail.com, http://danilovonline.ru
 *
 * Наблюдатель. Наблюдает за событиями и запускает наблюдающие методы
 * По сути - Singleton
 * ===========================================================================*/

if (__Observer === undefined || __Observer === null)
    var __Observer = {
        subscribers:  {}, //список подписчиков
        /* добавим подписчика на событие
         * @example __Observer.subscribe('close', shutdown)
         */
        subscribe: function(event, callback) {
            if (__Observer.subscribers[event] === undefined || __Observer.subscribers[event] === null) {
                __Observer.subscribers[event] = []; //на одно и тоже событие может быть несколько подписчиков, поэтому массив
            }
            __Observer.subscribers[event].push(callback);
        },

        /*
         * удаляем подписчика
         * @example __Observer.unsubscribe('close', shutdown)
         */
        unsubscribe: function(event, callback) {
            if (__Observer.subscribers[event] === undefined || __Observer.subscribers[event] === null) {
                return; // если подписчик не существует, то удаляем
            }
            var i = 0,
                len = __Observer.subscribers[event].length;

            // Пробегаем про всему списку и если находим нужного нам
            // подписчика, то удаляем его.
            for (; i < len; i++) {
                if (this.subscribers[event][i] === callback) {
                    this.subscribers[event].splice(i, 1);
                    // Если нашли то что искали, продолжать не надо.
                    return;
                }
            }
        },

        /*
         * выполняем подписанные на событие методы
         * event - событие
         * data - данные которые передадутся в метод-подписчик
         * @example __Observer.publish('close', {"autosave": true})
         */
        publish: function(event, data) {
            if (__Observer.subscribers[event] === undefined || __Observer.subscribers[event] === null) {
                return;
            }
            var i = 0,
                len = __Observer.subscribers[event].length;
            try {
                eval('data = ' + data);
            }catch(e){}
            // Пробегаем по всему списку подписчиков и запускаем функции.
            for (; i < len; i++) {
                __Observer.subscribers[event][i](data);
            }
        }
    }
