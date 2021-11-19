import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from '../css/Lists.module.css'
import Exchange from "./Exchange";

function Lists() {
    const getCoins = "https://api.coinstats.app/public/v1/coins";
    const [data, setData] = useState([]);
    const [currency, setCurrency] = useState('USD')
    const [sort, setSort] = useState(false);
    const [sortRank, setSortRank] = useState(false);
    // const [api, setApi] = useState('');
    // var exchange = [];

    useEffect(() => {
        const response = async () => {
            const res = await (await axios.get(`${getCoins}/?currency=${currency}`)).data
            var change = Object.values(res.coins)
            if (sort) {
                change.sort((a, b) => {
                    var ax = a.name.toLowerCase();
                    var bx = b.name.toLowerCase();
                    if (ax > bx) return 1;
                    if (ax < bx) return -1;
                    return 0;
                })
                setSortRank(false)
            }

            if (sortRank) {
                change.sort((a, b) => {
                    if (Number(a.rank) > Number(b.rank)) return -1;
                    if (Number(a.rank) < Number(b.rank)) return 1;
                    return 0;
                })
                setSort(false);
            }
            console.log(sort, sortRank)
            setData(change)
        }
        response();
    }, [currency, sort, sortRank])

    const renderBody = () => {
        return data && data.map(({ id, rank, name, symbol, price, icon }) => {
            return (
                <tr key={id}>
                    <td>{rank}</td>
                    <td>{name}</td>
                    <td>{symbol}</td>
                    <td>{Number(price).toFixed(2)}</td>
                    <td><img src={icon} alt='icon' height='64' width='64'></img></td>
                    <Exchange id={id} symbol={symbol} currency={currency}/> 
                </tr>
            )
        })

    }

    function handleCurrency() {
        return (
            <select onChange={(e) => {
                const selectedValue = e.target.value;
                setCurrency(selectedValue);
            }}>
                <option value="USD">USD</option>
                <option value="HKD">HKD</option>
                <option value="KRW">KRW</option>
                <option value="SGD">SGD</option>
            </select>
        )
    }

    function sortByRank() {

        return (
            <button id='sortR' value='SortR' onClick={
                (e) => {
                    if (sortRank) setSortRank(false)
                    else setSortRank(true)
                }
            }>Sort By Rank</button>
        )

    }
    function sortByName() {
        return (
            <button id='sort' value='Sort' onClick={
                (e) => {
                    if (sort) setSort(false)
                    else setSort(true)
                }
            }>Sort By Name</button>
        )
    }


    return (
        <div className={styles.container}>
            <div className={styles.dropDown}>
                {handleCurrency()}
                {sortByRank()}
                {sortByName()}
            </div>
            <h1>Coins Table</h1>
            <div className={styles.ctable}>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Unit Price</th>
                            <th>Image</th>
                            <th>Optimal Exchange</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderBody()}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Lists;
