import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Header, Message } from "semantic-ui-react";
import * as actionName from '../store/action'

const Home = () => {
    const user = useSelector(s => s.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: actionName.SET_SELECTED_RECIPE, data: null });
    }, [])
    let text = user ? "Wellcome " + user.Name : "ברוך הבא";
    return <>
    < img className="imgHome" src="https://as1.ftcdn.net/v2/jpg/02/52/38/80/1000_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg"/>
        <div className="container homePage">
            <div style={{backgroundColor: '#00000073', padding: '10%'}}>
                <Header style={{ fontSize: '5em' }} inverted textAlign="center" content={text} />
                <Header as='h1' textAlign="center" inverted content='למקצוענים במזון' />
                <Header as='h2' textAlign="center" inverted content='מתכונים מנצחים. מפה תוכלו לנווט לכל סוג מתכון שתחפצו. סלטים, ממולאים, תבשילים, מרקים, מתכונים טבעוניים, צמחוניים, קינוחים ועוד. מיטב השפים בישראל ממתינים לכם עם אוסף של מתכונים מדוייקים ומוצלחים שיהפכו אתכם לבשלנים מצטיינים.' />
                {user === null ?
                    <Message floating error header='אינך מחובר למערכת' content='הצפיה במתכונים הינה למשתמשים רשומים בלבד' /> :
                    <></>
                }

            </div>

        </div>
    </>
}
export default Home;