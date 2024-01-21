import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Header, HeaderContent, Icon, Item, ItemContent, ItemHeader, ListContent, Message } from "semantic-ui-react";
import * as actionName from '../store/action'

const Home = () => {
    const user = useSelector(s => s.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: actionName.SET_SELECTED_RECIPE, data: null });
    }, [])
    let text = user ? "Wellcome " + user.Name : "ברוך הבא";
    return <>
        <div className="container homePage">
            <div>
                < Header style={{ fontSize: '5em' }} textAlign="center" content={text} />
                <Header as='h1' textAlign="center" content='למקצוענים במזון' />
                <Header as='h3' textAlign="center" content='מתכונים מנצחים. מפה תוכלו לנווט לכל סוג מתכון שתחפצו. סלטים, ממולאים, תבשילים, מרקים, מתכונים טבעוניים, צמחוניים, קינוחים ועוד. מיטב השפים בישראל ממתינים לכם עם אוסף של מתכונים מדוייקים ומוצלחים שיהפכו אתכם לבשלנים מצטיינים.' />
                {user === null ?
                    <Message floating error header='אינך מחובר למערכת' content='הצפיה במתכונים הינה למשתמשים רשומים בלבד' /> :
                    <Header as='a' content='לצפיה במתכונים' textAlign="center" />
                }

            </div>

        </div>
    </>
}
export default Home;