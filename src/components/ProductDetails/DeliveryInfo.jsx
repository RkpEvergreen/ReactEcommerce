import {
    Truck,
    Clock3,
    RotateCcw,
    Eye,
    HelpCircle,
    Share2
} from "lucide-react";

function DeliveryInfo() {

    return (
        <div className="delivery-info">

            <div>

                <Truck size={14} />

                <span>
                    Delivery & Return
                </span>

                <HelpCircle size={13} />

                <span>
                    Ask A Question
                </span>

                <Share2 size={13} />

                <span>
                    Share
                </span>

            </div>


            <div>

                <Clock3 size={13} />

                <span>
                    Estimated Delivery:
                    12-26 days (International),
                    3-6 days (United States)
                </span>

            </div>


            <div>

                <RotateCcw size={13} />

                <span>
                    Return within 45 days of purchase.
                    Duties & taxes are non-refundable.
                </span>

            </div>


            <div>

                <Eye size={13} />

                <a href="#">
                    View Store Information
                </a>

            </div>

        </div>
    );
}

export default DeliveryInfo;