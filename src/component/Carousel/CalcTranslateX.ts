
export interface ICalcTranslateX {

    translateX: number;
    isYScroll: boolean;

    onPointerDown: (pageX: number, pageY: number) => void | undefined;
    onPointerMove: (pageX: number, pageY: number, activeIndex: number, itemsLength: number) => void | undefined;
    onPointerUp: () => void | undefined;

    calcTranslateXOnMove: (pageX: number, activeIndex: number, itemsLength: number) => number;
    getStringifyToCssTranslateX: (activeIndex: number, translateX: number) => string;

    isIndexIncrease: () => boolean;

    isEnoughDist: () => boolean;

    getYScrollFunc: (pageX: number, pageY: number) => boolean;
}

class CalcTranslateX implements ICalcTranslateX{

    //itemsLength: itemsLength,
    dist = 0;

    prevPageX = 0;
    pageXStart = 0;
    pageYStart = 0;

    isYScroll = false;
    isFirstMove = true;

    offset = 30;

    translateX = 0;

    onPointerDown = (pageX: number, pageY: number) => {

        this.pageXStart = pageX;
        this.pageYStart = pageY;
        this.prevPageX = pageX;
        this.dist = 0;


    };

    onPointerMove = (pageX: number, pageY: number, activeIndex: number, itemsLength: number) => {

        //console.log("onPointerMove", pageX);

        this.dist = this.pageXStart - pageX;

        this.translateX += this.calcTranslateXOnMove(pageX, activeIndex, itemsLength);

        this.prevPageX = pageX;

    };

    /* onPointerMove = (pageX: number, pageY: number, activeIndex: number, itemsLength: number) => {

        //console.log("onPointerMove", pageX);

        if(this.isFirstMove){

            this.isYScroll = this.isYScrollFunc(pageX, pageY);

            this.isFirstMove = false;

        }

        if(this.isYScroll) return ;

        this.dist = this.pageXStart - pageX;

        this.translateX += this.calcTranslateXOnMove(pageX, activeIndex, itemsLength);

        this.prevPageX = pageX;

    };
 */
    onPointerUp = () => {

        this.isYScroll = false;
        this.isFirstMove = true;

        this.translateX = 0;

    };

    getYScrollFunc = (pageX: number, pageY: number) => {

        if(this.isFirstMove){

            const distX = Math.abs(pageX - this.pageXStart);
            const distY = Math.abs(pageY - this.pageYStart);

            this.isYScroll = distY > distX;

            this.isFirstMove = false;

        }

        //const distX = Math.abs(pageX - this.pageXStart);
        //const distY = Math.abs(pageY - this.pageYStart);

        //console.log("distX " + distX);
        //console.log(event);

        return this.isYScroll;

    };

    calcTranslateXOnMove = (pageX: number, activeIndex: number, itemsLength: number) => {
    
        if(activeIndex === 0 && this.translateX > 0){
    
            if(pageX > this.prevPageX){

                if(this.translateX > this.offset) return 0;

                return 0.3;

            }
    
        }else if(activeIndex === itemsLength - 1 && this.translateX < 0){

            if(pageX < this.prevPageX){

                if(this.translateX < -this.offset) return 0;

                return -0.3;

            }
    
        }
    
        return pageX - this.prevPageX;
    
    };

    getStringifyToCssTranslateX = (activeIndex: number, translateX: number) => {

        const translateByActiveIndex = - activeIndex * 100 + '%';
    
        return  'calc(' + translateByActiveIndex + " + " + translateX + 'px)';
    
    };

    isIndexIncrease = () => {

        return this.dist > 0;

    };

    isEnoughDist = () => {

        return Math.abs(this.dist) > 25;

    };

    /* isYScrollFunc = (pageX: number, pageY: number) => {

        const distX = Math.abs(pageX - this.pageXStart);
        const distY = Math.abs(pageY - this.pageYStart);

        //console.log("distX " + distX);
        //console.log(event);

        return distY > distX;

    }; */

}

export default CalcTranslateX;