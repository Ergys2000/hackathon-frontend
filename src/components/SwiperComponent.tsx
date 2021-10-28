import {Swiper} from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

export default (props: any) => {
    let {className, ...rest} = props;
    return (
        <div className={className}>
            <Swiper
                {...rest}
                spaceBetween={10}
                slidesPerView={'2'}
                observer={true}
                observeParents={true}
            ></Swiper>
        </div>
    );
};