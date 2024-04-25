/* eslint-disable no-useless-concat */
import React, { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  add_friend,
  messageClear,
  send_message,
  updateMessage,
} from "../../store/reducers/ChatReducer";
import toast from "react-hot-toast";
import { useRef } from "react";
import { FaList } from "react-icons/fa";

const socket = io("http://localhost:5000");

const ChatButton = () => {
  const scrollRef = useRef();

  const dispatch = useDispatch();
  const sellerId = "65e09606ddefc884e474eba3";
  const [text, setText] = useState("");
  const [receverMessage, setReceverMessage] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const { fd_messages, currentFd, my_friends, successMessage } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    socket.emit("add_user", userInfo.id, userInfo);
  }, [userInfo]);

  useEffect(() => {
    dispatch(
      add_friend({
        sellerId,
        userId: userInfo.id,
      })
    );
  }, [dispatch, sellerId, userInfo.id]);

  const send = () => {
    if (text) {
      dispatch(
        send_message({
          userId: userInfo.id,
          text,
          sellerId,
          name: userInfo.name,
        })
      );
      setText("");
    }
  };

  useEffect(() => {
    socket.on("seller_message", (msg) => {
      console.log("first");
      setReceverMessage(msg);
    });
    socket.on("activeSeller", (sellers) => {
      setActiveSeller(sellers);
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_customer_message", fd_messages[fd_messages.length - 1]);
      dispatch(messageClear());
    }
  }, [dispatch, fd_messages, successMessage]);

  useEffect(() => {
    if (receverMessage) {
      if (
        sellerId === receverMessage.senderId &&
        userInfo.id === receverMessage.receverId
      ) {
        dispatch(updateMessage(receverMessage));
      } else {
        toast.success(receverMessage.senderName + " " + "send a message");
        dispatch(messageClear());
      }
    }
  }, [dispatch, receverMessage, userInfo.id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fd_messages]);

  const [show, setShow] = useState(false);

  return (
    <div className="bg-light p-3 rounded-md border border-warning">
      <div className="w-full flex relative">
        <div className="w-[calc(100%-100px)] md-lg:w-full">
          {currentFd ? (
            <div className="w-full h-full">
              <div className="flex justify-between items-center text-slate-600 text-xl h-[50px]">
                <div className="flex gap-2">
                  <div className="w-[30px] h-[30px] rounded-full relative md:hidden">
                    {activeSeller.some(
                      (c) => c.sellerId === currentFd.fdId
                    ) && (
                      <div className="w-[10px] h-[10px] rounded-circle bg-green-500 absolute right-0 bottom-0"></div>
                    )}
                    <img src="/images/admin.png" alt="" />
                  </div>
                  <span>Tư Vấn Trực Tuyến</span>
                </div>
                <div
                  onClick={() => setShow(!show)}
                  className="w-[40px] h-[40px] cursor-pointer hidden rounded-sm justify-center items-center bg-sky-600 text-white"
                >
                  <FaList />
                </div>
              </div>
              <div className="h-[350px] w-full bg-secondary p-3 rounded-md md:h-[350px]">
                <div className="w-full h-full overflow-y-auto flex flex-col gap-3">
                  {fd_messages.map((m, i) => {
                    if (currentFd?.fdId !== m.receverId) {
                      return (
                        <div
                          key={i}
                          ref={scrollRef}
                          className="w-full flex gap-2 justify-start items-center text-[14px]"
                        >
                          <img
                            className="w-[30px] h-[30px] rounded-circle"
                            src="/images/admin.png"
                            alt=""
                          />
                          <div className="p-2 bg-purple-500 text-white rounded-md">
                            <span>{m.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          ref={scrollRef}
                          className="w-full flex gap-2 justify-end items-center text-[14px]"
                        >
                          <img
                            className="w-[30px] h-[30px] rounded-circle"
                            src="/images/user.png"
                            alt=""
                          />
                          <div className="p-2 bg-cyan-500 text-white rounded-md">
                            <span>{m.message}</span>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="flex p-2 justify-between items-center w-full">
                {/* <div className="w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                  <label className="cursor-pointer" htmlFor="">
                    <AiOutlinePlus />
                    <input className="" type="file" />
                  </label>
                </div> */}
                <div className="border h-[40px] p-0 ml-2 w-[300px] sm:w-[250px] rounded-full relative">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="Nhập tin nhắn..."
                    className="w-full rounded-full h-full outline-none p-3"
                  />

                  {/* <div className="text-2xl right-2 top-2 absolute cursor-auto">
                    <span>
                      <GrEmoji />
                    </span>
                  </div> */}
                </div>
                <div className="w-[40px] p-2 justify-center items-center rounded-full">
                  <div onClick={send} className="text-2xl cursor-pointer">
                    <IoSend />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setShow(!show)}
              className="w-full h-[400px] flex justify-center items-center text-lg ont-bold text-slate-600"
            >
              <span className="cursor-pointer">
                Cần đăng nhập để bắt đầu chat
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatButton;
