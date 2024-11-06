import React, { useState, useEffect } from 'react';
import Style from './style.css';

export default function App() {
  const arr = [
    { id: '1', name: 'Keo', style: 'id1' },
    { id: '2', name: 'Bua', style: 'id2' },
    { id: '3', name: 'Bao', style: 'id3' },
  ];
  const arrbet = [
    { id: '1', price: '200', name: '200K', active: true },
    { id: '2', price: '500', name: '500K', active: false },
    { id: '3', price: '1000', name: '1000K', active: false },
  ];
  const [data, setData] = useState(arr);
  const [result, setResult] = useState();
  const [kqthang, setKqthang] = useState(0);
  const [kqhoa, setKqhoa] = useState(0);
  const [kqth, setKqth] = useState(0);
  const [nofi, setNofi] = useState('');
  const [betLevel, setbetLevel] = useState(arrbet);
  const [coin, setCoint] = useState(1000);
  const [putCoin, setPutCoin] = useState(200);
  const play = (value) => {
    if (data?.length == 3 && coin >= 200 && coin >= putCoin) {
      botPlay(value);
      let newArr = arr.filter((item) => item.id == value);
      setData(newArr);
    } else if (coin < 200 && coin < putCoin) {
      alert('hết tiền nạp vô');
    }
  };
  const botPlay = (value) => {
    const indexRandom = Math.floor(Math.random() * arr.length);
    if (arr[indexRandom]?.id == value) {
      nofication('Hoa');
      setResult(arr[indexRandom]);
    } else {
      if (value == 1) {
        let thua = [1, indexRandom];
        let newindexRandom = indexRandom;
        if (indexRandom != 1) {
          const rand = Math.random();
          if (rand < 0.25) {
            newindexRandom = 0;
          } else {
            newindexRandom = 1;
          }
        }
        setResult(arr[thua[newindexRandom]]);
        thua[newindexRandom] == 1 ? nofication('Thua') : nofication('Thang');
      } else if (value == 2) {
        let thua = [2, indexRandom];
        let newindexRandom = indexRandom;
        if (indexRandom != 2) {
          const rand = Math.random();
          if (rand < 0.25) {
            newindexRandom = 0;
          } else {
            newindexRandom = 1;
          }
          setResult(arr[thua[newindexRandom]]);
          thua[newindexRandom] == 2 ? nofication('Thua') : nofication('Thang');
        } else {
          setResult(arr[newindexRandom]);
          newindexRandom == 2 ? nofication('Thua') : nofication('Thang');
        }
      } else if (value == 3) {
        let thua = [0, indexRandom];
        let newindexRandom = indexRandom;
        if (indexRandom != 0) {
          const rand = Math.random();
          if (rand < 0.25) {
            newindexRandom = 0;
          } else {
            newindexRandom = 1;
          }
          setResult(arr[thua[newindexRandom]]);
          thua[newindexRandom] == 0 ? nofication('Thua') : nofication('Thang');
        } else {
          setResult(arr[newindexRandom]);
          newindexRandom == 0 ? nofication('Thua') : nofication('Thang');
        }
      }
    }
  };
  const nofication = (value) => {
    if (value == 'Hoa') {
      setKqhoa(kqhoa + 1);
      setNofi('Ban Hoa');
    } else if (value == 'Thang') {
      setKqthang(kqthang + 1);
      setNofi('Ban Thang');
      let total = Number(coin) + Number(putCoin - 50);
      setCoint(total);
    } else if (value == 'Thua') {
      setKqth(kqth + 1);
      setNofi('Ban Thua');
      let total = Number(coin) - Number(putCoin);
      setCoint(total);
    }
    localStorage.setItem('coin', coin);
  };

  const joinMoney = (value, check) => {
    const newarr = betLevel.map((item) =>
      item.id == check ? { ...item, active: true } : { ...item, active: false }
    );

    setPutCoin(value);
    setbetLevel(newarr);
  };
  const reset = () => {
    setNofi('');
    setData(arr);
    setResult(null);
  };
  const nap = (value) => {
    alert('chơi ngu mới phải nạp');
    let newcoint = coin + Number(value);
    setCoint(newcoint);
    localStorage.setItem('coin', newcoint);
  };
  useEffect(() => {
    const coin = localStorage.getItem('coin');
    if (coin > 0) {
      setCoint(coin);
    } else {
      localStorage.setItem('coin', 1000);
      setCoint(setCoint(coin));
    }
  }, []);
  return (
    <>
      <div className="kq">
        <p className="kq1">Thang:{kqthang}</p>
        <p className="kq2">Hoa:{kqhoa}</p>
        <p className="kq3">Thua:{kqth}</p>
      </div>
      <div className="kq"></div>
      <div className="coin">Coin:{coin}$</div>
      {coin < 200 ? (
        <div className="container-nap">
          <button>nap</button>
          <div className="nap-pice">
            <button onClick={() => nap(1000)}>1000K</button>
            <button onClick={() => nap(2000)}>2000K</button>
            <button onClick={() => nap(3000)}>3000K</button>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="container">
        <div className="user">
          {data.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => play(item.id)}
                className={`icon ${item.style}`}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
        <div className="boss">
          {result != null ? (
            <div className={`icon ${result.style}`}>{result.name}</div>
          ) : (
            <div className={`icon boss`}>Nhà cái</div>
          )}
        </div>
      </div>
      <div className="kq">{nofi}</div>
      <div className="bet-level">
        {betLevel.map((item, index) => (
          <button
            className={item?.active ? 'btn-active' : ''}
            onClick={() => joinMoney(item.price, item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="reset">
        {data?.length == 3 ? (
          ''
        ) : (
          <button onClick={() => reset()}>Choi Lại </button>
        )}
      </div>
    </>
  );
}
