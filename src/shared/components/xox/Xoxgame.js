import React, { useEffect, useState } from "react";
import "./xox.css";

const Xoxgame = () => {
  const [games, setGames] = useState([]);
  const [mark, setMark] = useState("X");
  const [message, setMessage] = useState("");
  const [isFinish, setIsFinish] = useState(false);
  const [gameMove, setGameMove] = useState([]);
  
  //newGame'i tetikleyerek yeni bir oyun başlatılır. [] ile hook sadece bir kez tetiklenir.
  useEffect(() => {
    newGame();
  }, []);

  const newGame = () => {
    // setGames 3x3 boyutlu x-o-x oyununu temsil ediyor. Her dizi elemanı bir kareyi temsil ediyor.
    setGames(["", "", "", "", "", "", "", "", ""]);
    setIsFinish(false);
    setMark("X");
    setMessage("Hamle Sırası:" + mark);
    setGameMove([]);
  };


  //index parametresi ile belirtilen yerlerde işaretleme yapılmasını sağladık.
  const markGame = (index) => {
    if (!isFinish) {
      const newGames = [...games];
      if (newGames[index] == "") {
        newGames[index] = mark;
        setGames(newGames);
        setGameMove((val) => [...val, newGames]);
        let e = moveFinish(newGames);
        if (e) {
          setMessage("Oyun berabere");
          setIsFinish(true);
          return;
        }

        let r = gameOver(newGames);
        if (r) {
          setMessage("Oyunu " + mark + " kazandı!");
          setIsFinish(true);
          return;
        }

        mark == "X" ? setMark("O") : setMark("X");
        setMessage("Hamle Sırası: " + (mark == "X" ? "O" : "X"));
      }
    }
  };

  //Oyun bittiğinde true döndürür. Tahtanın tüm kombinasyonları kontrol edildi ve kazanma durumu olup olmadığına bakıldı.
  const gameOver = (newGames) => {
    if (
      newGames[0] !== "" &&
      newGames[0] === newGames[1] &&
      newGames[1] === newGames[2]
    ) {
      return true;
    }

    if (
      newGames[3] !== "" &&
      newGames[3] === newGames[4] &&
      newGames[4] === newGames[5]
    ) {
      return true;
    }

    if (
      newGames[6] !== "" &&
      newGames[6] === newGames[7] &&
      newGames[7] === newGames[8]
    ) {
      return true;
    }

    if (
      newGames[0] !== "" &&
      newGames[0] === newGames[3] &&
      newGames[3] === newGames[6]
    ) {
      return true;
    }

    if (
      newGames[1] !== "" &&
      newGames[1] === newGames[4] &&
      newGames[4] === newGames[7]
    ) {
      return true;
    }

    if (
      newGames[2] !== "" &&
      newGames[2] === newGames[5] &&
      newGames[5] === newGames[8]
    ) {
      return true;
    }

    if (
      newGames[0] !== "" &&
      newGames[0] === newGames[4] &&
      newGames[4] === newGames[8]
    ) {
      return true;
    }

    if (
      newGames[2] !== "" &&
      newGames[2] === newGames[4] &&
      newGames[4] === newGames[6]
    ) {
      return true;
    }

    return false;
  };

  //For döngüsü içerisinde tahtadaki kutular kontrol edildi. Eğer herhangi bir kutu boş ise false döner. Yani oyuncular hala hamle yapabilir. Kutular dolmuş ise true döner oyunu oyuncular isterse yeniler.
  const moveFinish = (newGames) => {
    for (let index = 0; index < newGames.length; index++) {
      const element = newGames[index];
      if (element === "") {
        return false;
      }
    }
    return true;
  };

  const setThatGameMove = (game) => {
    setGames(game);
  };

  return (
    <div className="container text-center">
      <h1>XOX</h1>
      <h2 className="alert alert-warning">{message}</h2>
      <button onClick={newGame} className="btn btn-outline-primary w-100">
        Yeni Oyun
      </button>
      {/* map methodu ile  her game ögesi için div oluşturduk. onClick ile markGame state'ini çağırdık ve kutuların işaretlenmesini sağladık. her bir box burada game'in değerini alır. Yani game X veya O değerine sahipse box bu değerleri döner. */}
      <div className="row mt-5">
        {games.map((game, i) => (
          <div onClick={() => markGame(i)} className="col-md-4 box" key={i}>
            {game}
          </div>
        ))}
      </div>
      <hr />
      <ol>
        {/* Burada oyun tahtasındaki tüm hamleleri kaydeden kod yazıldı. Her button ögesi hamle sıra numarasını içeren text'i gösterir.Aynı zamanda oyuncuların hamlesini geri almasını da setThatGameMove() ile ayarlanır ve seçilen hamleye geri dönülebilir. */}
        {gameMove.map((game, i) => (
          <button
            onClick={() => setThatGameMove(game)}
            className="btn btn-primary mx-2 mt-2"
            key={i}
          >
            {i + 1} Hamle
          </button>
        ))}
      </ol>
    </div>
  );
};

export default Xoxgame;
