/* eslint-disable no-eval */
/* eslint-disable no-multi-str */
import React, { useState, useEffect, useRef } from "react";
import "./Bot.css";
import messageSound from "./message.mp3";
import logo from "./chatbot.png";
import { useSelector } from "react-redux";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [options, setOptions] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [menuOptions, setMenuOptions] = useState([]);
  const [menu1Options, setMenu1Options] = useState([]);
  const [menu2Options, setMenu2Options] = useState([]);

  const [currentMenu, setCurrentMenu] = useState("main");
  const [showFeedback, setShowFeedback] = useState(false);
  const [originalUserMessage, setOriginalUserMessage] = useState("");
  const { categorys } = useSelector((state) => state.home);
  const audio = useRef(null);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    setMessages([
      { text: "Xin chào, Shop-vn vui lòng phục vụ!!", sender: "bot" },
      {
        text: "Vui lòng điền tên và email để tôi có thể hỗ trợ bạn!... :)",
        sender: "bot",
      },
    ]);

    setTimeout(() => {
      setUserData(true);
    }, 100);
  }, []);

  useEffect(() => {
    scrollChatToBottom();
  }, [messages]);

  const scrollChatToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  let popupTimeout;
  window.onload = function () {
    popupTimeout = setTimeout(() => {
      setShowPopup(true);
    }, 500);
  };

  const startSpeechRecognition = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInputMessage(speechResult);
      handleChat();
    };

    recognition.start();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const redirectToLink = (link) => {
    if (link) {
      window.open(link, "_blank");
    } else {
      console.error("No link provided for redirection.");
    }
  };

  // Handle Menu
  const handleMenuOptionClick = (option) => {
    if (option === "Về chúng tôi") {
      const userMessage = { text: "Về chúng tôi", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Chào mừng bạn đến với Shop-VN - điểm đến lý tưởng cho những người yêu thích mua sắm trực tuyến! Chúng tôi tự hào là một cửa hàng trực tuyến đa dạng, mang đến cho khách hàng trải nghiệm mua sắm độc đáo và tiện lợi. Tại Shop-VN, chúng tôi cam kết mang đến cho bạn sự đa dạng và chất lượng trong mỗi sản phẩm. Chúng tôi liên tục cập nhật danh mục sản phẩm của mình để đáp ứng nhu cầu đa dạng của khách hàng, từ thời trang và đồ điện tử đến đồ gia dụng và đồ chơi sáng tạo.Chất lượng là ưu tiên hàng đầu của chúng tôi. Tất cả các sản phẩm được chọn lọc cẩn thận để đảm bảo đáp ứng tiêu chuẩn cao nhất về chất lượng và hiệu suất. Chúng tôi luôn nỗ lực để mang đến cho bạn những sản phẩm tốt nhất từ các nhãn hiệu uy tín và đáng tin cậy.Ngoài ra, chúng tôi tự hào về dịch vụ khách hàng tận tâm và chuyên nghiệp. Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn và đảm bảo bạn có trải nghiệm mua sắm tuyệt vời nhất tại Shop-VN.Chúng tôi hi vọng bạn sẽ tận hưởng việc khám phá thế giới sản phẩm đa dạng và phong cách tại Shop-VN. Hãy đồng hành cùng chúng tôi trên hành trình mua sắm trực tuyến, nơi bạn có thể tìm thấy sự độc đáo và sự tiện lợi mỗi ngày.Cảm ơn bạn đã ghé thăm Shop-VN. Hãy đặt niềm tin vào chúng tôi và trải nghiệm sự khác biệt!",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("one");
      setMenu1Options(["Trở Về"]);
    } else if (option === "Về địa chỉ cửa hàng") {
      const userMessage = { text: "Về địa chỉ cửa hàng", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Chào mừng quý khách đến với Shop-VN, nơi bạn có thể trải nghiệm mua sắm đẳng cấp và độc đáo tại Việt Nam! Chúng tôi hân hạnh chia sẻ với bạn thông tin về địa chỉ của cửa hàng để bạn có thể ghé thăm và khám phá thế giới sản phẩm đa dạng của chúng tôi.\n\
        Địa chỉ cửa hàng:\n\
        Shop-VN\n\
        [hẻm 51, đường 3/2, phường Xuân Khánh, quận Ninh Kiều, tp.Cần Thơ]\n\
        Chúng tôi đặt cửa hàng tại một vị trí thuận lợi để phục vụ nhu cầu mua sắm của bạn. Không chỉ là nơi để bạn tìm kiếm những sản phẩm độc đáo, chất lượng, mà còn là không gian để trải nghiệm sự tiện lợi và thân thiện từ đội ngũ nhân viên chuyên nghiệp của chúng tôi.\n\
        Giờ mở cửa:\n\
        Chúng tôi mở cửa hàng ngày trong tuần để đảm bảo bạn có thể ghé thăm vào bất kỳ thời điểm nào thuận tiện nhất.\n\
        [Thời gian mở cửa từ thứ Hai đến thứ Sáu]\n\
        [Giờ mở cửa 7h-20h]\n\
        Hãy đến và trải nghiệm không khí thân thiện, chất lượng sản phẩm và dịch vụ khách hàng xuất sắc tại Shop-VN. Chúng tôi rất mong được đón tiếp bạn và chia sẻ niềm đam mê mua sắm cùng bạn tại địa chỉ của chúng tôi!\n\
        Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, đừng ngần ngại liên hệ với chúng tôi qua [0858456029] hoặc [phuproz348@gmail.com]. Cảm ơn bạn đã chọn Shop-VN, nơi mua sắm của sự độc đáo và chất lượng!",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("one");
      setMenu1Options(["Xem địa chỉ cụ thể", "Trở Về"]);
    } else if (option === "Cửa hàng bán những gì?") {
      const userMessage = { text: "Cửa hàng bán những gì?", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: `Cửa hàng chúng tôi bán những sản phẩm quần áo thời trang chất lượng cao từ thương hiệu hàng đầu, bạn có thể vào bấm vào cửa hàng để xem thông tin chi tiết, sau đây là danh mục sản phẩm ở bên mình:  ${categorys.map(
          (item) => item.name
        )} `,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("one");
      setMenu1Options([
        "Tôi có thể thanh toán bằng cách nào?",
        // "Academic Structure",
        // "Syllabus",
        // "Academic Council",
        "Trở Về",
      ]);
    } else if (option === "Facilities") {
      const userMessage = { text: "Facilities", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Different Facicilites Provided @VIIT Are:",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("one");
      setMenu1Options([
        "Accomodation",
        "Lab's",
        "Different Research & development Opportunities",
        "Trở Về",
      ]);
    }
  };

  const handleFirstMenuOptionClick = (option) => {
    if (option === "B.Tech") {
      const userMessage = { text: "B.Tech", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Courses Offered in B.tech Are:",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options([
        "B.tech-Civil",
        "B.tech-Computer",
        "B.tech-Electronics & Telecomunication ",
        "B.tech-Information Technology",
        "B.tech-Mechanical Engineering",
        "B.tech-AI & DS",
        "B.tech-CSE[AI]",
        "B.tech-CSE[AI & ML]",
        "B.tech-CSE[IOT,CS&BT]",
        "B.tech-CE[Software Engineer]",
        "B.tech-CSE[Data Science]",
        "Trở Về",
        "Trang Chủ",
      ]);
    } else if (option === "M.Tech") {
      const userMessage = { text: "M.Tech", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "We Offer a Variety of programs For M.tech Enthusiast:",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options([
        "M.Tech-Civil",
        "M.Tech-Computer",
        "M.Tech-Electronics & Telecomunication ",
        "M.Tech-Mechanical",
        "Trở Về",
        "Trang Chủ",
      ]);
    } else if (option === "PHD") {
      const userMessage = { text: "PHD", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "In phd we offer are having branches like Mechanical Engineering, Civil, Computer Engineering, Electronics & Telecomunication Engineering\n for more details click here",
        sender: "bot",
        link: "https://www.viit.ac.in/admissions/phd-admissions",
      };
      redirectToLink("https://www.viit.ac.in/admissions/phd-admissions");
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "Xem địa chỉ cụ thể") {
      const userMessage = { text: "Xem địa chỉ cụ thể", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Bấm vào đây để biết thông tin bạn đang tìm kiếm!",
        sender: "bot",
        link: "https://www.google.com/maps/place/H%E1%BA%BBm+51+%C4%90%C6%B0%E1%BB%9Dng+3-2,+Ph%C6%B0%E1%BB%9Dng+An+Kh%C3%A1nh,+Ninh+Ki%E1%BB%81u,+C%E1%BA%A7n+Th%C6%A1,+Vietnam/@10.02611,105.7633405,17z/data=!3m1!4b1!4m6!3m5!1s0x31a0883bc7811247:0x7078ece09d8755f1!8m2!3d10.0261047!4d105.7659154!16s%2Fg%2F11lghbh9zy?entry=ttu",
      };
      redirectToLink(
        "https://www.google.com/maps/place/H%E1%BA%BBm+51+%C4%90%C6%B0%E1%BB%9Dng+3-2,+Ph%C6%B0%E1%BB%9Dng+An+Kh%C3%A1nh,+Ninh+Ki%E1%BB%81u,+C%E1%BA%A7n+Th%C6%A1,+Vietnam/@10.02611,105.7633405,17z/data=!3m1!4b1!4m6!3m5!1s0x31a0883bc7811247:0x7078ece09d8755f1!8m2!3d10.0261047!4d105.7659154!16s%2Fg%2F11lghbh9zy?entry=ttu"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "Differents Recruiters") {
      const userMessage = { text: "Differents Recruiters", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "We've a variety of recruiter's like:\nAccenture\tLoreal\tNVIDIA\tTech Mahindra\nHere's a list of all:",
        sender: "bot",
        link: "https://www.viit.ac.in/placement-i2ic/our-recruiters-i2ic",
      };
      redirectToLink(
        "https://www.viit.ac.in/placement-i2ic/our-recruiters-i2ic"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "Tôi có thể thanh toán bằng cách nào?") {
      const userMessage = {
        text: "Tôi có thể thanh toán bằng cách nào?",
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Bạn có thể thanh toán bằng thẻ visa hoặc có thể thanh toán sau khi nhận hàng!",
        sender: "bot",
        // link: "https://www.viit.ac.in/images/Academics/Institute_Calendar_Sem-I_AY_2023-24.pdf",
      };
      // redirectToLink(
      //   "https://www.viit.ac.in/images/Academics/Institute_Calendar_Sem-I_AY_2023-24.pdf"
      // );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "Academic Structure") {
      const userMessage = { text: "Academic Structure", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click Here For the Academic Structure",
        sender: "bot",
        link: "https://www.viit.ac.in/images/Academics/structure/Academic-structures_AY_2023-24.pdf",
      };
      redirectToLink(
        "https://www.viit.ac.in/images/Academics/structure/Academic-structures_AY_2023-24.pdf"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "Syllabus") {
      const userMessage = { text: "Syllabus", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // const botMessage = {
      //   text: "Select the Branch for the Particular Syllabus",
      //   sender: "bot",
      // };
      setCurrentMenu("two");
      setMenu2Options([
        "Civil",
        "Computer Engineering",
        "Electronics & Telecomunication Engineering",
        "Information Technology",
        "Mechanical Engineering",
        "AI & DS",
        "CSE[AI]",
        "CSE[AI & ML]",
        "CSE[IOT,CS&BT]",
        "CE[Software Engineer]",
        "CSE[Data Science]",
        "Trở Về",
        "Trang Chủ",
      ]);
    } else if (option === "Academic Council") {
      const userMessage = { text: "Academic Council", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click here",
        sender: "bot",
        link: "https://www.viit.ac.in/academicjuly2020/academic-board-council",
      };
      redirectToLink(
        "https://www.viit.ac.in/academicjuly2020/academic-board-council"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "Accomodation") {
      const userMessage = { text: "Accomodation", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click here",
        sender: "bot",
        link: "https://www.viit.ac.in/images/Admissions/Hostel-Fees/VIIT-Hostel-Fee-Structure-2023-24.pdf",
      };
      redirectToLink(
        "https://www.viit.ac.in/images/Admissions/Hostel-Fees/VIIT-Hostel-Fee-Structure-2023-24.pdf"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "Different Research & development Opportunities") {
      const userMessage = {
        text: "Different Research & development Opportunities",
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click here",
        sender: "bot",
        link: "https://www.viit.ac.in/research-and-development-cerd/r-d-scheme",
      };
      redirectToLink(
        "https://www.viit.ac.in/research-and-development-cerd/r-d-scheme"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "Trở Về") {
      const userMessage = { text: "Trở Về", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setCurrentMenu("main");
    }
  };

  const handleSecondMenuOptionClick = (option) => {
    if (option === "B.tech-Civil") {
      const userMessage = { text: "Civil", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "In Civil we offer a total of 60 seats.\n For more details CLick Here",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/civil/about-departmentcivil",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/civil/about-departmentcivil"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "B.tech-Computer") {
      const userMessage = { text: "Computer Engineering", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "In Computer Engineering we offer a total of 240 seats.\n For more details CLick Here",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/computer/department-profile-comp",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/computer/department-profile-comp"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "B.tech-Electronics & Telecomunication ") {
      const userMessage = {
        text: "Electronics & Telecomunication Engineering",
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "In Electronics & Telecomunication Engineering we offer a total of 180 seats.\n For more details CLick Here",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/e-tc/department-profile-entc",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/e-tc/department-profile-entc"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "B.tech-Information Technology") {
      const userMessage = { text: "Information Technology", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "In Information Technology we offer a total of 180 seats.\n For more details CLick Here",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/information-technology-ug/department-profile",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/information-technology-ug/department-profile"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "B.tech-Mechanical Engineering") {
      const userMessage = { text: "Mechanical Engineering", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "In Mechanical Engineering we offer a total of 120 seats.\n For more details CLick Here",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/mechanical/about-departmentmech",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/mechanical/about-departmentmech"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "B.tech-AI & DS") {
      const userMessage = { text: "AI & DS", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "In AI & DS Engineering we offer a total of 180 seats.\n For more details CLick Here",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/ai-and-ds/about-department-aids",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/ai-and-ds/about-department-aids"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "B.tech-CSE[AI]") {
      const userMessage = { text: "CSE[AI]", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "The CSE[AI] department focuses on innovation, research, and entrepreneurship, aiming to cultivate a dynamic learning environment and produce socially responsible AI professionals with interdisciplinary expertise and career readiness for diverse roles in data-driven industries.",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/cse-ai",
      };
      redirectToLink("https://www.viit.ac.in/departments/cse-ai");
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "B.tech-CSE[AI & ML]") {
      const userMessage = { text: "CSE[AI & ML]", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "In CSE[AI & ML] we offer a total of  60 seats.\n For more details CLick Here",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/cse-ai-ml",
      };
      redirectToLink("https://www.viit.ac.in/departments/cse-ai-ml");
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "B.tech-CSE[IOT,CS&BT]") {
      const userMessage = { text: "CSE[IOT,CS&BT]", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "In CSE[IOT,CS&BT] a specialized undergraduate program (B.Tech CSE) focusing on IoT, Cyber Security, and Blockchain. Graduates gain expertise in these transformative technologies, addressing the rising global demand for secure IoT ecosystems, robust cybersecurity, and the revolutionary impact of blockchain. The markets for IoT, cybersecurity, and blockchain are poised for substantial growth, reflecting their bright future.",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/cse-iot-cs-bt",
      };
      redirectToLink("https://www.viit.ac.in/departments/cse-iot-cs-bt");
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "B.tech-CE[Software Engineer]") {
      const userMessage = { text: "CE[Software Engineer]", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "In CE[Software Engineer] we offers a unique blend of hardware and software knowledge, preparing graduates for versatile roles like software developers or systems analysts. The program includes hands-on projects, an industry-aligned curriculum, and fosters problem-solving skills. With a global demand for skilled software engineers, VIIT's program, guided by dedicated faculty, provides a distinctive and world-class education.",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/ce-se",
      };
      redirectToLink("https://www.viit.ac.in/departments/ce-se");
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "B.tech-CSE[Data Science]") {
      const userMessage = { text: "CSE[Data Science]", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "From 2023–2024, the institute offers a 60-capacity B.Tech CSE (Data Science) program, combining computer science, statistics, and mathematics. Designed for analytical minds, it prepares graduates for rewarding careers in AI and Data Science across various industries.e",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/cse-ds",
      };
      redirectToLink("https://www.viit.ac.in/departments/cse-ds");
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "M.Tech-Civil") {
      const userMessage = { text: "Civil", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "In Civil we offer a total of 6 seats.\n For more details CLick Here",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/civil/about-departmentcivil",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/civil/about-departmentcivil"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "M.Tech-Computer") {
      const userMessage = { text: "Computer Engineering", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "In Computer Engineering we offer a total of 6 seats.\n For more details CLick Here",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/computer/department-profile-comp",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/computer/department-profile-comp"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "M.Tech-Electronics & Telecomunication ") {
      const userMessage = {
        text: "Electronics & Telecomunication Engineering",
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "In Electronics & Telecomunication Engineering we offer a total of 6 seats.\n For more details CLick Here",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/e-tc/department-profile-entc",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/e-tc/department-profile-entc"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "M.Tech-Mechanical") {
      const userMessage = { text: "Mechanical Engineering", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "In Mechanical Engineering we offer a total of 6 seats.\n For more details CLick Here",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/mechanical/about-departmentmech",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/mechanical/about-departmentmech"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "Civil") {
      const userMessage = { text: "Civil Engineering", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click Here for details about Syllabus of Civil Engineering",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/civil/about-departmentcivil",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/civil/about-departmentcivil"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "Computer Engineering") {
      const userMessage = { text: "Computer Engineering", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click Here for details about Syllabus of Computer Engineering",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/computer/syllabus",
      };
      redirectToLink("https://www.viit.ac.in/departments/computer/syllabus");
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "Electronics & Telecomunication Engineering") {
      const userMessage = {
        text: "Electronics & Telecomunication Engineering",
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click Here for details about Syllabus of Electronics & Telecomunication Engineering",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/e-tc/syllabus",
      };
      redirectToLink("https://www.viit.ac.in/departments/e-tc/syllabus");
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "Information Technology") {
      const userMessage = { text: "Information Technology", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click Here for details about Syllabus of Information Technology",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/information-technology-ug/syllabus",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/information-technology-ug/syllabus"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "Mechanical Engineering") {
      const userMessage = { text: "Mechanical Engineering", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click Here for details about Syllabus of Mechanical Engineering",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/mechanical/syllabus",
      };
      redirectToLink("https://www.viit.ac.in/departments/mechanical/syllabus");
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "AI & DS") {
      const userMessage = { text: "AI & DS", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click Here for details about Syllabus of AI & DS",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/ai-and-ds/aids-syllabus",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/ai-and-ds/aids-syllabus"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "CSE[AI]") {
      const userMessage = { text: "CSE[AI]", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click Here for details about Syllabus of CSE[AI]",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/cse-ai/syllabus-cse-ai",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/cse-ai/syllabus-cse-ai"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "CSE[AI & ML]") {
      const userMessage = { text: "CSE[AI & ML]", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click Here for details about Syllabus of CSE[AI & ML]",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/cse-ai-ml/syllabus-cse-ai-ml",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/cse-ai-ml/syllabus-cse-ai-ml"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "CSE[IOT,CS&BT]") {
      const userMessage = { text: "CSE[IOT,CS&BT]", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click Here for details about Syllabus of CSE[IOT,CS&BT]",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/cse-iot-cs-bt/syllabus-iot-cs-bt",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/cse-iot-cs-bt/syllabus-iot-cs-bt"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "CE[Software Engineer]") {
      const userMessage = { text: "CE[Software Engineer]", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click Here for details about Syllabus of CE[Software Engineer]",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/ce-se/syllabus-ce-se",
      };
      redirectToLink("https://www.viit.ac.in/departments/ce-se/syllabus-ce-se");
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "CSE[Data Science]") {
      const userMessage = { text: "CSE[Data Science]", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      const botMessage = {
        text: "Click Here for details about Syllabus of CSE[Data Science]",
        sender: "bot",
        link: "https://www.viit.ac.in/departments/cse-ds/syllabus-cse-ds",
      };
      redirectToLink(
        "https://www.viit.ac.in/departments/cse-ds/syllabus-cse-ds"
      );
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setCurrentMenu("two");
      setMenu2Options(["Trở Về", "Trang Chủ"]);
    } else if (option === "Trở Về") {
      const userMessage = { text: "Trở Về", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setCurrentMenu("one");
    } else if (option === "Trang Chủ") {
      const userMessage = { text: "Trở Về", sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setCurrentMenu("main");
    }
  };

  // INPUT USER NAME AND EMAIL
  const handleUserDetails = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/chatbot/userdetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("User details saved successfully");

          const botMessage = {
            text: `Cảm ơn vì thông tin, ${name}. Vui lòng đặt câu hỏi cho chúng tôi.`,
            sender: "bot",
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
          setUserData(false);

          setShowMenu(true);
          setMenuOptions([
            "Về chúng tôi",
            "Về địa chỉ cửa hàng",
            "Cửa hàng bán những gì?",
          ]);
        } else if (response.status === 400) {
          console.error(
            "Failed to save user details. A user with this email already exists."
          );
        } else {
          console.error(
            "Failed to save user details. Server responded with status:",
            response.status
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const openLinkInNewTab = (e, link) => {
    e.preventDefault();
    window.open(link, "_blank");
  };

  const toggleBOT = () => {
    clearTimeout(popupTimeout);
    setShowPopup(false);

    let blur = document.getElementById("blur");
    blur.classList.toggle("active");

    let chatbot = document.getElementById("chatbot");
    chatbot.classList.toggle("active");
  };

  // Chatbot's Reply Logic
  const handleChat = () => {
    setShowMenu(false);
    setShowFeedback(false);
    if (inputMessage.trim() !== "") {
      setOriginalUserMessage(inputMessage);
      const userMessage = { text: inputMessage, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputMessage("");

      setIsBotTyping(true);

      fetch("http://localhost:5000/api/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputMessage, selected_option: null }),
      })
        .then((response) => response.json())
        .then((data) => {
          audio.current.play();
          const botMessage = {
            text: `Chào ${name}, ${data.response}`,
            sender: "bot",
          };

          setMessages((prevMessages) => [...prevMessages, botMessage]);

          if (data.options) {
            setOptions(data.options);
            setShowFeedback(true);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setIsBotTyping(false);
        });
    }
  };

  // If a sugestion is clicked
  const handleOptionClick = (option) => {
    const userMessage = { text: option, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setIsBotTyping(true);

    fetch("http://localhost:5000/api/chatbot/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: option, selected_option: option }),
    })
      .then((response) => response.json())
      .then((data) => {
        audio.current.play();
        const botMessage = {
          text: `Chào ${name}, ${data.response}`,
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        if (data.options) {
          setOptions(data.options);
          setShowFeedback(true);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsBotTyping(false);
      });
  };

  const handleKeyDown1 = (event) => {
    if (event.key === "Enter") {
      handleChat();
    }
  };

  // FEEDBACK HANDLING FUNCTIONS
  const handleThumbsUpFeedback = () => {
    setShowFeedback(false);
    const botMessage = {
      text: "Cảm ơn bạn đã phản hồi!",
      sender: "bot",
    };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleThumbsDownFeedback = () => {
    setShowFeedback(false);
    const userMessage = { text: originalUserMessage, sender: "user" };

    fetch("http://localhost:5000/api/chatbot/thumbsDownMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userMessage),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Thumbs down message sent successfully:", userMessage);
          const botMessage = {
            text: "Cảm ơn bạn đã phản hồi!Chúng tôi sẽ cố gắng cải thiện lần sau...",
            sender: "bot",
          };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
          console.error(
            "Failed to send thumbs down message. Server responded with status:",
            response.status
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // IF USER EXITS CHATBOT
  const handleToggleExitModal = () => {
    if (messages.length === 2) {
      setMessages([
        { text: "Xin chào, Shop-vn vui lòng phục vụ!!", sender: "bot" },
        {
          text: "Vui lòng điền tên và email để tôi có thể hỗ trợ bạn!... :)",
          sender: "bot",
        },
      ]);
      setInputMessage("");
      setName("");
      setEmail("");
      setUserData(true);
      setShowExitModal(false);
      setOptions([]);
      const blur = document.getElementById("blur");
      blur.classList.remove("active");
      const chatbot = document.getElementById("chatbot");
      chatbot.classList.remove("active");
    } else {
      setShowExitModal(true);
    }
  };

  const handleExitYes = () => {
    setMessages([
      { text: "Xin chào, Shop-vn vui lòng phục vụ!!", sender: "bot" },
      {
        text: "Vui lòng điền tên và email để tôi có thể hỗ trợ bạn!... :)",
        sender: "bot",
      },
    ]);
    setInputMessage("");
    setName("");
    setEmail("");
    setUserData(true);
    setShowExitModal(false);
    setOptions([]);
    const blur = document.getElementById("blur");
    blur.classList.remove("active");
    const chatbot = document.getElementById("chatbot");
    chatbot.classList.remove("active");
    setShowExitModal(false);
  };

  // console.log(messages)

  return (
    <>
      <div className="container" id="blur">
        <br />
        <img
          src={logo}
          onClick={toggleBOT}
          className="showBOT-logo"
          alt="Click Here"
        ></img>
      </div>

      {showPopup && (
        <div className="alert alert-primary popup-message" role="alert">
          <div className="popup-text">Chào bạn! tôi có thể giúp gì?</div>
        </div>
      )}

      <div id="chatbot">
        <nav className="navbar my-3" style={{ backgroundColor: "#2f86b9" }}>
          <div className="container-fluid">
            <a className="navbar-brand" style={{ color: "#fff" }} href="/">
              <i className="fa fa-android" aria-hidden="true"></i> Shop-vn
              <button className="closeBOT" onClick={handleToggleExitModal}>
                ❌
              </button>
            </a>
          </div>
        </nav>

        <div className="chat-container">
          <div
            className="chat-messages"
            id="chat-messages"
            ref={chatMessagesRef}
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.sender === "user" ? "user-message" : "other-message"
                }`}
              >
                {message.link ? (
                  <a
                    href={message.link}
                    target="_blank"
                    onClick={(e) => openLinkInNewTab(e, message.link)}
                    rel="noreferrer"
                  >
                    {message.text}
                  </a>
                ) : (
                  message.text
                )}
              </div>
            ))}

            {showFeedback && (
              <div>
                <button
                  onClick={handleThumbsUpFeedback}
                  className="btn btn-success btn-sm mx-2 mb-2"
                >
                  <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                </button>
                <button
                  onClick={handleThumbsDownFeedback}
                  className="btn btn-warning btn-sm mb-2"
                >
                  <i className="fa fa-thumbs-down" aria-hidden="true"></i>
                </button>
              </div>
            )}

            {userData && (
              <form onSubmit={handleUserDetails}>
                <div className="input-container">
                  <input
                    className="input-details"
                    type="text"
                    placeholder="Tên của bạn"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                  <input
                    className="input-details"
                    type="email"
                    placeholder="Email của bạn"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <button className="btn-sm btn-primary" id="send-button">
                    Xác nhận
                  </button>
                </div>
              </form>
            )}

            {!userData && showMenu && currentMenu === "main" && (
              <div className="menu">
                <ul>
                  {menuOptions.map((option, index) => (
                    <li key={index}>
                      <button
                        className={`chat-options`}
                        onClick={() => handleMenuOptionClick(option)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!userData && showMenu && currentMenu === "one" && (
              <div className="sub-menu">
                <ul>
                  {menu1Options.map((option, index) => (
                    <li key={index}>
                      <button
                        className={`chat-options`}
                        onClick={() => handleFirstMenuOptionClick(option)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!userData && showMenu && currentMenu === "two" && (
              <div className="sub-menu">
                <ul>
                  {menu2Options.map((option, index) => (
                    <li key={index}>
                      <button
                        className={`chat-options`}
                        onClick={() => handleSecondMenuOptionClick(option)}
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!isBotTyping && options.length > 0 && (
              <div className="">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className={`chat-options`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {isBotTyping && (
              <div className="message bot-message">Đang soạn tin...</div>
            )}
          </div>

          {!userData && (
            <div className="my-1 message-input">
              <input
                type="text"
                className="mx-2"
                id="message-input"
                placeholder="Nhập tin nhắn của bạn..."
                onKeyDown={handleKeyDown1}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button
                className="mx-1 send-button "
                id="send-button"
                onClick={handleChat}
              >
                {" "}
                <i className="fa fa-paper-plane-o" aria-hidden="true"></i>{" "}
              </button>
              <button
                className="mx-1 speech-button"
                id="speech-button"
                onClick={startSpeechRecognition}
              >
                {" "}
                <i className="fa fa-microphone" aria-hidden="true"></i>{" "}
              </button>
            </div>
          )}

          <br />
          <button className="closeBOT" onClick={handleToggleExitModal}>
            ❌
          </button>
        </div>
      </div>

      <audio ref={audio} src={messageSound} preload="auto" />

      {showExitModal && (
        <div className="exit-modal">
          <div className="exit-modal-content">
            <div className="exit-modal-header">
              <h4>
                Bạn có chắc muốn thoát không? Nếu thoát cuộc hội thoại sẽ được
                xóa!
              </h4>
            </div>
            <div className="exit-modal-footer">
              <button onClick={handleExitYes} className="exit-yes-button">
                Yes
              </button>
              <button
                onClick={() => setShowExitModal(false)}
                className="exit-no-button"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
