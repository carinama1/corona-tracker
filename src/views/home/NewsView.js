import React from "react";
import { makeStyles } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import timeAgo from "../../utils/time";

const useStyle = makeStyles((theme) => ({
  root: { marginTop: 60 },
  wrapper: { marginBottom: 20 },
  newsWrapper: {
    border: "1px solid white",
    borderRadius: 5,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  newsThumbnail: {
    width: 72,
    height: 72,
    marginRight: 20,
    background: "red",
  },
  pagination: {
    "& .MuiPaginationItem-outlined": {
      border: "1px solid rgba(255,255,255,1)",
      color: "white",
    },
    "& .Mui-selected": {
      color: "white",
      background: "rgba(255,255,255,0.3)",
      "&:hover": {
        background: "rgba(255,255,255,0.3)",
      },
    },
    "& .MuiPaginationItem-ellipsis": {
      color: "white",
    },
  },
}));

const NewsView = ({ data, handleChange }) => {
  const classes = useStyle();

  const handlePageChange = (_, index) => {
    handleChange(index);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <h2>Corona News</h2>
        <div
          style={{
            height: "5px",
            width: "60px",
            background: "white",
            marginTop: 10,
          }}
        ></div>
      </div>
      <div
        style={{
          maxWidth: 800,
          margin: "auto",
        }}
        className={classes.wrapper}
      >
        {data.items &&
          data.items.map((item, index) => {
            return (
              <div key={index} className={classes.newsWrapper}>
                <div className={classes.newsThumbnail}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 5,
                      objectFit: "cover",
                    }}
                    src={item.urlToImage}
                    alt=" "
                  ></img>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: 5, cursor: "pointer" }}>
                    {item.title}
                  </h3>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>
                    {item.description}
                  </span>
                  <br></br>
                  <div
                    style={{
                      color: "rgba(23,162,184, 0.8)",
                      textAlign: "right",
                      marginTop: 5,
                    }}
                  >
                    {timeAgo(item.publishedAt)}
                  </div>
                </div>
              </div>
            );
          })}
        <div style={{ display: "inline-block", float: "right" }}>
          <Pagination
            className={classes.pagination}
            count={Math.floor(data.total / 9)}
            variant="outlined"
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsView;
